const express = require('express');
const multer = require('multer');
const serveStatic = require('serve-static');
const path = require('path');
const { processImage } = require('./imageProcessor');
const { processSpreadsheet } = require('./spreadsheetProcessor');

const app = express();

app.use(serveStatic(path.join(__dirname, 'public')));

// Configure multer storage options
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the specified storage configuration
const upload = multer({ storage: storage });

// Define the POST route for handling file uploads
app.post('/upload', upload.single('timesheet'), (req, res) => {
    if (!req.file) {
        const noFileError = new Error('No file was uploaded.');
        console.error(noFileError);
        return res.status(400).json({ message: 'Please upload a file.' });
    }
    console.log(`File uploaded: ${req.file.filename}`);
    processImage(req.file.path, (processedFilePath) => {
        console.log(`Image has been processed: ${processedFilePath}`);
        res.json({ status: 'processed', filePath: `/uploads/${req.file.filename}` });
    });
});

// Define the POST route for handling spreadsheet processing requests
app.post('/process-spreadsheet', (req, res) => {
    try {
        processSpreadsheet((result) => {
            console.log(`Spreadsheet processing: ${JSON.stringify(result)}`);
            res.json(result);
        });
    } catch (error) {
        console.error('Spreadsheet processing error:', error.stack);
        res.status(500).json({ message: 'Error processing spreadsheet.', error: error.stack });
    }
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('An error occurred:', err.stack);
    res.status(500).json({ message: 'An error occurred, please try again later.' });
});

const PORT = process.env.PORT || 3000;

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // gpt_pilot_debugging_log
});
