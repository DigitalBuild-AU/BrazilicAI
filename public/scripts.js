/**
 * Initializes event listeners and handlers once the DOM content is fully loaded.
 */
// Initialize when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the form element
    var form = document.querySelector('form');

    // Handle form submission
    form.onsubmit = function(e) {
        e.preventDefault(); // Prevent default form submission behavior
        var formData = new FormData(form); // Create FormData object from the form
        console.log('Submitting form data'); // Log form submission
        // Perform asynchronous file upload
        fetch('/upload', { method: 'POST', body: formData })
        .then(response => {
            if (!response.ok) { // Check if the response is not okay
                throw new Error(`Network response was not okay: ${response.statusText}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            if (data.status === 'processed') { // Check if the file was processed successfully
                console.log('File processed, updating UI'); // Log success
                // Update UI elements with the processed file information
                var processedImage = document.getElementById('processedImage');
                var downloadButton = document.getElementById('downloadButton');
                processedImage.src = data.filePath; // Set the image source
                downloadButton.href = data.filePath; // Set the download link
                document.getElementById('result').style.display = 'block'; // Display the result section
/**
 * This script handles form submissions, file uploads, and UI interactions for the Brazilica Timesheet Application.
 */
                var processedImage = document.getElementById('processedImage');
                var downloadButton = document.getElementById('downloadButton');
                processedImage.src = data.filePath; // Set the image source
                downloadButton.href = data.filePath; // Set the download link
                document.getElementById('result').style.display = 'block'; // Display the result section
                setTimeout(() => $('#spreadsheetPromptModal').modal('show'), 100); // Show the modal after a short delay
            } else {
                throw new Error(`Unexpected status received: ${JSON.stringify(data)}`); // Handle unexpected status
            }
        })
        .catch(error => {
            console.error('Error during form submission or file processing:', error.message, error.stack);
        });
    };

    // TODO: Refactor modal interaction for better UX
    /**
    * Adds an event listener for the 'Yes' button within the modal to initiate spreadsheet processing.
    */
    // Add event listener for the 'Yes' button in the modal
    document.getElementById('yesSpreadsheet').addEventListener('click', function() {
        console.log('Initiating spreadsheet processing'); // Log the initiation of spreadsheet processing
        // Perform asynchronous request to process the spreadsheet
        fetch('/process-spreadsheet', { method: 'POST'})
        .then(response => {
            if (!response.ok) { // Check if the response is not okay
                throw new Error(`Network response was not okay: ${response.statusText}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            if (data.status === 'complete') { // Check if the spreadsheet processing is complete
                console.log('Spreadsheet processing complete.'); // Log completion
            } else {
                throw new Error(`Unexpected status from spreadsheet processing: ${JSON.stringify(data)}`); // Handle unexpected status
            }
        })
        // Catch and log any errors during spreadsheet processing
        .catch(error => {
            console.error('Error processing spreadsheet:', error.message, error.stack);
        });

        $('#spreadsheetPromptModal').modal('hide'); // Hide the modal after processing
    });
});
// TODO: Implement additional error handling and user feedback mechanisms