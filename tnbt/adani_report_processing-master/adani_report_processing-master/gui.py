import sys
import tkinter as tk
from tkinter import ttk, filedialog, messagebox
from io import StringIO
import os
import subprocess
from master_data_fetcher import fetch_master_data
from header import main as header_main
from hygeine import fill_hygiene_sheet
from app_mb52 import process_mb52
from countsheet import process_count_sheet
from stack import process_stack_data
from raw_material import process_raw_material
import openpyxl
from PIL import Image, ImageTk

# For PyInstaller compatibility
def resource_path(relative_path):
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")
    
    # Try to find the resource in the base path
    resource = os.path.join(base_path, relative_path)
    if os.path.exists(resource):
        return resource
    
    # If not found in base path, try the current directory
    resource = os.path.join(os.path.abspath("."), relative_path)
    if os.path.exists(resource):
        return resource
    
    # If still not found, return the original path
    return os.path.join(base_path, relative_path)

# Use resource_path for format file
FORMAT_FILE_PATH = resource_path(os.path.join("output", "format.xlsx"))
os.makedirs(os.path.dirname(FORMAT_FILE_PATH), exist_ok=True)

if not os.path.exists(FORMAT_FILE_PATH):
    raise FileNotFoundError(
        f"Required format file not found at {FORMAT_FILE_PATH}. "
        "Please place your template format.xlsx in the output folder."
    )

# Constants for consistent sizing
BUTTON_WIDTH = 15
LABEL_WIDTH = 20
ENTRY_WIDTH = 50

class ConsoleRedirect(StringIO):
    def __init__(self, text_widget):
        super().__init__()
        self.text_widget = text_widget

    def write(self, s):
        self.text_widget.configure(state='normal')
        self.text_widget.insert(tk.END, s)
        self.text_widget.see(tk.END)
        self.text_widget.configure(state='disabled')

    def flush(self):
        pass

class AdaniGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Adani Data Processing")
        self.root.geometry("1000x800")
        self.s_loc_code = tk.StringVar()
        self.category = tk.StringVar()
        self.master_file_path = tk.StringVar()
        self.hygiene_input_file_path = tk.StringVar()
        self.mb52_input_file_path = tk.StringVar()
        self.countsheet_input_file_path = tk.StringVar()
        self.stack_input_file_path = tk.StringVar()
        self.create_styles()
        self.create_widgets()
        self.redirect_console()

    def create_styles(self):
        style = ttk.Style()
        style.theme_use('clam')
        
        # Configure common styles
        style.configure('TFrame', background='#f5f7fa')
        style.configure('TLabel', 
                       background='#f5f7fa', 
                       font=('Segoe UI', 11),
                       width=LABEL_WIDTH,
                       anchor='w')
        
        # Header style
        style.configure('Header.TLabel', 
                       font=('Segoe UI', 24, 'bold'), 
                       foreground='#1a237e', 
                       background='#e3e6f3', 
                       padding=15,
                       anchor='center')
        
        # Common button style
        style.configure('TButton', 
                       font=('Segoe UI', 11, 'bold'), 
                       foreground='#fff', 
                       background='#1976d2', 
                       padding=10,
                       width=BUTTON_WIDTH,
                       borderwidth=0)
        style.map('TButton', 
                 background=[('active', '#1565c0')],
                 foreground=[('active', '#ffffff')])
        
        # Fancy button style (green)
        style.configure('Fancy.TButton', 
                       font=('Segoe UI', 11, 'bold'), 
                       foreground='#fff', 
                       background='#43a047', 
                       padding=10,
                       width=BUTTON_WIDTH,
                       borderwidth=0)
        style.map('Fancy.TButton', 
                 background=[('active', '#388e3c')],
                 foreground=[('active', '#ffffff')])
        
        # Danger button style (red)
        style.configure('Danger.TButton', 
                       font=('Segoe UI', 11, 'bold'), 
                       foreground='#fff', 
                       background='#d32f2f', 
                       padding=10,
                       width=BUTTON_WIDTH,
                       borderwidth=0)
        style.map('Danger.TButton', 
                 background=[('active', '#b71c1c')],
                 foreground=[('active', '#ffffff')])
        
        # Entry style
        style.configure('TEntry', 
                       font=('Segoe UI', 11),
                       padding=5)
        
        # Combobox style
        style.configure('TCombobox', 
                       font=('Segoe UI', 11),
                       padding=5)
        
        # LabelFrame style
        style.configure('TLabelframe', 
                       background='#f5f7fa',
                       padding=15)
        style.configure('TLabelframe.Label', 
                       font=('Segoe UI', 12, 'bold'),
                       background='#f5f7fa',
                       foreground='#1a237e')

    def create_widgets(self):
        # --- PNG Gradient Background ---
        try:
            gradient_path = resource_path('gradient.png')
            if os.path.exists(gradient_path):
                self.bg_image = Image.open(gradient_path)
                self.bg_photo = ImageTk.PhotoImage(self.bg_image)
                self.bg_label = tk.Label(self.root, image=self.bg_photo)
                self.bg_label.place(x=0, y=0, relwidth=1, relheight=1)
                self.bg_label.lower()
                def resize_bg(event):
                    # Resize the background image to fit the window
                    new_width = event.width
                    new_height = event.height
                    resized = self.bg_image.resize((new_width, new_height), Image.LANCZOS)
                    self.bg_photo = ImageTk.PhotoImage(resized)
                    self.bg_label.config(image=self.bg_photo)
                self.root.bind('<Configure>', resize_bg)
            else:
                # Fallback to a solid background color if gradient.png is not found
                self.root.configure(bg='#f5f7fa')
                print("Note: gradient.png not found, using solid background color instead")
        except Exception as e:
            # Fallback to a solid background color if any error occurs
            self.root.configure(bg='#f5f7fa')
            print(f"Note: Could not load background image: {str(e)}, using solid background color instead")

        # Title Bar
        title_frame = ttk.Frame(self.root, style='TFrame')
        title_label = ttk.Label(title_frame, text="Adani Data Processing", style='Header.TLabel',anchor="center",justify="center")
        title_label.pack(fill=tk.X, pady=(10, 0),expand=True)
        title_frame.pack(fill=tk.X)
        main_horiz_frame = ttk.Frame(self.root, style='TFrame')
        main_horiz_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        # --- Left: File Selection and Input ---
        left_frame = ttk.Frame(main_horiz_frame, style='TFrame', width=450)
        left_frame.pack(side=tk.LEFT, fill=tk.Y, expand=False, padx=(0, 10))
        # left_frame.pack_propagate(False)

        # Main Frame (for input and file selection)
        self.main_frame = ttk.Frame(left_frame, padding="20", style='TFrame')
        self.main_frame.pack(fill=tk.BOTH, expand=True)

        # Input Frame
        input_frame = ttk.LabelFrame(self.main_frame, text="Input Parameters", padding="15")
        input_frame.pack(fill=tk.X, pady=10)
        
        # Category and S Loc Code
        ttk.Label(input_frame, text="Category:").grid(row=0, column=0, sticky=tk.W, pady=5, padx=5)
        category_combo = ttk.Combobox(input_frame, textvariable=self.category, values=["Wheat", "Paddy/Rice"], state="readonly", width=ENTRY_WIDTH)
        category_combo.grid(row=0, column=1, sticky=tk.W, pady=5, padx=5)
        category_combo.set("Wheat")
        
        ttk.Label(input_frame, text="S Loc Code:").grid(row=1, column=0, sticky=tk.W, pady=5, padx=5)
        ttk.Entry(input_frame, textvariable=self.s_loc_code, width=ENTRY_WIDTH).grid(row=1, column=1, sticky=tk.W, pady=5, padx=5)

        # File Selection Frame
        file_frame = ttk.LabelFrame(self.main_frame, text="File Selection", padding="15")
        file_frame.pack(fill=tk.X, pady=10)
        
        # Format File Section
        ttk.Label(file_frame, text="Format File:").grid(row=0, column=0, sticky=tk.W, pady=5, padx=5)
        ttk.Label(file_frame, text=FORMAT_FILE_PATH).grid(row=0, column=1, sticky=tk.W, pady=5, padx=5)
        ttk.Button(file_frame, text="View Format File", command=self.view_format_file, style='Fancy.TButton').grid(row=0, column=2, padx=5, pady=5)
        
        # Master File Section
        ttk.Label(file_frame, text="Master File:").grid(row=1, column=0, sticky=tk.W, pady=5, padx=5)
        ttk.Entry(file_frame, textvariable=self.master_file_path, width=ENTRY_WIDTH).grid(row=1, column=1, pady=5, padx=5)
        ttk.Button(file_frame, text="Browse", command=self.browse_master_file, style='Fancy.TButton').grid(row=1, column=2, padx=5, pady=5)
        ttk.Button(file_frame, text="Process Data", command=self.process_data, style='TButton', width=20).grid(row=1, column=3, padx=5, pady=5)
        
        # Hygiene File Section
        ttk.Label(file_frame, text="Hygiene Input File:").grid(row=2, column=0, sticky=tk.W, pady=5, padx=5)
        ttk.Entry(file_frame, textvariable=self.hygiene_input_file_path, width=ENTRY_WIDTH).grid(row=2, column=1, pady=5, padx=5)
        ttk.Button(file_frame, text="Browse", command=self.browse_hygiene_input_file, style='Fancy.TButton').grid(row=2, column=2, padx=5, pady=5)
        ttk.Button(file_frame, text="Process Hygiene", command=self.process_hygiene, style='TButton',width=20).grid(row=2, column=3, padx=5, pady=5)
        
        # MB52 File Section
        ttk.Label(file_frame, text="MB52 Input File:").grid(row=3, column=0, sticky=tk.W, pady=5, padx=5)
        ttk.Entry(file_frame, textvariable=self.mb52_input_file_path, width=ENTRY_WIDTH).grid(row=3, column=1, pady=5, padx=5)
        ttk.Button(file_frame, text="Browse", command=self.browse_mb52_input_file, style='Fancy.TButton').grid(row=3, column=2, padx=5, pady=5)
        ttk.Button(file_frame, text="Process MB52", command=self.process_mb52, style='TButton', width=20).grid(row=3, column=3, padx=5, pady=5)
        
        # Count Sheet Section
        ttk.Label(file_frame, text="Count Sheet Input:").grid(row=4, column=0, sticky=tk.W, pady=5, padx=5)
        ttk.Entry(file_frame, textvariable=self.countsheet_input_file_path, width=ENTRY_WIDTH).grid(row=4, column=1, pady=5, padx=5)
        ttk.Button(file_frame, text="Browse", command=self.browse_countsheet_input_file, style='Fancy.TButton').grid(row=4, column=2, padx=5, pady=5)
        ttk.Button(file_frame, text="Process Count Sheet", command=self.process_countsheet, style='TButton', width=20).grid(row=4, column=3, padx=5, pady=5)
        
        # Stack File Section
        ttk.Label(file_frame, text="Stack Input File:").grid(row=5, column=0, sticky=tk.W, pady=5, padx=5)
        ttk.Entry(file_frame, textvariable=self.stack_input_file_path, width=ENTRY_WIDTH).grid(row=5, column=1, pady=5, padx=5)
        ttk.Button(file_frame, text="Browse", command=self.browse_stack_input_file, style='Fancy.TButton').grid(row=5, column=2, padx=5, pady=5)
        ttk.Button(file_frame, text="Process Stack", command=self.process_stack, style='TButton',width=20).grid(row=5, column=3, padx=5, pady=5)
        
        # Raw Material Section
        ttk.Label(file_frame, text="Raw Material:").grid(row=6, column=0, sticky=tk.W, pady=5, padx=5)
        ttk.Button(file_frame, text="Process Raw Material", command=self.process_raw_material, style='Danger.TButton', width=20).grid(row=6, column=3, padx=5, pady=5)

        # --- Right: Console Output ---
        right_frame = ttk.Frame(main_horiz_frame, style='TFrame')
        right_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # Status Label (move to right_frame, above console)
        self.status_label = ttk.Label(right_frame, 
                                    text="", 
                                    font=("Segoe UI", 11, "italic"), 
                                    foreground="#1976d2",
                                    width=LABEL_WIDTH)
        self.status_label.pack(pady=10, anchor='nw')

        # Console Output Area (move to right_frame)
        console_frame = ttk.LabelFrame(right_frame, text="Console Output", padding="5")
        console_frame.pack(fill=tk.BOTH, expand=True, padx=0, pady=(0, 1))
        self.console_text = tk.Text(console_frame, 
                                  height=8,  # Reduce height from 10 to 8 to make it more compact
                                  font=("Consolas", 10), 
                                  bg="#23272e", 
                                  fg="#e0e0e0", 
                                  insertbackground="#e0e0e0", 
                                  wrap=tk.WORD, 
                                  state='disabled')
        self.console_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, pady=5)
        console_scroll = ttk.Scrollbar(console_frame, command=self.console_text.yview)
        console_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        self.console_text['yscrollcommand'] = console_scroll.set

    def redirect_console(self):
        sys.stdout = ConsoleRedirect(self.console_text)
        sys.stderr = ConsoleRedirect(self.console_text)

    def browse_master_file(self):
        filename = filedialog.askopenfilename(
            title="Select Master File",
            filetypes=[("Excel files", "*.xlsx"), ("All files", "*.*")]
        )
        if filename:
            self.master_file_path.set(filename)
            
    def browse_hygiene_input_file(self):
        filename = filedialog.askopenfilename(
            title="Select Hygiene Input File",
            filetypes=[("Excel files", "*.xlsx"), ("All files", "*.*")]
        )
        if filename:
            self.hygiene_input_file_path.set(filename)
            
    def browse_mb52_input_file(self):
        filename = filedialog.askopenfilename(
            title="Select MB52 Input File",
            filetypes=[("Excel files", "*.xlsx"), ("All files", "*.*")]
        )
        if filename:
            self.mb52_input_file_path.set(filename)
            
    def browse_countsheet_input_file(self):
        filename = filedialog.askopenfilename(
            title="Select Count Sheet Input File",
            filetypes=[("Excel files", "*.xlsx"), ("All files", "*.*")]
        )
        if filename:
            self.countsheet_input_file_path.set(filename)
            
    def browse_stack_input_file(self):
        filename = filedialog.askopenfilename(
            title="Select Stack Input File",
            filetypes=[("Excel files", "*.xlsx"), ("All files", "*.*")]
        )
        if filename:
            self.stack_input_file_path.set(filename)
            
    def process_data(self):
        # Validate inputs
        if not self.s_loc_code.get():
            messagebox.showerror("Error", "Please enter S Loc Code")
            return
            
        if not self.category.get():
            messagebox.showerror("Error", "Please select a category")
            return
            
        if not self.master_file_path.get():
            messagebox.showerror("Error", "Please select master file")
            return
            
        try:
            self.status_label.config(text="Processing data...")
            self.root.update()
            result = fetch_master_data(
                s_loc_code=self.s_loc_code.get(),
                category=self.category.get(),
                master_file_path=self.master_file_path.get()
            )
            if result["status"] == "error":
                messagebox.showerror("Error", result.get("error_message", "Unknown error"))
                return
            header_main(
                master_data=result["master_data"],
                auditor_data=result["auditor_data"],
                output_file_path=FORMAT_FILE_PATH,
                format_file_path=FORMAT_FILE_PATH
            )
            self.status_label.config(text=f"Data processing completed! Output: {FORMAT_FILE_PATH}")
            messagebox.showinfo("Success", f"Data processing completed! Output: {FORMAT_FILE_PATH}")
        except Exception as e:
            self.status_label.config(text=f"Error: {str(e)}")
            messagebox.showerror("Error", str(e))

    def process_hygiene(self):
        # Validate inputs
        if not self.s_loc_code.get():
            messagebox.showerror("Error", "Please enter S Loc Code")
            return
        if not self.category.get():
            messagebox.showerror("Error", "Please select a category")
            return
        if not self.master_file_path.get():
            messagebox.showerror("Error", "Please select master file")
            return
        if not self.hygiene_input_file_path.get():
            messagebox.showerror("Error", "Please select hygiene input file")
            return
        try:
            self.status_label.config(text="Processing hygiene data...")
            self.root.update()
            result = fetch_master_data(
                s_loc_code=self.s_loc_code.get(),
                category=self.category.get(),
                master_file_path=self.master_file_path.get()
            )
            if result["status"] == "error":
                messagebox.showerror("Error", result.get("error_message", "Unknown error"))
                return
            fill_hygiene_sheet(
                master_data=result["master_data"],
                format_file_path=FORMAT_FILE_PATH,
                hygiene_input_file_path=self.hygiene_input_file_path.get()
            )
            self.status_label.config(text=f"Hygiene data processed! Output: {FORMAT_FILE_PATH}")
            messagebox.showinfo("Success", f"Hygiene data processed! Output: {FORMAT_FILE_PATH}")
        except Exception as e:
            self.status_label.config(text=f"Error: {str(e)}")
            messagebox.showerror("Error", str(e))

    def process_mb52(self):
        # Validate inputs
        if not self.s_loc_code.get():
            messagebox.showerror("Error", "Please enter S Loc Code")
            return
        if not self.mb52_input_file_path.get():
            messagebox.showerror("Error", "Please select MB52 input file")
            return
        try:
            self.status_label.config(text="Processing MB52 data...")
            self.root.update()
            process_mb52(
                format_file_path=FORMAT_FILE_PATH,
                mb52_input_file_path=self.mb52_input_file_path.get(),
                s_loc_code=self.s_loc_code.get()
            )
            self.status_label.config(text=f"MB52 data processed! Output: {FORMAT_FILE_PATH}")
            messagebox.showinfo("Success", f"MB52 data processed! Output: {FORMAT_FILE_PATH}")
        except Exception as e:
            self.status_label.config(text=f"Error: {str(e)}")
            messagebox.showerror("Error", str(e))

    def process_countsheet(self):
        # Validate inputs
        if not self.countsheet_input_file_path.get():
            messagebox.showerror("Error", "Please select Count Sheet input file")
            return
        try:
            self.status_label.config(text="Processing Count Sheet data...")
            self.root.update()
            process_count_sheet(
                input_file=self.countsheet_input_file_path.get(),
                output_file=FORMAT_FILE_PATH
            )
            self.status_label.config(text=f"Count Sheet data processed! Output: {FORMAT_FILE_PATH}")
            messagebox.showinfo("Success", f"Count Sheet data processed! Output: {FORMAT_FILE_PATH}")
        except Exception as e:
            self.status_label.config(text=f"Error: {str(e)}")
            messagebox.showerror("Error", str(e))

    def process_stack(self):
        # Validate inputs
        if not self.s_loc_code.get():
            messagebox.showerror("Error", "Please enter S Loc Code")
            return
        if not self.category.get():
            messagebox.showerror("Error", "Please select a category")
            return
        if not self.master_file_path.get():
            messagebox.showerror("Error", "Please select master file")
            return
        if not self.stack_input_file_path.get():
            messagebox.showerror("Error", "Please select Stack input file")
            return
        try:
            self.status_label.config(text="Processing Stack data...")
            self.root.update()
            result = fetch_master_data(
                s_loc_code=self.s_loc_code.get(),
                category=self.category.get(),
                master_file_path=self.master_file_path.get()
            )
            if result["status"] == "error":
                messagebox.showerror("Error", result.get("error_message", "Unknown error"))
                return
            process_stack_data(
                input_file=self.stack_input_file_path.get(),
                output_file=FORMAT_FILE_PATH,
                master_data=result["master_data"]
            )
            self.status_label.config(text=f"Stack data processed! Output: {FORMAT_FILE_PATH}")
            messagebox.showinfo("Success", f"Stack data processed! Output: {FORMAT_FILE_PATH}")
        except Exception as e:
            self.status_label.config(text=f"Error: {str(e)}")
            messagebox.showerror("Error", str(e))

    def process_raw_material(self):
        # Validate inputs
        if not self.s_loc_code.get():
            messagebox.showerror("Error", "Please enter S Loc Code")
            return
        if not self.category.get():
            messagebox.showerror("Error", "Please select a category")
            return
        if not self.master_file_path.get():
            messagebox.showerror("Error", "Please select master file")
            return
        try:
            self.status_label.config(text="Processing Raw Material data...")
            self.root.update()
            result = fetch_master_data(
                s_loc_code=self.s_loc_code.get(),
                category=self.category.get(),
                master_file_path=self.master_file_path.get()
            )
            if result["status"] == "error":
                messagebox.showerror("Error", result.get("error_message", "Unknown error"))
                return
            process_raw_material(
                format_file_path=FORMAT_FILE_PATH,
                master_data=result["master_data"]
            )
            self.status_label.config(text=f"Raw Material data processed! Output: {FORMAT_FILE_PATH}")
            messagebox.showinfo("Success", f"Raw Material data processed! Output: {FORMAT_FILE_PATH}")
        except Exception as e:
            self.status_label.config(text=f"Error: {str(e)}")
            messagebox.showerror("Error", str(e))

    def view_format_file(self):
        """Open the format Excel file in the default application"""
        if os.path.exists(FORMAT_FILE_PATH):
            try:
                if sys.platform == 'win32':
                    os.startfile(FORMAT_FILE_PATH)
                elif sys.platform == 'darwin':  # macOS
                    subprocess.run(['open', FORMAT_FILE_PATH])
                else:  # Linux
                    subprocess.run(['xdg-open', FORMAT_FILE_PATH])
            except Exception as e:
                messagebox.showerror("Error", f"Could not open format file: {str(e)}")
        else:
            messagebox.showinfo("Information", "Format file does not exist yet. Process some data first.")

def main():
    root = tk.Tk()
    app = AdaniGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()