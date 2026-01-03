// Gestion de la connexion
const ADMIN_EMAIL = 'jean.chocolatier.site@gmail.com';
const ADMIN_PASSWORD = 'Je=13716';

// Vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Charger le compteur du panier
document.addEventListener('DOMContentLoaded', () => {
    loadCartCount();
    checkLoginStatus();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function checkLoginStatus() {
    if (isLoggedIn()) {
        // Rediriger vers la page de contrôle si déjà connecté
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'controle.html';
        }
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const messageStatus = document.getElementById('loginMessageStatus');
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        messageStatus.textContent = 'Connexion réussie ! Redirection...';
        messageStatus.className = 'message-status success';
        
        setTimeout(() => {
            window.location.href = 'controle.html';
        }, 1000);
    } else {
        messageStatus.textContent = 'Email ou mot de passe incorrect.';
        messageStatus.className = 'message-status error';
    }
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
}

