const processImage = (filePath, callback) => {
    setTimeout(() => {
        console.log(`Processing image at: ${filePath}`);
        callback(filePath);
    }, 5000);
};

module.exports = { processImage };