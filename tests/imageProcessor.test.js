const { processImage } = require('../imageProcessor');
const { OpenAI } = require('openai');

jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    createCompletion: jest.fn(),
  })),
}));

describe('processImage', () => {
  let openAI;

  beforeEach(() => {
    openAI = new OpenAI();
    openAI.createCompletion.mockClear();
  });

  it('successfully processes an image and returns a description', async () => {
    openAI.createCompletion.mockResolvedValue({
      data: {
        choices: [
          {
            text: 'A scenic view of mountains under a clear blue sky.',
          },
        ],
      },
    });

    const description = await processImage('path/to/image.jpg');
    expect(description).toEqual('A scenic view of mountains under a clear blue sky.');
    expect(openAI.createCompletion).toHaveBeenCalledWith(expect.any(Object));
  });

  it('handles errors when processing an image', async () => {
    openAI.createCompletion.mockRejectedValue(new Error('Failed to process image'));

    await expect(processImage('path/to/invalid.jpg')).rejects.toThrow('Failed to process image');
    expect(openAI.createCompletion).toHaveBeenCalledWith(expect.any(Object));
  });
});
