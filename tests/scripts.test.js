import { fireEvent, screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { jest } from '@jest/globals';

global.fetch = jest.fn();

beforeEach(() => {
  document.body.innerHTML = `
    <form>
      <input type="file" name="file" />
      <button type="submit">Submit</button>
    </form>
    <div id="processedImage"></div>
    <a id="downloadButton"></a>
    <div id="result" style="display: none;"></div>
    <button id="yesSpreadsheet">Yes</button>
  `;
  require('../public/scripts.js');
});

afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});

describe('Form Submission and File Processing', () => {
  test('simulates form submission and verifies POST request to "/upload"', async () => {
    const formData = new FormData(document.querySelector('form'));
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ status: 'processed', filePath: 'path/to/image.jpg' }) });

    fireEvent.submit(screen.getByText('Submit'));

    expect(fetch).toHaveBeenCalledWith('/upload', { method: 'POST', body: formData });
  });

  test('simulates successful response and verifies UI update', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ status: 'processed', filePath: 'path/to/image.jpg' }) });

    fireEvent.submit(screen.getByText('Submit'));

    await screen.findByText('File processed, updating UI');

    expect(document.getElementById('processedImage').src).toContain('path/to/image.jpg');
    expect(document.getElementById('downloadButton').href).toContain('path/to/image.jpg');
    expect(document.getElementById('result').style.display).toBe('block');
  });

  test('simulates error response and verifies error logging', async () => {
    console.error = jest.fn();
    fetch.mockRejectedValueOnce(new Error('Network response was not okay'));

    fireEvent.submit(screen.getByText('Submit'));

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error during form submission or file processing:'));
  });
});

describe('Spreadsheet Processing', () => {
  test('simulates clicking "Yes" button for spreadsheet processing and verifies POST request to "/process-spreadsheet"', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ status: 'complete' }) });

    fireEvent.click(screen.getByText('Yes'));

    expect(fetch).toHaveBeenCalledWith('/process-spreadsheet', { method: 'POST' });
  });

  test('simulates successful response from spreadsheet processing and verifies modal hide and success log', async () => {
    console.log = jest.fn();
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ status: 'complete' }) });

    fireEvent.click(screen.getByText('Yes'));

    expect(console.log).toHaveBeenCalledWith('Spreadsheet processing complete.');
    expect($('#spreadsheetPromptModal').modal).toHaveBeenCalledWith('hide');
  });

  test('simulates error response from spreadsheet processing and verifies error logging', async () => {
    console.error = jest.fn();
    fetch.mockRejectedValueOnce(new Error('Network response was not okay'));

    fireEvent.click(screen.getByText('Yes'));

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error processing spreadsheet:'));
  });
});
