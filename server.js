const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Configuration de l'email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jean.chocolatier.site@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'VOTRE_MOT_DE_PASSE_APP' // À configurer avec un mot de passe d'application Gmail
    }
});

// Route pour servir la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour servir la page de contact
app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Route pour gérer les commandes
app.post('/api/order', async (req, res) => {
    try {
        const { firstName, lastName, email, address, cart, total } = req.body;

        // Créer le contenu de l'email pour la commande
        const cartItems = cart.map(item => 
            `- ${item.name} (x${item.quantity}) : ${(item.price * item.quantity).toFixed(2)} €`
        ).join('\n');

        const emailContent = `
Nouvelle commande reçue !

Client:
- Nom: ${firstName} ${lastName}
- Email: ${email}
- Adresse: ${address}

Commande:
${cartItems}

Total: ${total.toFixed(2)} €
        `;

        // Envoyer l'email
        const mailOptions = {
            from: 'jean.chocolatier.site@gmail.com',
            to: 'jean.chocolatier.site@gmail.com',
            subject: `Nouvelle commande de ${firstName} ${lastName}`,
            text: emailContent
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Commande enregistrée avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la commande:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement de la commande' });
    }
});

// Route pour gérer les messages de contact
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const emailContent = `
Nouveau message de contact

De: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}
        `;

        const mailOptions = {
            from: 'jean.chocolatier.site@gmail.com',
            to: 'jean.chocolatier.site@gmail.com',
            subject: `Message de contact: ${subject}`,
            text: emailContent,
            replyTo: email
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Message envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi du message' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`\n📧 Pour recevoir les emails, configurez le mot de passe d'application Gmail:`);
    console.log(`   - Allez dans votre compte Google > Sécurité`);
    console.log(`   - Activez la validation en 2 étapes`);
    console.log(`   - Créez un mot de passe d'application`);
    console.log(`   - Définissez la variable d'environnement: export EMAIL_PASSWORD=votre_mot_de_passe\n`);
});

