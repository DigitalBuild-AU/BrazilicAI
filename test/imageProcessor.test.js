const { processImage } = require('../imageProcessor');
const { OpenAI } = require('openai');

jest.mock('openai');

describe('processImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully processes an image and returns text', async () => {
    const mockResponse = { data: { choices: [{ text: 'Detected text' }] } };
    OpenAI.prototype.createCompletion.mockResolvedValue(mockResponse);

    const result = await processImage('path/to/image.jpg');
    expect(result).toBe('Detected text');
  });

  it('handles different image types', async () => {
    const mockResponseJPEG = { data: { choices: [{ text: 'JPEG image detected' }] } };
    const mockResponsePNG = { data: { choices: [{ text: 'PNG image detected' }] } };
    OpenAI.prototype.createCompletion
      .mockResolvedValueOnce(mockResponseJPEG)
      .mockResolvedValueOnce(mockResponsePNG);

    const resultJPEG = await processImage('path/to/image.jpg');
    const resultPNG = await processImage('path/to/image.png');
    expect(resultJPEG).toBe('JPEG image detected');
    expect(resultPNG).toBe('PNG image detected');
  });

  it('handles errors from OpenAI', async () => {
    const mockError = new Error('OpenAI processing error');
    OpenAI.prototype.createCompletion.mockRejectedValue(mockError);

    await expect(processImage('path/to/image.jpg')).rejects.toThrow(mockError);
  });
});
