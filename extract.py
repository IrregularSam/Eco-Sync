import pypdf

reader = pypdf.PdfReader('Eco-Sync_Final_PRD_Clean_Logo.pdf')
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

with open('prd.txt', 'w', encoding='utf-8') as f:
    f.write(text)
