const request = require('supertest');
const app = require('../app');

describe('POST /upload', () => {
  it('successfully uploads and processes an image', async () => {
    await request(app)
      .post('/upload')
      .attach('image', 'test-images/sample.jpg')
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('status', 'processed');
        expect(response.body).toHaveProperty('filePath');
        expect(response.body).toHaveProperty('processedFilePath');
      });
  });

  it('returns an error when no file is uploaded', async () => {
    await request(app)
      .post('/upload')
      .expect(400)
      .then(response => {
        expect(response.body).toHaveProperty('message', 'Please upload an image file.');
      });
  });

  it('handles error during image processing', async () => {
    await request(app)
      .post('/upload')
      .attach('image', 'test-images/faulty.jpg')
      .expect(500)
      .then(response => {
        expect(response.body).toHaveProperty('message', 'Error processing image.');
      });
  });
});

describe('POST /upload-tesseract', () => {
  it('successfully uploads and processes an image with Tesseract', async () => {
    await request(app)
      .post('/upload-tesseract')
      .attach('image', 'test-images/sample.jpg')
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('status', 'processed');
        expect(response.body).toHaveProperty('text');
      });
  });

  it('returns an error when no file is uploaded', async () => {
    await request(app)
      .post('/upload-tesseract')
      .expect(400)
      .then(response => {
        expect(response.body).toHaveProperty('message', 'Please upload an image file.');
      });
  });

  it('handles error during Tesseract processing', async () => {
    await request(app)
      .post('/upload-tesseract')
      .attach('image', 'test-images/faulty.jpg')
      .expect(500)
      .then(response => {
        expect(response.body).toHaveProperty('message', 'Error processing image with Tesseract.');
      });
  });
});

describe('POST /process-spreadsheet', () => {
  it('successfully processes a spreadsheet', async () => {
    await request(app)
      .post('/process-spreadsheet')
      .attach('spreadsheet', 'test-spreadsheets/sample.xlsx')
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('status', 'processed');
      });
  });

  it('handles error during spreadsheet processing', async () => {
    await request(app)
      .post('/process-spreadsheet')
      .attach('spreadsheet', 'test-spreadsheets/faulty.xlsx')
      .expect(500)
      .then(response => {
        expect(response.body).toHaveProperty('message', 'Error processing spreadsheet.');
      });
  });
});
