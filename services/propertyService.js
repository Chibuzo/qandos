const { Property, PropertyPhoto } = require('../models');
const { ErrorHandler } = require('../helpers/errorHandler');
const { uploadFiles } = require('../helpers/fileUpload');

const create = async data => {
    return Property.create(data);
}

const list = async (criteria = {}, includePhoto = false) => {
    return Property.findAll({ 
        where: criteria, 
        include: {
            model: PropertyPhoto,
            limit: 1
        },
        order: [['createdAt', 'desc']] 
    });
}

const findOne = async criteria => {
    const property = await Property.findOne({ where: criteria });
    if (!property) return null;
    const photos = await property.getPropertyPhotos({ raw: true });
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

const uploadPropertyPhotos = async (PropertyId, photos) => {
    const uploadedFiles = await uploadFiles(photos);
    return PropertyPhoto.bulkCreate(
        uploadedFiles.map(file => ({ location: file, PropertyId }))
    );
}

module.exports = {
    create,
    list,
    view,
    findOne,
    update,
    uploadPropertyPhotos
}