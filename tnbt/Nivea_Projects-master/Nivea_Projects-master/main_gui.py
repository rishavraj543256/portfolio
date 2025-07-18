import tkinter as tk
from tkinter import ttk, messagebox
import threading
import os
import sys
import shutil
from Attachment_Downloader_Gmail_Step1 import MailBox
from Excel_Consolidation import main as consolidation_main
from Excel_Data_Transfer import main as data_transfer_main
import time
import random
import math

class ResourcePath:
    """Handle resource paths for PyInstaller"""
    @staticmethod
    def get_resource_path(relative_path):
        """Get absolute path to resource for PyInstaller"""
        try:
            # PyInstaller creates a temp folder and stores path in _MEIPASS
            base_path = sys._MEIPASS
        except Exception:
            base_path = os.path.abspath(".")
        
        return os.path.join(base_path, relative_path)

class ModernButton(ttk.Button):
    """Custom styled button class with hover effect and modern design"""
    def __init__(self, master, **kwargs):
        super().__init__(master, **kwargs)
        self.style = ttk.Style()
        self.style_name = f"Modern{random.randint(1000, 9999)}.TButton"  # Unique style name
        
        # Color palette
        self.colors = {
            'primary': '#1976D2',
            'primary_light': '#42A5F5',
            'primary_dark': '#0D47A1',
            'hover': '#01579B',
            'active': '#0288D1',
            'fg': '#FFFFFF',
            'fg_hover': '#E1F5FE'
        }
        
        # Extract icon if provided
        self.icon = kwargs.get('icon', '')
        
        # Normal button style
        self.style.configure(self.style_name,
                           font=('Segoe UI', 13, 'bold'),
                           padding=14,
                           width=42,
                           background=self.colors['primary'],
                           foreground=self.colors['fg'],
                           relief='flat',
                           borderwidth=0)
        
        # Hover button style
        self.style.map(self.style_name,
                      background=[('active', self.colors['hover']), ('pressed', self.colors['active'])],
                      foreground=[('active', self.colors['fg_hover'])],
                      relief=[('pressed', 'sunken')])
        
        self['style'] = self.style_name
        
        # Create canvas for enhanced visual effects
        self.canvas = tk.Canvas(master, height=50, highlightthickness=0, bg="#FFFFFF")
        
        # Bind hover events
        self.bind('<Enter>', self.on_enter)
        self.bind('<Leave>', self.on_leave)
        self.bind('<Button-1>', self.on_press)
        self.bind('<ButtonRelease-1>', self.on_release)
        
        # Animation variables
        self.hover_animation = None
        self.ripple_animation = None
        self.ripple_x = 0
        self.ripple_y = 0
        self.ripple_radius = 0
        self.hover_alpha = 0
        self.is_hovered = False

    def on_enter(self, e):
        self.state(['active'])
        self.is_hovered = True
        self.start_hover_animation(True)
        
    def on_leave(self, e):
        self.state(['!active'])
        self.is_hovered = False
        self.start_hover_animation(False)
        
    def on_press(self, e):
        self.ripple_x = e.x
        self.ripple_y = e.y
        self.start_ripple_animation()
        
    def on_release(self, e):
        pass
        
    def start_hover_animation(self, hovering_in):
        """Start smooth hover animation"""
        if self.hover_animation:
            self.after_cancel(self.hover_animation)
            
        target = 100 if hovering_in else 0
        step = 5 if hovering_in else -5
        
        def animate():
            self.hover_alpha += step
            if (step > 0 and self.hover_alpha >= target) or (step < 0 and self.hover_alpha <= target):
                self.hover_alpha = target
                return
                
            self.hover_animation = self.after(10, animate)
            
        animate()
        
    def start_ripple_animation(self):
        """Start ripple effect animation on click"""
        if self.ripple_animation:
            self.after_cancel(self.ripple_animation)
            
        self.ripple_radius = 0
        max_radius = int(math.sqrt(self.winfo_width()**2 + self.winfo_height()**2))
        
        def animate():
            self.ripple_radius += 10
            if self.ripple_radius >= max_radius:
                return
                
            self.ripple_animation = self.after(10, animate)
            
        animate()

class GradientFrame(tk.Canvas):
    """A frame with a gradient background"""
    def __init__(self, parent, color1="#41295a", color2="#2F0743", direction="horizontal", **kwargs):
        super().__init__(parent, **kwargs)
        self.color1 = color1
        self.color2 = color2
        self.direction = direction
        self.bind("<Configure>", self._draw_gradient)
        
    def _draw_gradient(self, event=None):
        """Draw the gradient background"""
        width = self.winfo_width()
        height = self.winfo_height()
        
        # Create gradient fill
        limit = width if self.direction == "horizontal" else height
        (r1, g1, b1) = self.winfo_rgb(self.color1)
        (r2, g2, b2) = self.winfo_rgb(self.color2)
        r_ratio = float(r2-r1) / limit
        g_ratio = float(g2-g1) / limit
        b_ratio = float(b2-b1) / limit
        
        # Draw gradient rectangle
        self.delete("gradient")
        if self.direction == "horizontal":
            for i in range(limit):
                nr = int(r1 + (r_ratio * i))
                ng = int(g1 + (g_ratio * i))
                nb = int(b1 + (b_ratio * i))
                color = "#%4.4x%4.4x%4.4x" % (nr, ng, nb)
                self.create_line(i, 0, i, height, tags=("gradient",), fill=color)
        else:
            for i in range(limit):
                nr = int(r1 + (r_ratio * i))
                ng = int(g1 + (g_ratio * i))
                nb = int(b1 + (b_ratio * i))
                color = "#%4.4x%4.4x%4.4x" % (nr, ng, nb)
                self.create_line(0, i, width, i, tags=("gradient",), fill=color)

class AnimatedLabel(ttk.Label):
    """Custom label with advanced color animation effects"""
    def __init__(self, master, **kwargs):
        # Define a rich color palette
        self.color_palettes = {
            'vibrant': ['#FF4081', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0', '#00BCD4'],
            'pastel': ['#FFD3E0', '#D1E8FF', '#C8E6C9', '#FFF9C4', '#E1BEE7', '#B2EBF2'],
            'neon': ['#FF00FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000', '#0000FF'],
            'elegant': ['#3F51B5', '#C2185B', '#00796B', '#FFA000', '#00BCD4', '#5E35B1'],
            'sunset': ['#FF9E80', '#FF6D00', '#FF3D00', '#DD2C00', '#880E4F', '#311B92']
        }
        
        # Choose a palette
        self.palette = kwargs.pop('palette', 'elegant')
        self.colors = self.color_palettes.get(self.palette, self.color_palettes['vibrant'])
        
        # Animation settings
        self.animation_speed = kwargs.pop('animation_speed', 2000)  # ms
        self.animation_type = kwargs.pop('animation_type', 'fade')  # fade, pulse, rainbow
        self.text_shadow = kwargs.pop('text_shadow', True)  # Add shadow effect
        
        # Initialize with default color
        self.current_color = 0
        kwargs['foreground'] = self.colors[self.current_color]
        
        # Create a font with optional bold
        font_family = kwargs.get('font', ('Segoe UI', 14))
        if isinstance(font_family, str):
            font_family = (font_family, 14)
        self.font_weight = kwargs.pop('font_weight', 'bold')
        
        if len(font_family) == 2:
            kwargs['font'] = (font_family[0], font_family[1], self.font_weight)
        
        # Initialize the label
        super().__init__(master, **kwargs)
        
        # Start animation
        self.animate()
        
    def animate(self):
        """Animate the label color based on the selected animation type"""
        if self.animation_type == 'fade':
            # Smooth color transition
            self.configure(foreground=self.colors[self.current_color])
            self.current_color = (self.current_color + 1) % len(self.colors)
        elif self.animation_type == 'pulse':
            # Pulse between two colors
            if self.current_color == 0:
                self.configure(foreground=self.colors[0])
                self.current_color = 1
            else:
                self.configure(foreground=self.colors[1])
                self.current_color = 0
        elif self.animation_type == 'rainbow':
            # Generate rainbow effect
            r, g, b = self._hsv_to_rgb(self.current_color / 100.0, 1.0, 1.0)
            color = f'#{r:02x}{g:02x}{b:02x}'
            self.configure(foreground=color)
            self.current_color = (self.current_color + 1) % 100
        
        # Schedule next animation
        self.after(self.animation_speed, self.animate)
    
    def _hsv_to_rgb(self, h, s, v):
        """Convert HSV color to RGB"""
        if s == 0.0:
            return (int(v * 255), int(v * 255), int(v * 255))
        
        i = int(h * 6)
        f = (h * 6) - i
        p = v * (1 - s)
        q = v * (1 - s * f)
        t = v * (1 - s * (1 - f))
        i %= 6
        
        if i == 0:
            return (int(v * 255), int(t * 255), int(p * 255))
        elif i == 1:
            return (int(q * 255), int(v * 255), int(p * 255))
        elif i == 2:
            return (int(p * 255), int(v * 255), int(t * 255))
        elif i == 3:
            return (int(p * 255), int(q * 255), int(v * 255))
        elif i == 4:
            return (int(t * 255), int(p * 255), int(v * 255))
        elif i == 5:
            return (int(v * 255), int(p * 255), int(q * 255))

class AutomationGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("TNBT Excel Automation Suite")
        self.root.geometry("980x850")  # Initial size, but it will be adjusted later
        
        # Set resizable to True only for width
        self.root.resizable(True, False)  # Allow horizontal resizing only
        
        # Configure root to expand
        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        self.root.configure(bg='#FFFFFF')
        
        # Set app theme colors
        self.theme = {
            'primary': '#1976D2',
            'secondary': '#FFC107',
            'accent': '#FF4081',
            'bg_light': '#F5F5F5',
            'bg_dark': '#263238',
            'text_light': '#FFFFFF',
            'text_dark': '#212121',
            'text_muted': '#757575',
            'gradient_start': '#1A237E',
            'gradient_end': '#0D47A1'
        }

        # Check if template file exists
        self.template_path = ResourcePath.get_resource_path("template/template_delhivery.xlsx")
        if not os.path.exists(self.template_path):
            # Try alternate path formats
            alt_paths = [
                os.path.join(os.path.dirname(os.path.abspath(__file__)), "template", "template_delhivery.xlsx"),
                "./template/template_delhivery.xlsx",
                "template/template_delhivery.xlsx"
            ]
            
            for path in alt_paths:
                if os.path.exists(path):
                    self.template_path = path
                    break
            else:
                messagebox.showerror("Error", "Template file not found! Looked in: " + self.template_path)
                self.root.destroy()
                return

        # Create gradient background
        self.bg_frame = GradientFrame(
            self.root, 
            color1="#1A237E", 
            color2="#0D47A1", 
            direction="vertical",
            highlightthickness=0
        )
        self.bg_frame.grid(row=0, column=0, sticky='nsew')
        
        # Create container frame with rounded corners effect
        self.container_frame = tk.Frame(
            self.bg_frame, 
            bg='#FFFFFF',
            bd=0,
            highlightthickness=0
        )
        self.container_frame.grid(row=0, column=0, padx=40, pady=20, sticky='nsew')  # Reduced from pady=30 to pady=20
        self.bg_frame.grid_rowconfigure(0, weight=1)
        self.bg_frame.grid_columnconfigure(0, weight=1)
        
        # Shadow effect for container
        self.container_frame.grid_rowconfigure(0, weight=1)
        self.container_frame.grid_columnconfigure(0, weight=1)
        
        # Top container for main content with padding
        self.content_frame = tk.Frame(self.container_frame, bg='#FFFFFF')
        self.content_frame.grid(row=0, column=0, padx=30, pady=15, sticky='nsew')  # Reduced from pady=20 to pady=15
        self.content_frame.grid_columnconfigure(0, weight=1)
        
        # TNBT Branding Frame
        self.branding_frame = tk.Frame(self.content_frame, bg='#FFFFFF')
        self.branding_frame.grid(row=0, column=0, pady=(0, 15), sticky='ew')
        self.branding_frame.grid_columnconfigure(0, weight=1)

        # Company Logo/Name with enhanced animation
        self.company_label = AnimatedLabel(
            self.branding_frame,
            text="TNBT",
            font=('Segoe UI', 50),
            animation_type='rainbow',
            animation_speed=100,
            palette='elegant',
            padding=(0, 0, 0, 5),
            background='#FFFFFF'
        )
        self.company_label.grid(row=0, column=0)

        # Company Full Name with stylish design
        self.company_full_label = ttk.Label(
            self.branding_frame,
            text="The Next Big Thing",
            font=('Segoe UI', 18, 'bold'),
            foreground=self.theme['text_muted'],
            background='#FFFFFF'
        )
        self.company_full_label.grid(row=1, column=0)

        # Developer information with enhanced design
        self.developer_frame = tk.Frame(self.branding_frame, bg='#FFFFFF')
        self.developer_frame.grid(row=2, column=0, pady=(10, 0))
        self.developer_frame.grid_columnconfigure(0, weight=1)

        self.developer_label = ttk.Label(
            self.developer_frame,
            text="Developed by",
            font=('Segoe UI', 11),
            foreground=self.theme['text_muted'],
            background='#FFFFFF'
        )
        self.developer_label.grid(row=0, column=0)

        self.developer_name = AnimatedLabel(
            self.developer_frame,
            text="Rishav Raj",
            font=('Segoe UI', 14, 'bold'),
            animation_type='fade',
            animation_speed=1500,
            palette='sunset',
            background='#FFFFFF'
        )
        self.developer_name.grid(row=1, column=0)

        # Decorative separator with gradient
        self.separator_canvas = tk.Canvas(
            self.content_frame, 
            height=3,  # Reduced from 4 to 3
            bg='#FFFFFF',
            highlightthickness=0
        )
        self.separator_canvas.grid(row=1, column=0, sticky='ew', pady=(10, 20))  # Reduced from (20, 30) to (10, 20)
        
        # Draw gradient separator
        self.separator_canvas.bind("<Configure>", self._draw_separator)
        
        # Title Section with enhanced design
        self.title_frame = tk.Frame(self.content_frame, bg='#FFFFFF')
        self.title_frame.grid(row=2, column=0, pady=5, sticky='ew')
        self.title_frame.grid_columnconfigure(0, weight=1)
        
        self.title_label = ttk.Label(
            self.title_frame,
            text="Excel Automation Suite",
            font=('Segoe UI', 26, 'bold'),
            foreground=self.theme['primary'],
            background='#FFFFFF'
        )
        self.title_label.grid(row=0, column=0)
        
        self.subtitle_label = ttk.Label(
            self.title_frame,
            text="Streamline Your Excel Workflows with Advanced Automation",
            font=('Segoe UI', 14),
            foreground=self.theme['text_muted'],
            background='#FFFFFF'
        )
        self.subtitle_label.grid(row=1, column=0, pady=(5, 0))

        # Feature description
        self.description_label = ttk.Label(
            self.title_frame,
            text="Powerful tools to automate Excel tasks and boost productivity",
            font=('Segoe UI', 12),
            foreground=self.theme['text_muted'],
            background='#FFFFFF',
            wraplength=800
        )
        self.description_label.grid(row=2, column=0, pady=(10, 0))

        # Main Action Buttons with enhanced design
        self.buttons_frame = tk.Frame(self.content_frame, bg='#FFFFFF')
        self.buttons_frame.grid(row=3, column=0, pady=10, sticky='ew')  # Reduced from pady=20 to pady=10
        self.buttons_frame.grid_columnconfigure(0, weight=1)

        # Style configuration for buttons
        button_style = ttk.Style()
        button_style.configure("ActionButton.TButton",
                             font=('Segoe UI', 12, 'bold'),
                             padding=10,
                             background='#1976D2',
                             foreground='#000000')  # Black text
        
        button_style.map("ActionButton.TButton",
                        background=[('active', '#01579B'), ('pressed', '#0288D1')],
                        foreground=[('active', '#000000')],  # Black text on hover
                        relief=[('pressed', 'sunken')])
        
        # Recreate all buttons with consistent styling
        self.download_button = ttk.Button(
            self.buttons_frame,
            text="📥  Download Gmail Attachments",
            command=self.run_attachment_downloader,
            style="ActionButton.TButton"
        )
        self.download_button.grid(row=0, column=0, pady=6, sticky='ew')  # Reduced from pady=8 to pady=6

        self.consolidate_button = ttk.Button(
            self.buttons_frame,
            text="📊  Consolidate Excel Files",
            command=self.run_consolidation,
            style="ActionButton.TButton"
        )
        self.consolidate_button.grid(row=1, column=0, pady=6, sticky='ew')  # Reduced from pady=8 to pady=6

        self.fill_dates_button = ttk.Button(
            self.buttons_frame,
            text="📅  Fill Invoice Dates",
            command=self.run_fill_invoice_dates,
            style="ActionButton.TButton"
        )
        self.fill_dates_button.grid(row=2, column=0, pady=6, sticky='ew')  # Reduced from pady=8 to pady=6

        self.transfer_button = ttk.Button(
            self.buttons_frame,
            text="🔄  Generate PDFs",
            command=self.run_data_transfer,
            style="ActionButton.TButton"
        )
        self.transfer_button.grid(row=3, column=0, pady=6, sticky='ew')  # Reduced from pady=8 to pady=6

        # Status Frame with enhanced visual design
        self.status_frame = tk.Frame(self.content_frame, bg='#FFFFFF')
        self.status_frame.grid(row=4, column=0, pady=5, sticky='ew')  # Further reduced padding
        self.status_frame.grid_columnconfigure(0, weight=1)

        # Simplified status label with horizontal separator above it
        separator = ttk.Separator(self.status_frame, orient='horizontal')
        separator.grid(row=0, column=0, sticky='ew', pady=(0, 5))

        # Small, simple status indicator
        self.status_label = ttk.Label(
            self.status_frame,
            text="Ready to Process",
            font=('Segoe UI', 10),  # Smaller font
            foreground=self.theme['primary'],
            background='#FFFFFF'
        )
        self.status_label.grid(row=1, column=0)

        # Progress Bar with enhanced styling - made more compact
        self.style = ttk.Style()
        self.style.configure("Modern.Horizontal.TProgressbar",
                          thickness=6,  # Reduced thickness
                          troughcolor='#E0E0E0',
                          background=self.theme['primary'])
        
        self.progress = ttk.Progressbar(
            self.status_frame,
            mode='indeterminate',
            style="Modern.Horizontal.TProgressbar"
        )
        self.progress.grid(row=2, column=0, pady=3, sticky='ew')  # Reduced padding

        # Output Frame with better text display
        self.output_frame = tk.Frame(self.status_frame, bg='#FFFFFF')
        self.output_frame.grid(row=3, column=0, pady=3, sticky='ew')  # Adjusted row and reduced padding
        self.output_frame.grid_columnconfigure(0, weight=1)
        
        self.output_label = ttk.Label(
            self.output_frame,
            text="",
            font=('Segoe UI', 11),
            foreground=self.theme['primary'],
            background='#FFFFFF',
            wraplength=800
        )
        self.output_label.grid(row=0, column=0)

        # Footer with copyright
        self.footer_frame = tk.Frame(self.container_frame, bg='#FFFFFF')
        self.footer_frame.grid(row=1, column=0, sticky='ew', padx=20, pady=(0, 10))  # Reduced padding
        self.footer_frame.grid_columnconfigure(0, weight=1)
        
        # Copyright info
        self.copyright_label = ttk.Label(
            self.footer_frame,
            text="© 2024 TNBT. All rights reserved.",
            font=('Segoe UI', 8),  # Reduced font size from 9 to 8
            foreground=self.theme['text_muted'],
            background='#FFFFFF'
        )
        self.copyright_label.grid(row=0, column=0)
        
    def _draw_separator(self, event=None):
        """Draw a gradient separator line"""
        width = self.separator_canvas.winfo_width()
        height = self.separator_canvas.winfo_height()
        
        # Clear previous drawing
        self.separator_canvas.delete("all")
        
        # Draw gradient line
        for i in range(width):
            # Calculate color based on position
            r = int(74 + (25 - 74) * i / width)
            g = int(118 + (118 - 118) * i / width)
            b = int(210 + (165 - 210) * i / width)
            color = f'#{r:02x}{g:02x}{b:02x}'
            
            # Draw line segment
            self.separator_canvas.create_line(
                i, height//2, i+1, height//2, 
                fill=color, 
                width=height
            )

    def update_status(self, message, color=None):
        """Update status label with message and color"""
        if color is None:
            color = self.theme['primary']  # Default to primary theme color
            
        self.status_label.configure(text=message, foreground=color)
        
        # Make sure the status area is visible
        self.status_frame.lift()  # Bring to front
        self.root.update()

    def update_output_path(self, message):
        """Update the output path label"""
        self.output_label.configure(text=message)
        self.root.update()

    def run_with_progress(self, func, success_message):
        """Run a function with progress bar animation"""
        try:
            self.progress.start()
            result = func()  # Capture any result returned by the function
            self.progress.stop()
            
            # Determine the success message
            final_message = success_message
            if callable(success_message) and result:
                final_message = success_message(result)
            
            self.update_status(final_message, self.theme['primary'])  # Changed from '#4CAF50' to primary theme color
            
            # If there's a file path in the result, display it
            if isinstance(result, str) and os.path.exists(result):
                self.update_output_path(f"📂 Output saved to:\n{result}")
            
            messagebox.showinfo("Success", final_message)
            return result
        except Exception as e:
            self.progress.stop()
            error_message = f"An error occurred: {str(e)}"
            self.update_status(error_message, '#F44336')  # Keep material design red for errors
            self.update_output_path("")  # Clear the output path
            messagebox.showerror("Error", error_message)
            return None

    def run_attachment_downloader(self):
        """Run the attachment downloader script"""
        def download_task():
            self.update_status("Downloading attachments from Gmail...", self.theme['primary'])  # Use theme color
            mailbox = MailBox()
            mailbox.process_all_emails()
            mailbox._save_processed_ids()
            mailbox._save_downloaded_files()
            
            # Return the downloads directory path
            downloads_dir = os.path.abspath("downloads")
            return downloads_dir if os.path.exists(downloads_dir) else None

        thread = threading.Thread(target=lambda: self.run_with_progress(
            download_task,
            "Attachments downloaded successfully!"
        ))
        thread.start()

    def run_consolidation(self):
        """Run the Excel consolidation script"""
        def consolidation_task():
            self.update_status("Consolidating Excel files...", self.theme['primary'])  # Use theme color
            
            # Create a wrapper function to capture the output path
            def wrapper():
                try:
                    # Get the current working directory
                    current_dir = os.getcwd()
                    
                    # Run the consolidation
                    consolidation_main()
                    
                    # Look for the most recently created consolidated file
                    consolidated_dir = os.path.join(current_dir, "consolidated")
                    if os.path.exists(consolidated_dir):
                        files = [f for f in os.listdir(consolidated_dir) 
                                if f.startswith("consolidated_data_") and f.endswith(".xlsx")]
                        if files:
                            # Sort by creation time and get the most recent
                            latest_file = max(files, key=lambda x: os.path.getctime(
                                os.path.join(consolidated_dir, x)))
                            return os.path.join(consolidated_dir, latest_file)
                    
                    return None
                except Exception as e:
                    raise Exception(f"Consolidation failed: {str(e)}")
            
            return wrapper()

        thread = threading.Thread(target=lambda: self.run_with_progress(
            consolidation_task,
            "Excel files consolidated successfully!"
        ))
        thread.start()

    def run_data_transfer(self):
        """Run the data transfer script"""
        def transfer_task():
            self.update_status("Transferring data...", self.theme['primary'])  # Use theme color
            try:
                # Import and run the main function from Excel_Data_Transfer
                from Excel_Data_Transfer import main as data_transfer_main
                result = data_transfer_main()
                
                if result:
                    # Get the PDF directory path
                    pdf_dir = os.path.join(os.path.dirname(result), "PDFs")
                    if os.path.exists(pdf_dir):
                        self.update_output_path(f"📂 Excel file saved to:\n{result}\n\n📂 PDFs saved to:\n{pdf_dir}")
                    else:
                        self.update_output_path(f"📂 Excel file saved to:\n{result}")
                    return result
                return None
            except Exception as e:
                raise Exception(f"Data transfer failed: {str(e)}")

        thread = threading.Thread(target=lambda: self.run_with_progress(
            transfer_task,
            "PDF Generated successfully!"
        ))
        thread.start()

    def run_fill_invoice_dates(self):
        """Run the function to fill invoice dates in an existing consolidated file"""
        def fill_dates_task():
            self.update_status("Filling invoice dates...", self.theme['primary'])  # Use theme color
            
            try:
                # Import the function from Excel_Consolidation
                from Excel_Consolidation import fill_invoice_dates
                from tkinter import filedialog
                
                # Ask user to select the consolidated file
                root = tk.Tk()
                root.withdraw()
                consolidated_file = filedialog.askopenfilename(
                    title="Select Consolidated Excel File",
                    filetypes=[("Excel files", "*.xlsx")]
                )
                
                if not consolidated_file:
                    self.update_status("Operation canceled", None)  # Use default color
                    return None
                
                # Call the function to fill invoice dates
                updated_count = fill_invoice_dates(consolidated_file)
                
                if updated_count > 0:
                    self.update_output_path(f"📂 Updated file saved to:\n{consolidated_file}\nUpdated {updated_count} invoice dates.")
                    return {"file": consolidated_file, "count": updated_count}
                else:
                    self.update_status("No updates were made", None)  # Use default color
                    return None
            except Exception as e:
                raise Exception(f"Failed to fill invoice dates: {str(e)}")

        thread = threading.Thread(target=lambda: self.run_with_progress(
            fill_dates_task,
            lambda result: f"Successfully updated {result['count']} invoice dates!" if result else "No updates were made"
        ))
        thread.start()

def main():
    root = tk.Tk()
    root.title("TNBT Excel Automation Suite")
    
    # Configure modern styles
    style = ttk.Style()
    style.configure('TFrame', background='#FFFFFF')
    style.configure('TLabel', background='#FFFFFF')
    style.configure('TButton', font=('Segoe UI', 12))
    
    # Create and run the application
    app = AutomationGUI(root)
    
    # Set window size and position
    window_width = 980
    window_height = 900  # Already increased height from 850 to 900
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    center_x = int(screen_width/2 - window_width/2)
    center_y = int(screen_height/2 - window_height/2)
    root.geometry(f'{window_width}x{window_height}+{center_x}+{center_y}')
    
    # Ensure minimum window size
    root.minsize(980, 750)  # Increased minimum height from 650 to 750
    
    # Force the window's size to prevent layout issues
    root.update_idletasks()  # Update layout
    
    # Start the main event loop
    root.mainloop()

if __name__ == "__main__":
    main() 