# BrazilicAI

## Overview

BrazilicAI is a Progressive Web App (PWA) that simplifies timesheet management for Brazilica, a Beauty Salon in Brunswick and Collingwood, Melbourne, VIC. The application helps the salon manager in uploading and auto-correcting employees' timesheets using an image processing backend.

## Features

- Timesheet Correction: Converts uploaded images of timesheets into the correct format.
- Backend Processing Placeholder: A mock function that simulates image processing, which will eventually be replaced by actual image recognition and processing logic.
- UI Design: A responsive web interface with a clean, minimal design inspired by the salon's aesthetics. Offers a dark-themed color palette and modern transparent elements.
- Spreadsheet Generation Prompt: Provides an option to generate a spreadsheet from the processed timesheet, currently implemented as a placeholder.

## Installation

To set up BrazilicAI on your local environment, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/DigitalBuild-AU/BrazilicAI.git
   ```
2. Navigate to the directory:
   ```bash
   cd BrazilicAI
   ```
3. Install the dependencies (including new dependencies for image processing):
   ```bash
   npm install
   npm install openai
   npm install tesseract.js
   ```
   ```bash
   npm install
   ```

## Running the Application

Execute the following command in the root directory:

```bash
npm start
```

The server will start, and the PWA can be accessed by navigating to `http://localhost:3000` in your web browser.

## Usage

- Click the 'Upload Image' button to select and submit a timesheet image.
- After the upload, the image will be processed, and you can download the corrected version.
- When prompted, choose whether to generate a spreadsheet.

## Project Structure

- `/app.js`: Sets up the server and routes.
- `public/*`: Contains front-end HTML, JS, and CSS.
- `/file-management.js`: Ensures upload directory exists.
- `/imageProcessor.js`: Placeholder for the timesheet image processing workflow.
- `/spreadsheetProcessor.js`: Placeholder for the timesheet spreadsheet processing workflow.

## Contributing

Contributions are welcome. Please read `CONTRIBUTING.md` for details on our code of conduct and submission process.

## License

BrazilicAI is provided under the ISC license. For more information, please see `LICENSE.md`.
- `/ImageProcessor.Alt.js`: Contains the alternative image processing logic using Tesseract.
- `/test-images`: Directory for storing test images.

## Acknowledgments

- Thanks to the Brazilica staff for their valuable feedback.
- Appreciation goes to all contributors involved in developing BrazilicAI.
## Image Processing

BrazilicAI now includes advanced image processing capabilities to handle timesheet images more efficiently. The application uses two main methods for image processing:

1. **GPT-Vision via OpenAI API**: This method utilizes the OpenAI API to process images and extract relevant information. To use this feature, you need to obtain an API key from OpenAI and set it in your environment variables or configuration file.

2. **Tesseract OCR**: As an alternative, the application also supports Tesseract OCR for image processing. This method is implemented in `ImageProcessor.Alt.js` and does not require an internet connection or API key.

Both methods are integrated into the application, allowing for flexible image processing options based on your needs and preferences.
