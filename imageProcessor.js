const processImage = (filePath, callback) => {
    setTimeout(() => {
        console.log(`Processing image at: ${filePath}`);
        callback(filePath);
    }, 5000);
};

module.exports = { processImage };
const { OpenAI } = require('openai');
            prompt: "Process this image and describe its content:",
            attachments: [
                {
                    data: image,
                    type: "image"
                }
            ],
            temperature: 0.5,
            max_tokens: 1024,
        });
        return response.data.choices[0].text;
    } catch (error) {
        console.error('Error processing image with GPT-Vision:', error);
        throw error;
    }
};

module.exports = { processImage };