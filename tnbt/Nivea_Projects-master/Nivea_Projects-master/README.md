# TNBT Excel Automation Suite

A powerful automation tool for Excel workflows, developed for The Next Big Thing (TNBT).
![image](https://github.com/user-attachments/assets/e66c2277-7ca7-4d26-976a-0171450be80e)


## Features

- **Download Gmail Attachments**: Automatically download attachments from Gmail, with support for Delhivery and BlueDart emails
- **Consolidate Excel Files**: Combine multiple Excel files into a single consolidated file
- **Fill Invoice Dates**: Automatically fill invoice dates in consolidated files
- **Generate PDFs**: Create PDF documents from Excel data using templates

## Installation

### Prerequisites
- Python 3.7 or higher
- Required Python packages (see requirements.txt)

### Setup
1. Clone this repository or download the source code
2. Install required packages:
   ```
   pip install -r requirements.txt
   ```

### Running the Application
Run the main GUI application:
```
python main_gui.py
```

### Building Executable
To create a standalone executable:
```
pyinstaller tnbt_automation.spec
```

## Usage

1. **Download Gmail Attachments**: Downloads attachments from configured Gmail account
2. **Consolidate Excel Files**: Select Excel files to combine into a single workbook
3. **Fill Invoice Dates**: Update invoice dates in the consolidated file
4. **Generate PDFs**: Create PDF documents from the consolidated data using templates

## Project Structure
- `main_gui.py`: Main application GUI
- `Attachment_Downloader_Gmail_Step1.py`: Gmail attachment downloader
- `Excel_Consolidation.py`: Excel file consolidation functionality
- `Excel_Data_Transfer.py`: Data transfer and PDF generation
- `template/`: Contains template files for PDF generation

## Developer
Developed by Rishav Raj for TNBT (The Next Big Thing)

## License
© 2024 TNBT. All rights reserved.
