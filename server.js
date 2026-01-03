const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname), {
    maxAge: '1d', // Cache pour 1 jour
    etag: true
}));

// Configuration de l'email
let transporter = null;
const emailPassword = process.env.EMAIL_PASSWORD;

if (emailPassword && emailPassword !== 'VOTRE_MOT_DE_PASSE_APP') {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jean.chocolatier.site@gmail.com',
            pass: emailPassword
        }
    });
    console.log('✅ Configuration email activée');
} else {
    console.log('⚠️  EMAIL_PASSWORD non configuré - Les emails ne seront pas envoyés');
}

// Route pour servir la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour servir la page de contact
app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Health check endpoint pour Render
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        service: 'jean-chocolatier',
        timestamp: new Date().toISOString()
    });
});

// Route pour gérer les commandes
app.post('/api/order', async (req, res) => {
    try {
        const { firstName, lastName, email, address, cart, total } = req.body;

        // Validation des données
        if (!firstName || !lastName || !email || !address || !cart || cart.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Données de commande incomplètes' 
            });
        }

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

        // Envoyer l'email si configuré
        if (transporter) {
            try {
                const mailOptions = {
                    from: 'jean.chocolatier.site@gmail.com',
                    to: 'jean.chocolatier.site@gmail.com',
                    subject: `Nouvelle commande de ${firstName} ${lastName}`,
                    text: emailContent
                };
                await transporter.sendMail(mailOptions);
                console.log('✅ Email de commande envoyé');
            } catch (emailError) {
                console.error('⚠️  Erreur lors de l\'envoi de l\'email:', emailError);
                // On continue quand même, la commande est enregistrée
            }
        } else {
            console.log('📧 Commande reçue (email non configuré):', emailContent);
        }

        res.json({ success: true, message: 'Commande enregistrée avec succès' });
    } catch (error) {
        console.error('Erreur lors du traitement de la commande:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de l\'enregistrement de la commande' 
        });
    }
});

// Route pour gérer les messages de contact
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation des données
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Tous les champs sont requis' 
            });
        }

        const emailContent = `
Nouveau message de contact

De: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}
        `;

        // Envoyer l'email si configuré
        if (transporter) {
            try {
                const mailOptions = {
                    from: 'jean.chocolatier.site@gmail.com',
                    to: 'jean.chocolatier.site@gmail.com',
                    subject: `Message de contact: ${subject}`,
                    text: emailContent,
                    replyTo: email
                };
                await transporter.sendMail(mailOptions);
                console.log('✅ Email de contact envoyé');
            } catch (emailError) {
                console.error('⚠️  Erreur lors de l\'envoi de l\'email:', emailError);
                // On continue quand même, le message est traité
            }
        } else {
            console.log('📧 Message de contact reçu (email non configuré):', emailContent);
        }

        res.json({ success: true, message: 'Message envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors du traitement du message:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de l\'envoi du message' 
        });
    }
});

// Gestion des erreurs 404 (doit être après toutes les routes)
app.use((req, res) => {
    // Pour les routes non-API, servir index.html (pour le routing côté client)
    if (!req.path.startsWith('/api') && !req.path.startsWith('/health')) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        res.status(404).json({ 
            success: false, 
            message: 'Route non trouvée' 
        });
    }
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (error) => {
    console.error('Erreur non gérée:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Exception non capturée:', error);
    process.exit(1);
});

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`🌐 Environnement: ${process.env.NODE_ENV || 'development'}`);
    
    if (!transporter) {
        console.log(`\n📧 EMAIL_PASSWORD non configuré - Les emails ne seront pas envoyés`);
        console.log(`   Pour activer les emails, configurez EMAIL_PASSWORD dans Render`);
    } else {
        console.log(`\n✅ Configuration email activée`);
    }
    
    console.log(`\n✅ Serveur prêt à recevoir des requêtes\n`);
});

