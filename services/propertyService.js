const { Property, PropertyMedia } = require('../models');
const { ErrorHandler } = require('../helpers/errorHandler');
const { uploadFiles } = require('../helpers/fileUpload');
const { Op, Sequelize } = require("sequelize");

const create = async data => {
    return Property.create(data);
}

const list = async (criteria = {}, limit = 6) => {
    return Property.findAll({ 
        where: criteria, 
        include: {
            model: PropertyMedia,
            limit: 1
        },
        limit,
        order: [['createdAt', 'desc']] 
    });
}

const fetchFeatured = async () => {
    return Property.findAll({ 
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
    const property = await Property.findOne({ where: criteria });
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
    const uploadedFiles = await uploadFiles(files);
    return PropertyMedia.bulkCreate(
        uploadedFiles.map(file => ({ location: file, PropertyId, mediaType }))
    );
}

const deleteMedia = async id => {
    const media = await PropertyMedia.findOne({
        where: { id }
    });
    return PropertyMedia.destroy({ where: { id }});
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
    deleteMedia
}