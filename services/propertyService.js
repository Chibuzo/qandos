const { Property, PropertyMedia, VerifyProperty } = require('../models');
const { ErrorHandler } = require('../helpers/errorHandler');
const { uploadFiles } = require('../helpers/fileUpload');
const { Op, Sequelize, or } = require("sequelize");

const create = async (data, files) => {
    const { UserId, ...propertyData } = data;
    const property = await Property.create({ ...propertyData, colisting_consent: true, UserId });

    if (files) {
        if (files.title_document) {
            const uploaded = await uploadFiles(files.title_document, 'property_documents');
            if (uploaded.length > 0) {
                await PropertyMedia.create({ location: uploaded[0], PropertyId: property.id, mediaType: 'document' });
            }
        }
        if (files.property_images) {
            const uploaded = await uploadFiles(files.property_images, 'property_photos');
            await PropertyMedia.bulkCreate(
                uploaded.map(location => ({ location, PropertyId: property.id, mediaType: 'photo' }))
            );
        }
        if (files.video_walkthrough) {
            const uploaded = await uploadFiles(files.video_walkthrough, 'property_videos');
            if (uploaded.length > 0) {
                await PropertyMedia.create({ location: uploaded[0], PropertyId: property.id, mediaType: 'video' });
            }
        }
    }

    return property;
}

const list = async (criteria = {}, limit = 15, searchParams = null) => {
    if (searchParams) {
        const { keywords, state, city } = searchParams;
        criteria = {
            ...criteria, [Op.or]: [
                { title: { [Op.like]: `%${keywords}%` } },
                { state: { [Op.like]: `%${state}%` } },
                { city: { [Op.like]: `%${city}%` } }
            ]
        };
    };
    return Property.findAll({
        where: { ...criteria, deleted: false },
        include: [{
            model: PropertyMedia,
            limit: 1
        }, {
            model: require('../models').User,
            attributes: ['id', 'fullname', 'role']
        }],
        limit,
        order: [['createdAt', 'desc']]
    });
}

const fetchFeatured = async () => {
    return Property.findAll({
        where: { featured: 1, deleted: false },
        order: Sequelize.literal('rand()'),
        include: {
            model: PropertyMedia,
            limit: 1
        },
        limit: 4
    });
}

const fetchRelatedProperties = async property => {
    const { bedrooms = 2, toilets = 2, state, city, age = 1, id } = property;
    const criteria = {
        [Op.or]: [{ bedrooms }, { toilets }, { state }, { city }, { age }],
        id: { [Op.not]: id }
    };

    return list(criteria, 5);
}

const findOne = async criteria => {
    const property = await Property.findOne({ where: { ...criteria, deleted: false } });
    if (!property) return null;
    const photos = await property.getPropertyMedia({ raw: true });
    return { ...property.toJSON(), photos };
}

const view = async id => {
    const property = await findOne({ id });
    if (!property) throw new ErrorHandler(404, 'Property not Found');
    return property;
}

const update = async (id, data) => {
    return Property.update(data, { where: { id } });
}

const uploadPropertyPhotos = async (PropertyId, files, mediaType = 'photo') => {
    let subfolder = 'property_photos';
    if (mediaType === 'video') subfolder = 'property_videos';
    if (mediaType === 'document' || mediaType === 'floor plan') subfolder = 'property_documents';

    const uploadedFiles = await uploadFiles(files, subfolder);
    return PropertyMedia.bulkCreate(
        uploadedFiles.map(file => ({ location: file, PropertyId, mediaType }))
    );
}

const deleteMedia = async id => {
    const media = await PropertyMedia.findOne({
        where: { id }
    });
    return PropertyMedia.destroy({ where: { id } });
}

const logPropertyVerification = async data => {
    return VerifyProperty.create(data);
}

const listPropertiesForVetting = async () => {
    return VerifyProperty.findAll({ order: [['createdAt', 'desc']] });
}

module.exports = {
    create,
    list,
    fetchFeatured,
    view,
    findOne,
    update,
    uploadPropertyPhotos,
    fetchRelatedProperties,
    deleteMedia,
    logPropertyVerification,
    listPropertiesForVetting
}