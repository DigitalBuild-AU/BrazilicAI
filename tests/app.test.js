const request = require('supertest');
const express = require('express');
jest.mock('multer', () => {
  const multer = () => ({
    single: jest.fn(() => (req, res, next) => {
      req.file = req.body.file ? { path: 'path/to/mockFile.jpg' } : undefined;
      next();
    }),
  });
  multer.diskStorage = jest.fn();
  return multer;
});
jest.mock('../imageProcessor', () => ({
  processImage: jest.fn(),
}));
jest.mock('../ImageProcessor.Alt', () => ({
  processImageWithTesseract: jest.fn(),
}));
const { processImage } = require('../imageProcessor');
const { processImageWithTesseract } = require('../ImageProcessor.Alt');
const app = require('../app');

describe('/upload route', () => {
  it('successfully uploads an image', async () => {
    processImage.mockResolvedValue('path/to/processedImage.jpg');
    const response = await request(app)
      .post('/upload')
      .send({ file: 'mockImage.jpg' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'processed');
  });

  it('handles requests without files', async () => {
    const response = await request(app)
      .post('/upload')
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Please upload an image file.');
  });

  it('handles error during image processing', async () => {
    processImage.mockRejectedValue(new Error('Error processing image'));
    const response = await request(app)
      .post('/upload')
      .send({ file: 'mockImage.jpg' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error processing image.');
  });
});

describe('/upload-tesseract route', () => {
  it('successfully processes an image with Tesseract', async () => {
    processImageWithTesseract.mockResolvedValue('Extracted text');
    const response = await request(app)
      .post('/upload-tesseract')
      .send({ file: 'mockImage.jpg' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'processed');
    expect(response.body).toHaveProperty('text', 'Extracted text');
  });

  it('handles requests without files', async () => {
    const response = await request(app)
      .post('/upload-tesseract')
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Please upload an image file.');
  });

  it('handles error during processing with Tesseract', async () => {
    processImageWithTesseract.mockRejectedValue(new Error('Error processing image with Tesseract'));
    const response = await request(app)
      .post('/upload-tesseract')
      .send({ file: 'mockImage.jpg' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error processing image with Tesseract.');
  });
});
