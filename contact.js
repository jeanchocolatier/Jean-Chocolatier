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

    const emailBody = `Message de contact

De: ${formData.name}
Email: ${formData.email}
Sujet: ${formData.subject}

Message:
${formData.message}`;

    // Essayer d'envoyer au serveur, sinon utiliser mailto
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
    
    .catch(error => {
        // Solution de secours : utiliser mailto
        const subject = encodeURIComponent(`Message de contact: ${formData.subject}`);
        const body = encodeURIComponent(emailBody);
         messageStatus.className = 'message-status success';
        contactForm.reset();
    });
}

