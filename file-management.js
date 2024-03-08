const fs = require('fs');
const path = require('path');

const ensureUploadsDirExists = () => {
    const uploadsDir = path.join(__dirname, 'uploads');
    const testImagesDir = path.join(__dirname, 'test-images');

    try {
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
            console.log('Uploads directory created.');
        } else {
            console.log('Uploads directory already exists.');
        }
        if (!fs.existsSync(testImagesDir)) {
            fs.mkdirSync(testImagesDir, { recursive: true });
            console.log('Test-images directory created.');
        } else {
            console.log('Test-images directory already exists.');
        }
    } catch (err) {
        console.error('Failed to ensure directories exist:', err);
    }
};

module.exports = { ensureUploadsDirExists };
