const { processImageWithTesseract } = require('../ImageProcessor.Alt');
const Tesseract = require('tesseract.js');

jest.mock('tesseract.js');

describe('processImageWithTesseract', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully processes an image and returns text', async () => {
    const mockText = 'Detected text';
    Tesseract.recognize.mockResolvedValue({
      data: { text: mockText }
    });

    const result = await processImageWithTesseract('path/to/image.jpg');
    expect(result).toBe(mockText);
    expect(Tesseract.recognize).toHaveBeenCalledWith('path/to/image.jpg', 'eng', expect.any(Object));
  });

  it('handles different languages', async () => {
    const mockText = 'Detected text in Spanish';
    Tesseract.recognize.mockImplementation((filePath, lang) => {
      if (lang === 'spa') {
        return Promise.resolve({
          data: { text: mockText }
        });
      }
    });

    const result = await processImageWithTesseract('path/to/image.jpg', 'spa');
    expect(result).toBe(mockText);
    expect(Tesseract.recognize).toHaveBeenCalledWith('path/to/image.jpg', 'spa', expect.any(Object));
  });

  it('handles errors from Tesseract', async () => {
    const mockError = new Error('Tesseract processing error');
    Tesseract.recognize.mockRejectedValue(mockError);

    await expect(processImageWithTesseract('path/to/image.jpg')).rejects.toThrow(mockError);
    expect(Tesseract.recognize).toHaveBeenCalledWith('path/to/image.jpg', 'eng', expect.any(Object));
  });
});
