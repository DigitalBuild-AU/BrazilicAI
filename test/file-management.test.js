const fs = require('fs');
const mockFs = require('mock-fs');
const { ensureUploadsDirExists } = require('../file-management');
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

beforeEach(() => {
  jest.clearAllMocks();
  mockFs.restore();
});

afterAll(() => {
  mockFs.restore();
});

describe('ensureUploadsDirExists', () => {
  it('creates directories if they do not exist', () => {
    mockFs({});
    ensureUploadsDirExists();
    expect(fs.existsSync('uploads')).toBeTruthy();
    expect(fs.existsSync('test-images')).toBeTruthy();
    expect(consoleSpy).toHaveBeenCalledWith('Uploads directory created.');
    expect(consoleSpy).toHaveBeenCalledWith('Test-images directory created.');
  });

  it('does nothing if directories already exist', () => {
    mockFs({
      'uploads': {},
      'test-images': {}
    });
    ensureUploadsDirExists();
    expect(consoleSpy).toHaveBeenCalledWith('Uploads directory already exists.');
    expect(consoleSpy).toHaveBeenCalledWith('Test-images directory already exists.');
  });

  it('handles errors when creating directories', () => {
    mockFs({
      'uploads': mockFs.directory({ mode: 0o000 }),
      'test-images': mockFs.directory({ mode: 0o000 })
    });
    ensureUploadsDirExists();
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to ensure directories exist:'));
  });
});
