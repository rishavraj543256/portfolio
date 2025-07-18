import subprocess
import os
import sys
import shutil
from datetime import datetime

def build_executable():
    """Build executable for PDF Extractor tool"""
    print("Building PDF Extractor Executable...")
    
    # Ensure PyInstaller is installed
    try:
        import PyInstaller
        print("PyInstaller is already installed.")
    except ImportError:
        print("Installing PyInstaller...")
        subprocess.call([sys.executable, "-m", "pip", "install", "pyinstaller"])
    
    # Create icon if not exists
    if not os.path.exists("icon.ico"):
        print("Creating application icon...")
        try:
            subprocess.call([sys.executable, "create_icon.py"])
        except Exception as e:
            print(f"Error creating icon: {str(e)}")
            print("Continuing without custom icon...")
    
    # Get the version with date stamp
    version = datetime.now().strftime("%Y.%m.%d")
    print(f"Setting version: {version}")
    
    # Create a build folder if it doesn't exist
    if not os.path.exists("build"):
        os.makedirs("build")
    
    # Build the executable
    print("\nBuilding executable with PyInstaller (this may take a few minutes)...")
    
    # Use the spec file instead of command line arguments
    pyinstaller_command = [
        "pyinstaller",
        "--clean",
        "PDF_Extractor.spec"
    ]
    
    result = subprocess.call(pyinstaller_command)
    
    if result == 0:
        print("\nExecutable built successfully!")
        print("\nExecutable is located at: dist/PDF_Extractor.exe")
        
        # Create a release folder with the version
        release_folder = f"release_v{version}"
        if not os.path.exists(release_folder):
            os.makedirs(release_folder)
        
        # Copy the executable to the release folder
        shutil.copy2("dist/PDF_Extractor.exe", f"{release_folder}/PDF_Extractor.exe")
        
        # Create a README file
        with open(f"{release_folder}/README.txt", "w") as f:
            f.write("PDF Data Extractor\n")
            f.write("TNBT - The New Big Technology\n")
            f.write(f"Version: {version}\n")
            f.write("Developed by Rishav Raj\n\n")
            f.write("Instructions:\n")
            f.write("1. Run PDF_Extractor.exe\n")
            f.write("2. Select a folder containing PDF files\n")
            f.write("3. Click 'Process PDF Files'\n")
            f.write("4. The extracted data will be saved to an Excel file\n")
            f.write("5. Use 'Update Final Tracker' to append data to your master tracker\n\n")
            f.write("For support, contact Rishav Raj\n")
        
        print(f"\nRelease package created at: {release_folder}/")
        print(f"Files in release package:")
        print(f"  - PDF_Extractor.exe")
        print(f"  - README.txt")
    else:
        print("\nError building executable. Check the output above for errors.")

if __name__ == "__main__":
    build_executable() 