// Produits disponibles
const products = [
    {
        id: 1,
        name: "Tablette Praliné au Chocolat Noir",
        description: "Découvrez notre nouvelle tablette au chocolat praliné Édition Limitée. À l' intérieur de cette tablette, vous trouverez une délicieuse couche de praliné noisette & amande avec ses croquantes crêpes dentelles qui donnent du croustillant à la tablette. Cette tablettes est sans sucres ajoutés !",
        price: 4.80,
        image: "produit-1-tablette-praline.jpg"
    },
    {
        id: 2,
        name: "Truffes au Chocolat Noir",
        description: "Découvrez nos Truffes au Chocolat Noir, préparées avec des ingrédients de qualité supérieure.",
        price: 7.50, // Prix par défaut (sera remplacé par les options)
        image: "produit-2-truffes.jpg",
        isTruffes: true, // Indicateur spécial pour les truffes
        truffesOptions: [
            { quantity: 5, price: 4.00 },
            { quantity: 10, price: 7.50 },
            { quantity: 15, price: 10.00 },
            { quantity: 20, price: 12.50 }
        ]
    },
    {
        id: 3,
        name: "Pâte à tartiner",
        description: "Découvrez notre délicieuse pâte à tartiner créée à base de seulement 3 ingrédients : du chocolat, des noisettes & des amandes. Elle se conserve 2 semaines. SANS SUCRES AJOUTÉS !",
        price: 5.00,
        image: "produit-3-pate-tartiner.jpg"
    },
    {
        id: 4,
        name: "Tablette au Chocolat Noir en forme d'une lettre",
        description: "Cette tablette prend la forme de la première lettre de votre prénom. Merci d'indiquer cette lettre dans votre commande.",
        price: 3.50,
        image: "produit-4-tablette-lettre.jpg"
    },
    {
        id: 5,
        name: "Tablette au Chocolat Noir décorée d'une lettre",
        description: "Sur cette tablette de chocolat noir est dessinée à l'aide de chocolat blanc la première lettre de votre prénom. Merci d'indiquer cette lettre dans votre commande.",
        price: 3.60,
        image: "produit-5-tablette-decoree.jpg"
    },
    {
        id: 6,
        name: "Tablette Classique au Chocolat Noir",
        description: "Découvrez notre Tablette Classique au Chocolat Noir.",
        price: 2.10,
        image: "produit-6-tablette-classique.jpg"
    }
];

// Gestion du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    setupCartEvents();
    loadCartCount();
});

// Afficher les produits
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => {
        // Gestion spéciale pour les truffes
        if (product.isTruffes) {
            return `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="product-image-placeholder" style="display: none;">🍬</div>
                    </div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price" id="price-${product.id}">${product.truffesOptions[0].price.toFixed(2)} €</div>
                    <div class="product-controls">
                        <select class="quantity-select" id="truffes-option-${product.id}" onchange="updateTruffesPrice(${product.id})">
                            ${product.truffesOptions.map(option => 
                                `<option value="${option.quantity}" data-price="${option.price}">${option.quantity} Truffes</option>`
                            ).join('')}
                        </select>
                        <button class="btn-add-cart" onclick="addToCart(${product.id}, true)">
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Produits normaux
            return `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="product-image-placeholder" style="display: none;">🍫</div>
                    </div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${product.price.toFixed(2)} €</div>
                    <div class="product-controls">
                        <select class="quantity-select" id="qty-${product.id}">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button class="btn-add-cart" onclick="addToCart(${product.id})">
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            `;
        }
    }).join('');
}

// Mettre à jour le prix des truffes selon l'option choisie
function updateTruffesPrice(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.isTruffes) return;

    const select = document.getElementById(`truffes-option-${productId}`);
    const priceElement = document.getElementById(`price-${productId}`);
    const selectedOption = select.options[select.selectedIndex];
    const price = parseFloat(selectedOption.getAttribute('data-price'));
    
    if (priceElement) {
        priceElement.textContent = price.toFixed(2) + ' €';
    }
}

// Ajouter au panier
function addToCart(productId, isTruffes = false) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let quantity, price, displayName;

    if (isTruffes && product.isTruffes) {
        // Pour les truffes, utiliser l'option sélectionnée
        const select = document.getElementById(`truffes-option-${productId}`);
        const selectedOption = select.options[select.selectedIndex];
        quantity = parseInt(selectedOption.value);
        price = parseFloat(selectedOption.getAttribute('data-price'));
        displayName = `${product.name} (${quantity} truffes)`;
    } else {
        // Pour les produits normaux
        const quantitySelect = document.getElementById(`qty-${productId}`);
        quantity = parseInt(quantitySelect.value);
        price = product.price;
        displayName = product.name;
    }

    // Créer un identifiant unique pour les truffes avec quantité différente
    const cartItemId = isTruffes ? `truffes-${productId}-${quantity}` : productId;
    
    const existingItem = cart.find(item => {
        if (isTruffes) {
            return item.cartItemId === cartItemId;
        } else {
            return item.id === productId;
        }
    });
    
    if (existingItem) {
        existingItem.quantity += 1; // Ajouter une unité de plus
    } else {
        cart.push({
            id: productId,
            cartItemId: cartItemId,
            name: displayName,
            price: price,
            quantity: 1,
            image: product.image,
            isTruffes: isTruffes,
            truffesQuantity: isTruffes ? quantity : null
        });
    }

    saveCart();
    updateCartCount();
    showCartNotification();
}

// Sauvegarder le panier
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Mettre à jour le compteur du panier
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Charger le compteur du panier (pour la page contact)
function loadCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Notification d'ajout au panier
function showCartNotification() {
    // Animation simple - vous pouvez améliorer cela
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }
}

// Événements du panier
function setupCartEvents() {
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');
    const btnOrder = document.getElementById('btnOrder');
    const orderModal = document.getElementById('orderModal');
    const closeModal = document.getElementById('closeModal');
    const orderForm = document.getElementById('orderForm');

    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', closeCartSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeCartSidebar);
    }

    if (btnOrder) {
        btnOrder.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Votre panier est vide');
                return;
            }
            closeCartSidebar();
            openOrderModal();
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeOrderModal);
    }

    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }

    renderCartItems();
}

// Ouvrir le panier
function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    if (cartSidebar) cartSidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    renderCartItems();
}

// Fermer le panier
function closeCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// Afficher les articles du panier
function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) cartTotal.textContent = '0,00 €';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => {
        const total = item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">Quantité: ${item.quantity} × ${item.price.toFixed(2)} €</div>
                </div>
                <div class="cart-item-price">${total.toFixed(2)} €</div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    // Calculer le total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) cartTotal.textContent = total.toFixed(2) + ' €';
}

// Retirer du panier
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCartItems();
}

// Ouvrir le modal de commande
function openOrderModal() {
    const orderModal = document.getElementById('orderModal');
    if (orderModal) orderModal.classList.add('active');
}

// Fermer le modal de commande
function closeOrderModal() {
    const orderModal = document.getElementById('orderModal');
    if (orderModal) orderModal.classList.remove('active');
}

// Gérer la soumission de la commande
function handleOrderSubmit(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        cart: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    // Créer le contenu de l'email
    const cartItems = cart.map(item => 
        `${item.name} (x${item.quantity}) : ${(item.price * item.quantity).toFixed(2)} €`
    ).join('\n');

    const emailBody = `Nouvelle commande de ${formData.firstName} ${formData.lastName}

Client:
- Nom: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Adresse: ${formData.address}

Commande:
${cartItems}

Total: ${formData.total.toFixed(2)} €`;

    // Essayer d'envoyer au serveur, sinon utiliser mailto
    fetch('/api/order', {
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
            alert('Commande validée avec succès ! Merci pour votre achat.');
            cart = [];
            saveCart();
            updateCartCount();
            closeOrderModal();
            renderCartItems();
            e.target.reset();
        } else {
            throw new Error('Erreur serveur');
        }
    })
    .catch(error => {
        // Solution de secours : utiliser mailto
        const subject = encodeURIComponent(`Nouvelle commande de ${formData.firstName} ${formData.lastName}`);
        const body = encodeURIComponent(emailBody);
        window.location.href = `mailto:jean.chocolatier.site@gmail.com?subject=${subject}&body=${body}`;
        
        alert('Commande validée ! Votre client de messagerie va s\'ouvrir pour confirmer l\'envoi. Si aucune fenêtre ne s\'ouvre, copiez les informations de la commande.');
        
        cart = [];
        saveCart();
        updateCartCount();
        closeOrderModal();
        renderCartItems();
        e.target.reset();
    });
}

