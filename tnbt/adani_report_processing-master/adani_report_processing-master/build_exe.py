import PyInstaller.__main__
import os

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Define the icon path (you can add an icon file later)
# icon_path = os.path.join(current_dir, 'icon.ico')

# Define the paths for the main script and other required files
main_script = os.path.join(current_dir, 'gui.py')
requirements_file = os.path.join(current_dir, 'requirements.txt')

# PyInstaller arguments
args = [
    main_script,
    '--name=Adani_Data_Processing',
    '--onefile',
    '--windowed',
    '--clean',
    '--add-data=README.md;.',
    '--add-data=requirements.txt;.',
    '--add-data=output/format.xlsx;output',
    # f'--icon={icon_path}',  # Uncomment when you have an icon
    '--noconfirm',
]

# Run PyInstaller
PyInstaller.__main__.run(args) 