const fs = require('fs');
const path = require('path');

const ensureUploadsDirExists = () => {
    const uploadsDir = path.join(__dirname, 'uploads');

    try {
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
            console.log('Uploads directory created.');
        } else {
            console.log('Uploads directory already exists.');
        }
    } catch (err) {
        console.error('Failed to ensure uploads directory exists:', err);
    }
};

module.exports = { ensureUploadsDirExists };
