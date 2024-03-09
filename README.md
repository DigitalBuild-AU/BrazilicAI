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
3. Install the dependencies:
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
- `/imageProcessor.js`: Handles the image processing logic for timesheet correction.
- `/spreadsheetProcessor.js`: Manages the conversion of processed timesheets into spreadsheet format.
- `public/scripts.js`: Contains client-side JavaScript for handling UI interactions and asynchronous requests.
- `tests/`: Contains unit tests for image and spreadsheet processing logic.

## Contributing

Contributions are welcome. Please read `CONTRIBUTING.md` for details on our code of conduct and submission process.

## License

BrazilicAI is provided under the ISC license. For more information, please see `LICENSE.md`.

## Acknowledgments

- Thanks to the Brazilica staff for their valuable feedback.
- Appreciation goes to all contributors involved in developing BrazilicAI.
For more details on contributing, please see [CONTRIBUTING.md](./CONTRIBUTING.md).
- Thanks to the Brazilica staff for their valuable feedback.
- Appreciation goes to all contributors involved in developing BrazilicAI.
