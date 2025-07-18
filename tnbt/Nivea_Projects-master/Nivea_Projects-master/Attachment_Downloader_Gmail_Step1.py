import imaplib
import email
import sys
import chardet
import time
import os
import pickle
import zipfile
import hashlib
from datetime import datetime
from email.header import decode_header
from bs4 import BeautifulSoup
import requests


class MailBox:
    SMTP_SERVER = 'imap.gmail.com'
    SMTP_PORT = 993
    USER = '*********'     # Replace with your email
    PASSWORD = '*********'  # Replace with your password
    PROCESSED_IDS_FILE = 'processed_emails.pickle'
    DOWNLOADED_FILES_FILE = 'downloaded_files.pickle'  # New file to track downloaded attachments

    def __init__(self):
        try:
            self.imap = imaplib.IMAP4_SSL(host=self.SMTP_SERVER, port=self.SMTP_PORT)
            self.imap.login(self.USER, self.PASSWORD)
            print("Successfully logged in")
            
            # Create main downloads directory
            self.download_dir = "downloads"
            if not os.path.exists(self.download_dir):
                os.makedirs(self.download_dir)
            
            # Create separate folders for Delhivery and BlueDart
            self.delhivery_dir = os.path.join(self.download_dir, "delhivery")
            self.bluedart_dir = os.path.join(self.download_dir, "bluedart")
            
            for directory in [self.delhivery_dir, self.bluedart_dir]:
                if not os.path.exists(directory):
                    os.makedirs(directory)
            
            # Load processed email IDs and downloaded files
            self.processed_ids = self._load_processed_ids()
            self.downloaded_files = self._load_downloaded_files()
            print(f"Loaded {len(self.processed_ids)} previously processed email IDs")
            print(f"Loaded {len(self.downloaded_files)} previously downloaded files")
                
            # Select the Automation folder
            self.select_folder("Automation")
            
        except imaplib.IMAP4.error as e:
            print(f"Login failed: {e}")
            sys.exit(1)

    def _load_processed_ids(self):
        """Load the set of processed email IDs"""
        try:
            with open(self.PROCESSED_IDS_FILE, 'rb') as f:
                return pickle.load(f)
        except (FileNotFoundError, EOFError):
            return set()  # Return empty set if file doesn't exist

    def _save_processed_ids(self):
        """Save processed email IDs to pickle file"""
        with open(self.PROCESSED_IDS_FILE, 'wb') as f:
            pickle.dump(self.processed_ids, f)
        print(f"Saved {len(self.processed_ids)} processed email IDs")

    def _load_downloaded_files(self):
        """Load the dictionary of downloaded files and their hashes"""
        try:
            with open(self.DOWNLOADED_FILES_FILE, 'rb') as f:
                return pickle.load(f)
        except (FileNotFoundError, EOFError):
            return {}  # Return empty dict if file doesn't exist

    def _save_downloaded_files(self):
        """Save downloaded files dictionary to pickle file"""
        with open(self.DOWNLOADED_FILES_FILE, 'wb') as f:
            pickle.dump(self.downloaded_files, f)
        print(f"Saved {len(self.downloaded_files)} downloaded file records")

    def _calculate_file_hash(self, content):
        """Calculate SHA-256 hash of file content"""
        return hashlib.sha256(content).hexdigest()

    def _handle_duplicate_file(self, directory, filename, content):
        """
        Handle potential duplicate files intelligently.
        Returns (final_filename, is_duplicate) where is_duplicate indicates if the exact file already exists.
        """
        base_name, ext = os.path.splitext(filename)
        
        # First check if file with exact name exists
        existing_path = os.path.join(directory, filename)
        if os.path.exists(existing_path):
            # If file exists, check if content matches
            with open(existing_path, 'rb') as f:
                existing_content = f.read()
                existing_hash = self._calculate_file_hash(existing_content)
                new_hash = self._calculate_file_hash(content)
                
                if existing_hash == new_hash:
                    # Exact same file, no need to save
                    return filename, True
        
        # At this point, either file doesn't exist, or content is different
        # Generate unique filename if needed
        final_name = filename
        counter = 1
        while os.path.exists(os.path.join(directory, final_name)):
            final_name = f"{base_name}_{counter}{ext}"
            counter += 1
            
        return final_name, False

    def select_folder(self, folder_name):
        try:
            self.imap.select(folder_name)
            print(f"Selected folder: {folder_name}")
        except imaplib.IMAP4.error as e:
            print(f"Error selecting folder {folder_name}: {e}")
            sys.exit(1)

    def __enter__(self):
        self.emails = self._get_all_messages()
        return self

    def __exit__(self, exc_type, exc_value, exc_traceback):
        self.imap.close()
        self.imap.logout()

    def _get_all_messages(self):
        _, messages = self.imap.search(None, 'ALL')
        all_ids = messages[0].split()
        # Filter out already processed IDs
        new_ids = [id for id in all_ids if id not in self.processed_ids]
        print(f"Found {len(new_ids)} new emails to process")
        return new_ids

    def fetch_message(self, num):
        # If num is bytes (email_id), use it directly
        if isinstance(num, bytes):
            email_id = num
        # If num is an integer index, get the email_id from self.emails
        else:
            email_id = self.emails[num]
            
        _, data = self.imap.fetch(email_id, '(RFC822)')
        _, bytes_data = data[0]
        email_message = email.message_from_bytes(bytes_data)
        return email_message

    def download_attachments(self, email_message):
        for part in email_message.walk():
            if part.get_content_maintype() == 'multipart':
                continue
            if part.get('Content-Disposition') is None:
                continue

            filename = part.get_filename()
            if filename:
                # Decode filename if needed
                if decode_header(filename)[0][1] is not None:
                    filename = decode_header(filename)[0][0].decode(decode_header(filename)[0][1])
                
                # Get the attachment content
                content = part.get_payload(decode=True)
                content_hash = self._calculate_file_hash(content)
                
                # Check if we've already downloaded this exact content somewhere
                if content_hash in self.downloaded_files:
                    print(f"Skipping duplicate attachment: {filename} (identical content exists as {self.downloaded_files[content_hash]})")
                    continue
                
                # Handle potential filename conflicts
                final_filename, is_duplicate = self._handle_duplicate_file(self.bluedart_dir, filename, content)
                if is_duplicate:
                    print(f"Skipping duplicate attachment: {filename} (identical file already exists)")
                    continue
                
                # Save BlueDart attachments in BlueDart folder
                filepath = os.path.join(self.bluedart_dir, final_filename)
                
                # Save the attachment
                with open(filepath, 'wb') as f:
                    f.write(content)
                print(f"Downloaded BlueDart attachment: {final_filename}")
                
                # Record the downloaded file
                self.downloaded_files[content_hash] = final_filename
                
                # Check if it's a ZIP file
                if final_filename.lower().endswith('.zip'):
                    try:
                        # Extract ZIP contents with handling for duplicate filenames
                        with zipfile.ZipFile(filepath, 'r') as zip_ref:
                            for zipped_file in zip_ref.namelist():
                                # Get the base filename
                                base_name = os.path.basename(zipped_file)
                                if not base_name:  # Skip if it's a directory
                                    continue
                                    
                                # Read the zipped file content
                                with zip_ref.open(zipped_file) as source:
                                    zipped_content = source.read()
                                    zipped_hash = self._calculate_file_hash(zipped_content)
                                    
                                    # Skip if we've already downloaded this exact content
                                    if zipped_hash in self.downloaded_files:
                                        print(f"Skipping duplicate file from ZIP: {base_name} (identical content exists as {self.downloaded_files[zipped_hash]})")
                                        continue
                                    
                                    # Handle potential filename conflicts
                                    final_name, is_duplicate = self._handle_duplicate_file(self.bluedart_dir, base_name, zipped_content)
                                    if is_duplicate:
                                        print(f"Skipping duplicate file from ZIP: {base_name} (identical file already exists)")
                                        continue
                                    
                                    # Extract with the unique filename
                                    with open(os.path.join(self.bluedart_dir, final_name), 'wb') as target:
                                        target.write(zipped_content)
                                    print(f"Extracted from ZIP: {final_name}")
                                    
                                    # Record the extracted file
                                    self.downloaded_files[zipped_hash] = final_name
                        
                        print(f"Extracted all contents from: {final_filename}")
                        # Remove ZIP file after extraction
                        os.remove(filepath)
                        # Remove ZIP file hash from downloaded files since we deleted it
                        self.downloaded_files.pop(content_hash, None)
                        print(f"Removed ZIP file after extraction")
                        
                    except zipfile.BadZipFile:
                        print(f"Warning: {final_filename} is not a valid ZIP file")

    def process_email_body(self, email_message):
        # Get email body
        if email_message.is_multipart():
            for part in email_message.walk():
                if part.get_content_type() == "text/html":
                    try:
                        # Try default decoding
                        body = part.get_payload(decode=True).decode()
                    except UnicodeDecodeError:
                        try:
                            # Try to detect encoding using chardet
                            raw_body = part.get_payload(decode=True)
                            detected = chardet.detect(raw_body)
                            body = raw_body.decode(detected['encoding'] or 'utf-8', errors='replace')
                        except Exception:
                            # If all else fails, use 'replace' error handler
                            body = raw_body.decode('utf-8', errors='replace')
                    break
        else:
            try:
                # Try default decoding
                body = email_message.get_payload(decode=True).decode()
            except UnicodeDecodeError:
                try:
                    # Try to detect encoding using chardet
                    raw_body = email_message.get_payload(decode=True)
                    detected = chardet.detect(raw_body)
                    body = raw_body.decode(detected['encoding'] or 'utf-8', errors='replace')
                except Exception:
                    # If all else fails, use 'replace' error handler
                    body = raw_body.decode('utf-8', errors='replace')

        # Parse HTML and look for Download Invoice/Invoices button/link
        soup = BeautifulSoup(body, 'html.parser')
        
        # Find links containing text variations of "Download Invoice(s)"
        download_links = soup.find_all('a', string=lambda text: text and any(phrase in text.lower() for phrase in ['download invoice', 'download invoices']))
        
        # If no direct matches found, try finding links within table cells (td elements)
        if not download_links:
            table_cells = soup.find_all('td', bgcolor="#ED2939")
            for cell in table_cells:
                link = cell.find('a')
                if link and any(phrase in link.text.lower() for phrase in ['download invoice', 'download invoices']):
                    download_links.append(link)
        
        for link in download_links:
            href = link.get('href')
            if href and 'delhivery' in href.lower():  # Check if it's a Delhivery link
                try:
                    print(f"Found Delhivery download link: {href}")
                    response = requests.get(href)
                    if response.status_code == 200:
                        # Calculate hash of downloaded content
                        content = response.content
                        content_hash = self._calculate_file_hash(content)
                        
                        # Check if we've already downloaded this exact content somewhere
                        if content_hash in self.downloaded_files:
                            print(f"Skipping duplicate Delhivery file (identical content exists as {self.downloaded_files[content_hash]})")
                            continue
                        
                        # Extract filename from Content-Disposition header or use default
                        content_disposition = response.headers.get('content-disposition')
                        if content_disposition:
                            filename = content_disposition.split('filename=')[-1].strip('"')
                        else:
                            url_filename = href.split('/')[-1]
                            filename = f"delhivery_invoice_{url_filename}_{time.strftime('%Y%m%d_%H%M%S')}"
                        
                        # Check content type to determine if it's a ZIP file
                        content_type = response.headers.get('content-type', '').lower()
                        is_zip = 'zip' in content_type or content[:4] == b'PK\x03\x04'
                        
                        if is_zip:
                            # Handle potential filename conflicts for ZIP
                            if not filename.lower().endswith('.zip'):
                                filename += '.zip'
                            
                            final_filename, is_duplicate = self._handle_duplicate_file(self.delhivery_dir, filename, content)
                            if is_duplicate:
                                print(f"Skipping duplicate ZIP file: {filename} (identical file already exists)")
                                continue
                            
                            zip_path = os.path.join(self.delhivery_dir, final_filename)
                            with open(zip_path, 'wb') as f:
                                f.write(content)
                            print(f"Downloaded Delhivery ZIP file: {final_filename}")
                            
                            # Extract ZIP contents
                            try:
                                with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                                    for zipped_file in zip_ref.namelist():
                                        base_name = os.path.basename(zipped_file)
                                        if not base_name:  # Skip if it's a directory
                                            continue
                                        
                                        # Read the zipped file content
                                        with zip_ref.open(zipped_file) as source:
                                            zipped_content = source.read()
                                            zipped_hash = self._calculate_file_hash(zipped_content)
                                            
                                            # Skip if we've already downloaded this exact content
                                            if zipped_hash in self.downloaded_files:
                                                print(f"Skipping duplicate file from ZIP: {base_name} (identical content exists as {self.downloaded_files[zipped_hash]})")
                                                continue
                                            
                                            # Handle potential filename conflicts
                                            final_name, is_duplicate = self._handle_duplicate_file(self.delhivery_dir, base_name, zipped_content)
                                            if is_duplicate:
                                                print(f"Skipping duplicate file from ZIP: {base_name} (identical file already exists)")
                                                continue
                                            
                                            # Extract with the unique filename
                                            with open(os.path.join(self.delhivery_dir, final_name), 'wb') as target:
                                                target.write(zipped_content)
                                            print(f"Extracted from ZIP: {final_name}")
                                            
                                            # Record the extracted file
                                            self.downloaded_files[zipped_hash] = final_name
                                
                                print(f"Extracted all contents from: {final_filename}")
                                # Remove ZIP file after extraction
                                os.remove(zip_path)
                                print(f"Removed ZIP file after extraction")
                            except zipfile.BadZipFile:
                                print(f"Warning: Downloaded file is not a valid ZIP file")
                                # Save as regular file if ZIP extraction fails
                                final_name, is_duplicate = self._handle_duplicate_file(self.delhivery_dir, filename, content)
                                if is_duplicate:
                                    print(f"Skipping duplicate file: {filename} (identical file already exists)")
                                    continue
                                
                                with open(os.path.join(self.delhivery_dir, final_name), 'wb') as f:
                                    f.write(content)
                                self.downloaded_files[content_hash] = final_name
                        else:
                            # Handle non-ZIP files
                            if not os.path.splitext(filename)[1]:  # If no extension
                                filename += '.pdf'  # Default to PDF
                            
                            # Handle potential filename conflicts
                            final_name, is_duplicate = self._handle_duplicate_file(self.delhivery_dir, filename, content)
                            if is_duplicate:
                                print(f"Skipping duplicate file: {filename} (identical file already exists)")
                                continue
                            
                            filepath = os.path.join(self.delhivery_dir, final_name)
                            with open(filepath, 'wb') as f:
                                f.write(content)
                            print(f"Successfully downloaded Delhivery file: {final_name}")
                            
                            # Record the downloaded file
                            self.downloaded_files[content_hash] = final_name
                            
                except Exception as e:
                    print(f"Error downloading from {href}: {e}")

    def process_all_emails(self):
        """Process all unread emails in the selected folder."""
        # Get all messages
        self.emails = self._get_all_messages()
        
        if not self.emails:
            print("No new emails to process")
            return

        for email_id in self.emails:
            try:
                email_message = self.fetch_message(email_id)
                print(f"\nProcessing email: {email_message['subject']}")
                
                # Download attachments
                self.download_attachments(email_message)
                
                # Process email body for Download Invoice button
                self.process_email_body(email_message)
                
                # Mark this email as processed
                self.processed_ids.add(email_id)
                
            except Exception as e:
                print(f"Error processing email {email_id}: {e}")


if __name__ == "__main__":
    try:
        # Create mailbox instance
        mailbox = MailBox()
        
        # Process emails and download attachments
        mailbox.process_all_emails()
        
        # Save processed email IDs and downloaded files before exiting
        mailbox._save_processed_ids()
        mailbox._save_downloaded_files()
        
        print("Script completed successfully")
        
    except Exception as e:
        print(f"An error occurred while running the script: {e}")
        sys.exit(1)

