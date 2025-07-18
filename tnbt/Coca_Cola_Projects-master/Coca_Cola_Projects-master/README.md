# PDF Data Extractor

A desktop application for extracting and processing data from PDF files.
![image](https://github.com/user-attachments/assets/bab31245-edff-4a2e-b080-4db5c550c1f6)


## Overview

PDF Data Extractor is a tool developed for TNBT (The New Big Technology) that extracts specific information from PDF files containing "Draft Report" or "Draft Findings" in their filenames. The application processes the PDFs and generates organized Excel reports.

## Features

- Extract data from multiple PDF files in a directory
- Generate two types of Excel outputs:
  - Original format with 'Basic Info' and 'Manufacturer Stats' sheets
  - Report format with 'Injured - Tracker 2022+2023' and 'Source - Report Summary' sheets
- User-friendly GUI interface
- Progress tracking and detailed console output
- Standardized date formatting (DD-MM-YYYY)

## Usage

1. Run the application
2. Select a folder containing PDF files
3. Click 'Process PDF Files'
4. The extracted data will be saved to Excel files
5. Use additional options to generate reports or save files to custom locations

## Installation

Download the latest release from the releases section or build from source:

```
pip install pyinstaller
python build_exe.py
```

## Development

This project is built with:
- Python
- tkinter for GUI
- pandas for data processing
- pdfplumber for PDF extraction
- PyInstaller for executable creation

## Author

Developed by Rishav Raj

## License

© 2024 TNBT. All rights reserved
