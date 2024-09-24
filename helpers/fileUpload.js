const { ErrorHandler } = require('../helpers/errorHandler');

const uploadFiles = async files => {
    if (!files || Object.keys(files).length === 0) {
        throw new ErrorHandler(400, 'No files were uploaded.');
    }

    const uploadedFileNames = [];
    const allFiles = Array.isArray(files.property_photos) ? [...files.property_photos] : [files.property_photos];
    for (const file of allFiles) {
        const acceptableFileTypes = ['image/png', 'image/jpeg', 'video/mp4'];
        if (!acceptableFileTypes.includes(file.mimetype)) {
            continue;
        }
        const ext = file.name.split('.').pop();
        const photoName = `property_photos/${process.hrtime()[1]}.${ext}`;
        const uploadPath = require('path').resolve(__dirname, '../public', photoName);
        await file.mv(uploadPath);
        uploadedFileNames.push(photoName);
    }
    return uploadedFileNames;
}

module.exports = {
    uploadFiles
}