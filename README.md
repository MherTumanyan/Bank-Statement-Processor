# Bank Statement Processor

This Node.js application processes bank customer statement records provided in CSV and XML formats. It validates the records based on criteria such as unique transaction references and valid end balances.

## Technologies Used

- Node.js
- Express.js
- Multer
- csv-parser
- xml2js

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/MherTumanyan/Bank-Statement-Processor.git

2. Install dependencies:
    cd Bank-Statement-Processor
    npm install

3. Start the server:
    npm start

4. Open your browser and navigate to http://localhost:3000.

5. Upload both a CSV and an XML file using the provided form.

6. View the invalid records report displayed on the page.

7. Also you can download the report in csv format
