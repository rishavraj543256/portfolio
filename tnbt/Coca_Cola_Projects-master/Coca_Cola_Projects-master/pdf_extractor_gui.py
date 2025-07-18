import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import os
import sys
import threading
import time
import pandas as pd
from datetime import datetime
import io
import contextlib
import subprocess
import pdf_extraction as pdf_ex
from PIL import Image, ImageTk  # Add PIL import for image handling

class RedirectText:
    """Class to redirect console output to a tkinter Text widget"""
    def __init__(self, text_widget):
        self.text_widget = text_widget
        self.buffer = io.StringIO()
        
    def write(self, string):
        self.buffer.write(string)
        self.text_widget.config(state=tk.NORMAL)
        self.text_widget.insert(tk.END, string)
        self.text_widget.see(tk.END)
        self.text_widget.config(state=tk.DISABLED)
        self.text_widget.update()
        
    def flush(self):
        pass


class PDFExtractorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("PDF Data Extractor")
        self.root.geometry("1100x750")
        self.root.minsize(900, 650)
        
        # Set app icon if available
        try:
            self.root.iconbitmap("icon.ico")
        except:
            pass
        
        # Variables
        self.input_dir = tk.StringVar()
        self.output_file = tk.StringVar()
        self.original_file = tk.StringVar()  # For storing original Excel path
        self.report_file = tk.StringVar()    # For storing report Excel path
        self.process_running = False
        self.extracted_files = []
        
        # Apply theme and styling - using a more modern color scheme
        self.style = ttk.Style()
        self.style.theme_use('clam')
        
        # Configure colors - more vibrant and modern palette
        self.bg_color = "#f8f9fa"  # Light background
        self.accent_color = "#3498db"  # Bright blue
        self.button_color = "#2980b9"  # Darker blue
        self.header_color = "#2c3e50"  # Dark blue-gray
        self.header_gradient_end = "#34495e"  # Slightly lighter blue-gray for gradient effect
        self.footer_color = "#34495e"  # Slightly lighter blue-gray
        self.success_color = "#2ecc71"  # Bright green
        self.warning_color = "#f39c12"  # Orange
        self.error_color = "#e74c3c"  # Red
        self.text_color = "#2d3436"  # Dark gray for text
        self.highlight_color = "#74b9ff"  # Light blue highlight
        self.logo_border_color = "#5dade2"  # Light blue for logo border
        
        # Configure styles with enhanced fonts and padding
        self.style.configure('TFrame', background=self.bg_color)
        self.style.configure('Header.TFrame', background=self.header_color)
        self.style.configure('Footer.TFrame', background=self.footer_color)
        
        # Button styling
        self.style.configure('TButton', 
                            font=('Segoe UI', 11, 'bold'),
                            background=self.button_color,
                            foreground='white',
                            padding=8)
        self.style.map('TButton',
                      background=[('active', self.accent_color), ('pressed', '#1f618d')])
        
        # Primary action button style
        self.style.configure('Primary.TButton', 
                           font=('Segoe UI', 12, 'bold'),
                           padding=10,
                           background=self.accent_color)
        self.style.map('Primary.TButton',
                      background=[('active', '#2980b9'), ('pressed', '#1f618d')])
        
        # Success button style
        self.style.configure('Success.TButton', 
                           font=('Segoe UI', 11, 'bold'),
                           padding=8,
                           background=self.success_color)
        self.style.map('Success.TButton',
                      background=[('active', '#27ae60'), ('pressed', '#1e8449')])
        
        # Label styling
        self.style.configure('TLabel', 
                            font=('Segoe UI', 11),
                            background=self.bg_color,
                            foreground=self.text_color)
        
        # Header labels
        self.style.configure('Header.TLabel', 
                            font=('Segoe UI', 16, 'bold'),
                            foreground='white',
                            background=self.header_color)
        
        # Title label
        self.style.configure('Title.TLabel', 
                            font=('Segoe UI', 28, 'bold'),
                            foreground='white',
                            background=self.header_color)
        
        # Footer label
        self.style.configure('Footer.TLabel', 
                            font=('Segoe UI', 10),
                            foreground='white',
                            background=self.footer_color)
        
        # Status label
        self.style.configure('Status.TLabel',
                           font=('Segoe UI', 11, 'bold'),
                           foreground='black',
                           background=self.bg_color)
        
        # Success status
        self.style.configure('Success.TLabel',
                           font=('Segoe UI', 11, 'bold'),
                           foreground=self.success_color,
                           background=self.bg_color)
        
        # Error status
        self.style.configure('Error.TLabel',
                           font=('Segoe UI', 11, 'bold'),
                           foreground=self.error_color,
                           background=self.bg_color)
        
        # Frame with border
        self.style.configure('Card.TFrame', 
                           background=self.bg_color,
                           relief='solid',
                           borderwidth=1)
        
        # Logo frame style
        self.style.configure('Logo.TFrame',
                            background=self.logo_border_color,
                            relief='solid',
                            borderwidth=1)
        
        # Elevated card style for a modern look
        self.style.configure('Elevated.TFrame',
                          background=self.bg_color,
                          relief='ridge',
                          borderwidth=1)
        
        # LabelFrame styling
        self.style.configure('TLabelframe', 
                           font=('Segoe UI', 11, 'bold'),
                           background=self.bg_color,
                           foreground=self.text_color,
                           borderwidth=2)
        self.style.configure('TLabelframe.Label', 
                           font=('Segoe UI', 11, 'bold'),
                           background=self.bg_color,
                           foreground=self.text_color)
        
        # Entry styling
        self.style.configure('TEntry', 
                           font=('Segoe UI', 11),
                           padding=8)
        
        # Progress bar
        self.style.configure("TProgressbar", 
                           background=self.accent_color,
                           troughcolor=self.bg_color,
                           thickness=8)
        
        # Setup the main container
        self.setup_ui()
        
    def setup_ui(self):
        """Set up the user interface"""
        # Create a main frame with explicit layout management
        main_frame = ttk.Frame(self.root)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Create a gradient-like effect for the header with two frames
        header_container = ttk.Frame(main_frame, style='Header.TFrame')
        header_container.pack(fill=tk.X)
        
        # Add a subtle top border to header
        top_border = ttk.Frame(header_container, height=3, style='Header.TFrame')
        top_border.pack(fill=tk.X)
        
        # Header frame with padding
        header_frame = ttk.Frame(header_container, style='Header.TFrame')
        header_frame.pack(fill=tk.X, padx=20)
        
        # Add some padding to the header
        header_padding = ttk.Frame(header_frame, style='Header.TFrame')
        header_padding.pack(pady=15)
        
        # Logo and title in a horizontal layout with better alignment
        logo_title_frame = ttk.Frame(header_padding, style='Header.TFrame')
        logo_title_frame.pack(pady=(5, 0))
        
        # Title frame with clean styling
        title_frame = ttk.Frame(logo_title_frame, style='Header.TFrame')
        title_frame.pack(side=tk.LEFT, padx=(10, 0), pady=(15, 0))
        
        # Use a simple clean title without shadow effect
        company_label = tk.Label(title_frame, 
                                text="TNBT", 
                                font=('Segoe UI', 40, 'bold'),
                                bg=self.header_color,
                                fg='white')
        company_label.pack(pady=(0, 0))
        
        # Subtitle with a lighter style
        subtitle_label = tk.Label(title_frame, 
                                 text="The Next Big Thing", 
                                 font=('Segoe UI', 16,"bold"),
                                 bg=self.header_color,
                                 fg='#a3c5e0')
        subtitle_label.pack(pady=(0, 5))
        
        # Add a subtle separator under the header
        separator = tk.Frame(header_container, height=2, bg='#4a6583')
        separator.pack(fill=tk.X, pady=(0, 0))
        
        # Create a middle frame for content and a bottom frame for footer
        middle_frame = ttk.Frame(main_frame)
        middle_frame.pack(fill=tk.BOTH, expand=True)
        
        # Footer frame - will always be at the bottom
        footer_frame = ttk.Frame(main_frame, style='Footer.TFrame', height=40)
        footer_frame.pack(fill=tk.X, side=tk.BOTTOM)
        footer_frame.pack_propagate(False)  # Prevent the frame from shrinking
        
        # Style for bold footer text
        self.style.configure('Bold.Footer.TLabel', 
                           font=('Segoe UI', 12, 'bold'),
                           foreground='white',
                           background=self.footer_color)
        
        # Create a container for perfect centering
        center_container = ttk.Frame(footer_frame, style='Footer.TFrame')
        center_container.pack(fill=tk.BOTH, expand=True)
        
        # Ensure the developer name is visible with centered bold text
        developer_label = ttk.Label(center_container, 
                                  text="Developed by Rishav Raj", 
                                  style='Bold.Footer.TLabel')
        
        # Center the label both horizontally and vertically
        developer_label.place(relx=0.5, rely=0.5, anchor='center')
        
        # Content frame with padding inside the middle_frame
        content_frame = ttk.Frame(middle_frame)
        content_frame.pack(fill=tk.BOTH, expand=True, padx=25, pady=15)
        
        # Left panel for input/options
        left_panel = ttk.Frame(content_frame)
        left_panel.pack(side=tk.LEFT, fill=tk.BOTH, padx=(0, 15), expand=True, anchor='n')
        
        # Input directory section - using a card-like design
        input_frame = ttk.LabelFrame(left_panel, text=" Input Directory ")
        input_frame.pack(fill=tk.X, pady=(0, 15), padx=5, ipady=5)
        
        input_subframe = ttk.Frame(input_frame)
        input_subframe.pack(fill=tk.X, padx=10, pady=10)
        
        input_entry = ttk.Entry(input_subframe, textvariable=self.input_dir, font=('Segoe UI', 11))
        input_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 10), ipady=3)
        
        browse_btn = ttk.Button(input_subframe, text="Browse", command=self.browse_input)
        browse_btn.pack(side=tk.RIGHT, padx=0, pady=0)
        
        # Process button - make it stand out as the primary action
        self.process_btn = ttk.Button(left_panel, 
                                    text="Process PDF Files", 
                                    command=self.start_processing,
                                    style='Primary.TButton')
        self.process_btn.pack(fill=tk.X, pady=15, padx=5, ipady=5)
        
        # Actions frame - card-like design
        actions_frame = ttk.LabelFrame(left_panel, text=" Actions ")
        actions_frame.pack(fill=tk.X, pady=(0, 15), padx=5, ipady=5)
        
        actions_subframe = ttk.Frame(actions_frame)
        actions_subframe.pack(fill=tk.X, padx=10, pady=10)
        
        # Save Original File button (new)
        self.save_original_btn = ttk.Button(actions_subframe, 
                                           text="Save Original Excel File", 
                                           command=self.save_original_file,
                                           state=tk.DISABLED)
        self.save_original_btn.pack(fill=tk.X, padx=0, pady=(0, 10))
        
        # Generate Report button (new)
        self.generate_report_btn = ttk.Button(actions_subframe, 
                                            text="Generate Report", 
                                            command=self.generate_report,
                                            state=tk.DISABLED)
        self.generate_report_btn.pack(fill=tk.X, padx=0, pady=(0, 10))
        
        # Open output file button
        self.open_original_btn = ttk.Button(actions_subframe, 
                                         text="Open Original Excel", 
                                         command=self.open_original_file,
                                         style='Success.TButton',
                                         state=tk.DISABLED)
        self.open_original_btn.pack(fill=tk.X, padx=0, pady=(0, 10))
        
        # Open report file button (new)
        self.open_report_btn = ttk.Button(actions_subframe, 
                                       text="Open Report Excel", 
                                       command=self.open_report_file,
                                       style='Success.TButton',
                                       state=tk.DISABLED)
        self.open_report_btn.pack(fill=tk.X, padx=0, pady=0)
        
        # Status section - card-like design
        status_frame = ttk.LabelFrame(left_panel, text=" Status ")
        status_frame.pack(fill=tk.X, pady=(0, 15), padx=5, ipady=5)
        
        status_subframe = ttk.Frame(status_frame)
        status_subframe.pack(fill=tk.X, padx=10, pady=10)
        
        self.status_label = ttk.Label(status_subframe, 
                                    text="Ready to process PDF files", 
                                    style='Status.TLabel',
                                    wraplength=300)
        self.status_label.pack(fill=tk.X, padx=5, pady=5)
        
        # Progress bar - with increased height
        progress_frame = ttk.Frame(left_panel)
        progress_frame.pack(fill=tk.X, pady=5, padx=5)
        
        self.progress = ttk.Progressbar(progress_frame, orient=tk.HORIZONTAL, mode='indeterminate', style='TProgressbar')
        self.progress.pack(fill=tk.X, ipady=2)
        
        # Right panel for console output
        right_panel = ttk.Frame(content_frame)
        right_panel.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        
        output_frame = ttk.LabelFrame(right_panel, text=" Console Output ")
        output_frame.pack(fill=tk.BOTH, expand=True, padx=5)
        
        output_subframe = ttk.Frame(output_frame)
        output_subframe.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Create a Text widget for console output with a scrollbar
        output_scroll = ttk.Scrollbar(output_subframe)
        output_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.output_text = tk.Text(output_subframe, wrap=tk.WORD, 
                                font=('Consolas', 10),
                                bg="#f8f9fa", fg="#212529", 
                                height=20, width=50)
        self.output_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        self.output_text.config(state=tk.DISABLED)  # Make read-only
        
        # Configure the scrollbar
        output_scroll.config(command=self.output_text.yview)
        self.output_text.config(yscrollcommand=output_scroll.set)
        
        # Redirect stdout to the Text widget
        self.redirect = RedirectText(self.output_text)
        sys.stdout = self.redirect
        
        # Setting minimum size for the window to ensure footer is visible
        self.root.update_idletasks()  # Update to get correct dimensions
        min_height = max(650, content_frame.winfo_reqheight() + header_container.winfo_reqheight() + footer_frame.winfo_reqheight() + 50)
        self.root.minsize(900, min_height)
        
    def browse_input(self):
        """Browse for input directory"""
        directory = filedialog.askdirectory(title="Select Directory with PDF Files")
        if directory:
            self.input_dir.set(directory)
            self.status_label.config(text=f"Selected directory: {os.path.basename(directory)}")
    
    def set_status(self, text, color=None):
        """Update status label with optional color"""
        self.status_label.config(text=text)
        
        if color == self.success_color:
            self.status_label.config(style='Success.TLabel')
        elif color == self.error_color:
            self.status_label.config(style='Error.TLabel')
        else:
            self.status_label.config(style='Status.TLabel', foreground=color if color else 'black')
    
    def start_processing(self):
        """Start processing PDFs in a separate thread"""
        if not self.input_dir.get():
            messagebox.showerror("Error", "Please select an input directory first.")
            return
            
        if self.process_running:
            messagebox.showinfo("Process Running", "Processing is already running. Please wait.")
            return
            
        # Clear output and update UI
        self.output_text.config(state=tk.NORMAL)
        self.output_text.delete(1.0, tk.END)
        self.output_text.config(state=tk.DISABLED)
        
        self.process_running = True
        self.process_btn.config(state=tk.DISABLED)
        self.save_original_btn.config(state=tk.DISABLED)
        self.generate_report_btn.config(state=tk.DISABLED)
        self.open_original_btn.config(state=tk.DISABLED)
        self.open_report_btn.config(state=tk.DISABLED)
        self.progress.start(10)
        self.set_status("Processing PDF files... Please wait", self.accent_color)
        
        # Start processing in a separate thread
        thread = threading.Thread(target=self.process_pdfs)
        thread.daemon = True
        thread.start()
    
    def process_pdfs(self):
        """Process PDF files in the selected directory"""
        try:
            directory = self.input_dir.get()
            print(f"Starting PDF extraction from: {directory}")
            print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print("-" * 50)
            
            # Call the process_all_pdfs_for_gui function with just the directory
            # The function will automatically save the original file
            basic_df, manufacturer_df, original_path, _ = pdf_ex.process_all_pdfs_for_gui(directory)
            
            if original_path:
                self.original_file.set(original_path)
                print(f"\nSuccess! Original data saved to: {self.original_file.get()}")
                self.root.after(0, self.enable_buttons)
                self.root.after(0, lambda: self.set_status(f"Processing complete! Original file: {os.path.basename(self.original_file.get())}", 
                                                        self.success_color))
            else:
                self.root.after(0, lambda: self.set_status("No output files generated. Check console for errors.", self.error_color))
                
        except Exception as e:
            print(f"Error processing PDFs: {str(e)}")
            self.root.after(0, lambda: self.set_status(f"Error: {str(e)}", self.error_color))
            import traceback
            traceback.print_exc()
        finally:
            self.process_running = False
            self.root.after(0, self.progress.stop)
            self.root.after(0, lambda: self.process_btn.config(state=tk.NORMAL))
    
    def enable_buttons(self):
        """Enable action buttons after processing"""
        self.save_original_btn.config(state=tk.NORMAL)
        self.generate_report_btn.config(state=tk.NORMAL)
        self.open_original_btn.config(state=tk.NORMAL)
    
    def save_original_file(self):
        """Save the original Excel file to a location of user's choice"""
        if not self.original_file.get():
            messagebox.showerror("Error", "No original file data available.")
            return
            
        try:
            # Get the filename from the original file
            default_filename = os.path.basename(self.original_file.get())
            
            # Ask user where to save
            save_path = filedialog.asksaveasfilename(
                title="Save Original Excel File",
                initialfile=default_filename,
                defaultextension=".xlsx",
                filetypes=[("Excel files", "*.xlsx"), ("All files", "*.*")]
            )
            
            if not save_path:
                return
                
            # Copy the file
            import shutil
            shutil.copy2(self.original_file.get(), save_path)
            
            self.set_status(f"Original file saved to: {save_path}", self.success_color)
            
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save file: {str(e)}")
    
    def generate_report(self):
        """Generate the report Excel file"""
        if not self.original_file.get():
            messagebox.showerror("Error", "No original file data available.")
            return
            
        if self.process_running:
            messagebox.showinfo("Process Running", "Processing is already running. Please wait.")
            return
            
        # Ask user where to save the report
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        default_filename = f'pdf_extraction_report_{timestamp}.xlsx'
        
        report_path = filedialog.asksaveasfilename(
            title="Save Report Excel File",
            initialfile=default_filename,
            defaultextension=".xlsx",
            filetypes=[("Excel files", "*.xlsx"), ("All files", "*.*")]
        )
        
        if not report_path:
            return
            
        self.process_running = True
        self.generate_report_btn.config(state=tk.DISABLED)
        self.progress.start(10)
        self.set_status("Generating report file... Please wait", self.accent_color)
        
        # Start processing in a separate thread
        thread = threading.Thread(target=lambda: self.do_generate_report(report_path))
        thread.daemon = True
        thread.start()
    
    def do_generate_report(self, report_path):
        """Generate the report in a separate thread"""
        try:
            print("\n" + "-" * 50)
            print(f"Generating report to: {report_path}")
            
            # Use the already extracted data to generate the report without reprocessing PDFs
            directory = os.path.dirname(self.original_file.get())
            
            # Check if we've already processed this data by reading the original Excel file
            try:
                # Read the original Excel file that was already processed
                basic_df = pd.read_excel(self.original_file.get(), sheet_name='Basic Info')
                manufacturer_df = pd.read_excel(self.original_file.get(), sheet_name='Manufacturer Stats')
                
                # Generate just the report format using the existing data
                print(f"Using existing data from: {self.original_file.get()}")
                print(f"Generating report file without reprocessing PDFs...")
                
                # Generate the report Excel file (just the formatted output, not processing PDFs again)
                _, _, _, generated_report_path = pdf_ex.generate_report_from_data(
                    basic_df, 
                    manufacturer_df, 
                    report_path
                )
                
                if generated_report_path:
                    self.report_file.set(generated_report_path)
                    self.root.after(0, lambda: self.open_report_btn.config(state=tk.NORMAL))
                    self.root.after(0, lambda: self.set_status(f"Report generated successfully! {os.path.basename(generated_report_path)}", self.success_color))
                else:
                    self.root.after(0, lambda: self.set_status("Failed to generate report", self.error_color))
                
            except Exception as excel_error:
                print(f"Error reading original Excel: {str(excel_error)}")
                print("Falling back to regenerating from directory...")
                
                # Fall back to original method if we can't read the Excel file
                _, _, _, report_path = pdf_ex.process_all_pdfs_for_gui(directory, self.original_file.get(), report_path)
                
                if report_path:
                    self.report_file.set(report_path)
                    self.root.after(0, lambda: self.open_report_btn.config(state=tk.NORMAL))
                    self.root.after(0, lambda: self.set_status(f"Report generated successfully! {os.path.basename(report_path)}", self.success_color))
                else:
                    self.root.after(0, lambda: self.set_status("Failed to generate report", self.error_color))
            
        except Exception as e:
            print(f"Error generating report: {str(e)}")
            self.root.after(0, lambda: self.set_status(f"Error: {str(e)}", self.error_color))
            import traceback
            traceback.print_exc()
        finally:
            self.process_running = False
            self.root.after(0, self.progress.stop)
            self.root.after(0, lambda: self.generate_report_btn.config(state=tk.NORMAL))
    
    def open_original_file(self):
        """Open the original Excel file"""
        if not self.original_file.get():
            messagebox.showerror("Error", "No original file available.")
            return
            
        try:
            os.startfile(self.original_file.get())
            self.set_status(f"Opened file: {os.path.basename(self.original_file.get())}")
        except Exception as e:
            messagebox.showerror("Error", f"Could not open file: {str(e)}")
    
    def open_report_file(self):
        """Open the report Excel file"""
        if not self.report_file.get():
            messagebox.showerror("Error", "No report file available.")
            return
            
        try:
            os.startfile(self.report_file.get())
            self.set_status(f"Opened file: {os.path.basename(self.report_file.get())}")
        except Exception as open_error:
            messagebox.showerror("Error", f"Could not open file: {str(open_error)}")
            

if __name__ == "__main__":
    root = tk.Tk()
    app = PDFExtractorApp(root)
    
    # Display startup message
    print("PDF Data Extractor")
    print("TNBT - The New Big Technology")
    print("Developed by Rishav Raj")
    print("-" * 50)
    print("Ready to process PDF files.")
    print("Select a directory containing PDF files and click 'Process PDF Files'.")
    
    root.mainloop()
    
    # Restore stdout when closing
    sys.stdout = sys.__stdout__ 