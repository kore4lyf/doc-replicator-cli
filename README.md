# Document Replicator CLI

Document Replicator CLI is a command-line tool designed to automate the generation of multiple documents from a DOCX template using data from an Excel spreadsheet. This tool was developed to streamline a repetitive document creation process within the real estate industry, significantly reducing manual effort and saving valuable time.

**Note:** This CLI tool is currently tailored to a specific document structure. Adapting it for other document types requires modifications to the code and a new DOCX template.

## Features

* **Automated Document Generation:** Creates multiple DOCX documents from a single template.
* **Data-Driven Population:** Populates documents with data extracted from Excel (XLS/XLSX) files.
* **Time Efficiency:** Reduces hours of manual document creation to minutes.
* **Local Execution:** Operates locally on your computer, ensuring data privacy.

## Future Improvements

- [ ] Use only one template for to generate, both stamped and unstamped documents
  **Some attempts have been made to implement this feature, but the docx-template IF statement does not currently work well within a textbox**

- [ ] Build a User interface on the solution


## Use Case (Real Estate Specific)

This tool was specifically built to automate the creation of real estate related documents, such as property valuation reports, based on information stored in an excel sheet.

## Installation

1.  **Clone the Repository:**

    ```sh
    git clone [https://github.com/kore4lyf/doc-replicator-cli](https://github.com/kore4lyf/doc-replicator-cli)
    cd doc-replicator-cli
    ```

2.  **Install Python Dependencies (for potential PDF conversion):**

    ```sh
    pip3 install -r requirements.txt
    ```

    * This installs necessary Python libraries, including `docx2pdf`.

3.  **Install JavaScript Dependencies:**

    ```sh
    npm install
    ```

    * This installs the required JavaScript dependencies.

## Usage

1.  **Prepare Your Data:**
    * Create an Excel (XLS/XLSX) file with your data. Ensure the column headers match the placeholders in your DOCX template.

2.  **Prepare Your Template:**
    * Create a DOCX template with placeholders (e.g., `{{propertyName}}`, `{{address}}`) for the data from your Excel file.

3.  **Configure `index.ts`:**
    * Open the `src/index.ts` file and modify the following variables:
        * `xlsFilename`: The path to your Excel file.
        * `outputDirectory`: The directory where generated files will be saved.
        * Adjust other variables as needed to match your data and template.
    * **Important:** Ensure the data structure and placeholders in your files align with the code's expectations.

4.  **Run the Application:**

    ```sh
    npx tsx index.js
    ```

    * This executes the script, generating documents based on your template and data.
    * Ensure you excel sheet have the following headers ("full name","property type","house number", "customer address", "serial no")

## How It Works

The script operates locally, accessing your file system to read the Excel data and DOCX template.

1.  **Data Extraction:** Reads data from the specified Excel file.
2.  **Template Population:** Populates the DOCX template with data, replacing placeholders with corresponding values.
3.  **Document Generation:** Creates individual DOCX files for each row of data.
4.  **Output:** Saves generated documents to the specified output directory.

## Important Considerations

* This tool is currently configured for a specific document format. Adapting it for other document types will require code modifications.
* Ensure your Excel data and DOCX template placeholders match the code's expectations.
* Carefully review the generated documents for accuracy.

## Contributing

Contributions are welcome, but please note that this tool's current configuration is specialized. If you plan to make changes, please provide documentation about the changes you made, and what new use cases they support.

## License

[MIT](./MIT)

## Author

[Korede Faleye](https://www.github.com/kore4lyf)