const { processImageWithTesseract } = require('../ImageProcessor.Alt');
const Tesseract = require('tesseract.js');

jest.mock('tesseract.js', () => ({
  recognize: jest.fn(),
}));

describe('processImageWithTesseract', () => {
  it('successfully processes an image and returns text', async () => {
    Tesseract.recognize.mockResolvedValue({
      data: {
        text: 'Test OCR Text',
      },
    });

    const result = await processImageWithTesseract('path/to/image.jpg');
    expect(result).toEqual('Test OCR Text');
    expect(Tesseract.recognize).toHaveBeenCalledWith('path/to/image.jpg', 'eng', expect.any(Object));
  });

  it('handles non-existent files by throwing an error', async () => {
    Tesseract.recognize.mockRejectedValue(new Error('File not found'));

    await expect(processImageWithTesseract('path/to/nonexistent.jpg')).rejects.toThrow('File not found');
  });

  it('propagates errors from Tesseract correctly', async () => {
    Tesseract.recognize.mockRejectedValue(new Error('Unexpected error'));

    await expect(processImageWithTesseract('path/to/corrupted.jpg')).rejects.toThrow('Unexpected error');
  });
});
