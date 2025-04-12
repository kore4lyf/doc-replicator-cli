import os
from docx2pdf import convert

def convert_docx_to_pdf():
    # Get the current working directory
    current_directory = os.getcwd()
    
    # Define the path to the 'out/stamped' directory
    stamped_directory = os.path.join(current_directory, "out", "stamped")
    
    # Define the path to the 'out/stamped/pdf' directory for storing PDFs
    pdf_directory = os.path.join(stamped_directory, "pdf")
    
    # Create the 'pdf' directory if it doesn't exist
    if not os.path.exists(pdf_directory):
        os.makedirs(pdf_directory)
    
    # Iterate through all files in the 'out/stamped' directory
    for filename in os.listdir(stamped_directory):
        if filename.endswith(".docx"):
            docx_path = os.path.join(stamped_directory, filename)
            pdf_output_path = os.path.join(pdf_directory, os.path.splitext(filename)[0] + ".pdf")
            
            # Convert DOCX to PDF
            try:
                convert(docx_path, pdf_output_path)
                print(f"Converted: {filename} to PDF at {pdf_output_path}.")
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    convert_docx_to_pdf()
