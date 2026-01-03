// Charger le compteur du panier
document.addEventListener('DOMContentLoaded', () => {
    loadCartCount();
});

function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Gérer le formulaire de contact
const contactForm = document.getElementById('contactForm');
const messageStatus = document.getElementById('contactMessageStatus');

if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };

    // Désactiver le bouton pendant l'envoi
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';
    messageStatus.textContent = '';
    messageStatus.className = '';

    // Préparer les paramètres pour EmailJS
    const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'chezcapucineetjean.2022@gmail.com'
    };

    // Sauvegarder le message dans localStorage pour la page de contrôle
    const contactData = {
        date: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
    };
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push(contactData);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Envoyer via EmailJS
    emailjs.send('service_contact', 'template_contact', emailParams)
        .then(function(response) {
            console.log('EmailJS SUCCESS!', response.status, response.text);
            messageStatus.textContent = 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
            messageStatus.className = 'message-status success';
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }, function(error) {
            console.error('EmailJS FAILED...', error);
            // Essayer d'envoyer au serveur en secours
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Serveur non disponible');
            })
            .then(data => {
                if (data.success) {
                    messageStatus.textContent = 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
                    messageStatus.className = 'message-status success';
                    contactForm.reset();
                } else {
                    throw new Error('Erreur serveur');
                }
            })
            .catch(error => {
                // Solution de secours finale : utiliser mailto
                const emailBody = `Message de contact\n\nDe: ${formData.name}\nEmail: ${formData.email}\nSujet: ${formData.subject}\n\nMessage:\n${formData.message}`;
                const subject = encodeURIComponent(`Message de contact: ${formData.subject}`);
                const body = encodeURIComponent(emailBody);
                window.location.href = `mailto:chezcapucineetjean.2022@gmail.com?subject=${subject}&body=${body}`;
                
                messageStatus.textContent = 'Votre client de messagerie va s\'ouvrir pour envoyer le message.';
                messageStatus.className = 'message-status success';
                contactForm.reset();
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
}

