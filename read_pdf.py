import sys
import os
from PyPDF2 import PdfReader

def read_pdf(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f'Error reading PDF: {str(e)}')
        return None

def main():
    pdf_path = os.path.join('assets', 'CV_梁镇.pdf')
    if not os.path.exists(pdf_path):
        print(f'PDF file not found: {pdf_path}')
        return
    
    content = read_pdf(pdf_path)
    if content:
        print(content)

if __name__ == '__main__':
    main()