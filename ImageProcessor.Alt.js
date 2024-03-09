const Tesseract = require('tesseract.js');

const processImageWithTesseract = async (filePath) => {
    try {
        const result = await Tesseract.recognize(
            filePath,
            'eng',
            {
                logger: m => console.log(m)
            }
        );
        return result.data.text;
    } catch (error) {
        console.error('Error processing image with Tesseract:', error);
        throw error;
    }
};

module.exports = { processImageWithTesseract };
