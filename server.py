#!/usr/bin/env python3
"""
Serveur simple pour le site Jean Chocolatier
"""

import http.server
import socketserver
import json
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

PORT = 3000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/order':
            self.handle_order()
        elif self.path == '/api/contact':
            self.handle_contact()
        else:
            self.send_error(404)
    
    def handle_order(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        try:
            # Créer le contenu de l'email
            cart_items = '\n'.join([
                f"- {item['name']} (x{item['quantity']}) : {(item['price'] * item['quantity']):.2f} €"
                for item in data['cart']
            ])
            
            email_content = f"""
Nouvelle commande reçue !

Client:
- Nom: {data['firstName']} {data['lastName']}
- Email: {data['email']}
- Adresse: {data['address']}

Commande:
{cart_items}

Total: {data['total']:.2f} €
            """
            
            # Envoyer l'email (si configuré)
            send_email(
                subject=f"Nouvelle commande de {data['firstName']} {data['lastName']}",
                body=email_content
            )
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True}).encode())
        except Exception as e:
            print(f"Erreur: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode())
    
    def handle_contact(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        try:
            email_content = f"""
Nouveau message de contact

De: {data['name']}
Email: {data['email']}
Sujet: {data['subject']}

Message:
{data['message']}
            """
            
            # Envoyer l'email (si configuré)
            send_email(
                subject=f"Message de contact: {data['subject']}",
                body=email_content,
                reply_to=data['email']
            )
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True}).encode())
        except Exception as e:
            print(f"Erreur: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode())
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def send_email(subject, body, reply_to=None):
    """Envoie un email via Gmail SMTP"""
    try:
        email_password = os.environ.get('EMAIL_PASSWORD')
        if not email_password:
            print("⚠️  EMAIL_PASSWORD non configuré. L'email ne sera pas envoyé.")
            print(f"📧 Email qui aurait été envoyé:\n{subject}\n\n{body}")
            return
        
        msg = MIMEMultipart()
        msg['From'] = 'jean.chocolatier.site@gmail.com'
        msg['To'] = 'jean.chocolatier.site@gmail.com'
        msg['Subject'] = subject
        if reply_to:
            msg['Reply-To'] = reply_to
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('jean.chocolatier.site@gmail.com', email_password)
        server.send_message(msg)
        server.quit()
        
        print(f"✅ Email envoyé: {subject}")
    except Exception as e:
        print(f"❌ Erreur lors de l'envoi de l'email: {e}")
        print(f"📧 Contenu qui aurait été envoyé:\n{subject}\n\n{body}")

if __name__ == "__main__":
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n🚀 Serveur démarré sur http://localhost:{PORT}")
        print(f"\n📧 Pour recevoir les emails, configurez le mot de passe d'application Gmail:")
        print(f"   - Allez dans votre compte Google > Sécurité")
        print(f"   - Activez la validation en 2 étapes")
        print(f"   - Créez un mot de passe d'application")
        print(f"   - Définissez: export EMAIL_PASSWORD=votre_mot_de_passe")
        print(f"\n💡 Sans configuration email, les messages s'afficheront dans la console.\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Serveur arrêté")

