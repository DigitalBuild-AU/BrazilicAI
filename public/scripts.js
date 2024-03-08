document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');

    form.onsubmit = function(e) {
        e.preventDefault();
        var formData = new FormData(form);
        console.log('Submitting form data');
        fetch('/upload', { method: 'POST', body: formData })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not okay: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'processed') {
                console.log('File processed, updating UI');
                var processedImage = document.getElementById('processedImage');
                var downloadButton = document.getElementById('downloadButton');
                processedImage.src = data.filePath;
                downloadButton.href = data.filePath;
                document.getElementById('result').style.display = 'block';
                setTimeout(() => $('#spreadsheetPromptModal').modal('show'), 100);
            } else {
                throw new Error(`Unexpected status received: ${JSON.stringify(data)}`);
            }
        })
        .catch(error => {
            console.error('Error during form submission or file processing:', error.message, error.stack);
        });
    };

    document.getElementById('yesSpreadsheet').addEventListener('click', function() {
        console.log('Initiating spreadsheet processing');
        fetch('/process-spreadsheet', { method: 'POST'})
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not okay: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'complete') {
                console.log('Spreadsheet processing complete.');
            } else {
                throw new Error(`Unexpected status from spreadsheet processing: ${JSON.stringify(data)}`);
            }
        })
        .catch(error => {
            console.error('Error processing spreadsheet:', error, error.stack);
        });

        $('#spreadsheetPromptModal').modal('hide');
    });
});