import os
import re

gmail_url = 'https://mail.google.com/mail/?view=cm&fs=1&to=sprojectxx@gmail.com&su=Free%20Website%20Request%20for%20My%20Cafe&body=Hi%20Sprojectxx!%0A%0AI%20am%20interested%20in%20getting%20a%20free%20website%20for%20my%20cafe%2Frestaurant.%0A%0AHere%20are%20my%20details%3A%0A%0ACafe%2FRestaurant%20Name%3A%20%0ALocation%3A%20%0AStyle%20%2F%20Vibe%3A%20%0AAnything%20else%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!'

directory = r'c:\Users\steva\OneDrive\Desktop\Sprojectx'

for filename in os.listdir(directory):
    if filename.endswith('.html') and filename != 'contact.html':
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix the footer-contact-item mailto:
        content = re.sub(
            r'href="mailto:hello@sprojectxx\.com"([^>]*class="footer-contact-item")',
            f'href="{gmail_url}" target="_blank" rel="noopener"\\1',
            content
        )

        # Fix the social-btn # email link
        content = re.sub(
            r'href="#"([^>]*class="social-btn"[^>]*aria-label="Email")',
            f'href="{gmail_url}" target="_blank" rel="noopener"\\1',
            content
        )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
print('Done!')
