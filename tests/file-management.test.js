const fs = require('fs');
const path = require('path');
const { ensureUploadsDirExists } = require('../file-management');

jest.mock('fs');

describe('ensureUploadsDirExists', () => {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  const testImagesDir = path.join(__dirname, '..', 'test-images');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('creates the uploads and test-images directories if they do not exist', () => {
    fs.existsSync.mockReturnValue(false);
    ensureUploadsDirExists();
    expect(fs.existsSync).toHaveBeenCalledWith(uploadsDir);
    expect(fs.existsSync).toHaveBeenCalledWith(testImagesDir);
    expect(fs.mkdirSync).toHaveBeenCalledWith(uploadsDir, { recursive: true });
    expect(fs.mkdirSync).toHaveBeenCalledWith(testImagesDir, { recursive: true });
  });

  it('acknowledges existing uploads and test-images directories without attempting to create them', () => {
    fs.existsSync.mockReturnValue(true);
    ensureUploadsDirExists();
    expect(fs.existsSync).toHaveBeenCalledWith(uploadsDir);
    expect(fs.existsSync).toHaveBeenCalledWith(testImagesDir);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });
});
