
const uploadFiles = async (files, subfolder = 'property_photos') => {
    if (!files) return [];

    const uploadedFileNames = [];
    const allFiles = Array.isArray(files) ? files : [files];

    for (const file of allFiles) {
        const acceptableFileTypes = ['image/png', 'image/jpeg', 'video/mp4', 'application/pdf', 'image/jpg'];
        if (!acceptableFileTypes.includes(file.mimetype)) {
            continue;
        }
        const ext = file.name.split('.').pop();
        const fileName = `${subfolder}/${process.hrtime()[0]}_${process.hrtime()[1]}.${ext}`;
        const uploadPath = require('path').resolve(__dirname, '../public', fileName);

        // Ensure directory exists (basic check, could be better)
        const fs = require('fs');
        const dir = require('path').dirname(uploadPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        await file.mv(uploadPath);
        uploadedFileNames.push(fileName);
    }
    return uploadedFileNames;
}

module.exports = {
    uploadFiles
}