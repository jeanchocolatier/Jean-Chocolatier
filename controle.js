// Gestion de la page de contrôle

// Vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

document.addEventListener('DOMContentLoaded', () => {
    // Vérifier la connexion
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    loadCartCount();
    loadContactMessages();
    loadOrders();
    
    // Gérer la déconnexion
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'index.html';
        });
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

function loadContactMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const tbody = document.getElementById('contactTableBody');
    
    if (!tbody) return;
    
    if (messages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">Aucun message de contact</td></tr>';
        return;
    }
    
    tbody.innerHTML = messages.map(msg => {
        const date = new Date(msg.date).toLocaleString('fr-FR');
        return `
            <tr>
                <td>${date}</td>
                <td>${escapeHtml(msg.name)}</td>
                <td>${escapeHtml(msg.email)}</td>
                <td>${escapeHtml(msg.subject)}</td>
                <td>${escapeHtml(msg.message)}</td>
            </tr>
        `;
    }).join('');
}

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tbody = document.getElementById('orderTableBody');
    
    if (!tbody) return;
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem;">Aucune commande</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => {
        const date = new Date(order.date).toLocaleString('fr-FR');
        const productsList = order.cart.map(item => 
            `${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toFixed(2)} €`
        ).join('<br>');
        
        return `
            <tr>
                <td>${date}</td>
                <td>${escapeHtml(order.firstName)} ${escapeHtml(order.lastName)}</td>
                <td>${escapeHtml(order.email)}</td>
                <td>${escapeHtml(order.address)}</td>
                <td>${productsList}</td>
                <td>${order.comments ? escapeHtml(order.comments) : '-'}</td>
                <td><strong>${order.total.toFixed(2)} €</strong></td>
            </tr>
        `;
    }).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
