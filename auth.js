// Gestion de l'authentification
const ADMIN_EMAIL = 'jean.chocolatier.site@gmail.com';
const ADMIN_PASSWORD = 'Je=13716';

// Vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
}

// Se connecter
function login(email, password) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        return true;
    }
    return false;
}

// Se déconnecter
function logout() {
    localStorage.removeItem('isAdminLoggedIn');
}

// Afficher/masquer le lien Contrôle selon la connexion
function updateControlLink() {
    const controleLink = document.getElementById('controleLink');
    const loginLink = document.getElementById('loginLink');
    
    if (isLoggedIn()) {
        if (controleLink) controleLink.style.display = 'block';
        if (loginLink) loginLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Déconnexion';
    } else {
        if (controleLink) controleLink.style.display = 'none';
        if (loginLink) loginLink.innerHTML = '<i class="fas fa-user"></i> Connexion';
    }
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    updateControlLink();
    
    // Gérer le clic sur le lien de connexion
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (isLoggedIn()) {
                // Déconnexion
                logout();
                updateControlLink();
                alert('Vous êtes déconnecté.');
                if (window.location.pathname.includes('controle.html')) {
                    window.location.href = 'index.html';
                }
            } else {
                // Afficher le modal de connexion
                showLoginModal();
            }
        });
    }
});

// Afficher le modal de connexion
function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
        <div class="login-modal-content">
            <div class="login-modal-header">
                <h2>Connexion</h2>
                <button class="close-login-modal">&times;</button>
            </div>
            <form id="loginForm" class="login-form">
                <div class="form-group">
                    <label for="loginEmail">Email *</label>
                    <input type="email" id="loginEmail" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Mot de passe *</label>
                    <input type="password" id="loginPassword" required>
                </div>
                <div id="loginError" class="login-error" style="display: none;"></div>
                <button type="submit" class="btn-submit">Se connecter</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fermer le modal
    modal.querySelector('.close-login-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Gérer le formulaire
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const errorDiv = document.getElementById('loginError');
        
        if (login(email, password)) {
            updateControlLink();
            document.body.removeChild(modal);
            alert('Connexion réussie !');
        } else {
            errorDiv.textContent = 'Email ou mot de passe incorrect.';
            errorDiv.style.display = 'block';
        }
    });
}

