// ------------------------------------------
// CONFIG SUPABASE
// ------------------------------------------
const SUPABASE_URL = "https://opwjehlwkksuytrmdeii.supabase.co";
const SUPABASE_KEY = "sb_publishable_MF0N_X53H4t7szkg_AJOAA_g0073LpN";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ------------------------------------------
// PRODUITS (D’ORIGINE — INCHANGÉS)
// ------------------------------------------
const products = [
    {
        id: 1,
        name: "Tablette Pralinée au Chocolat Noir",
        description: "Découvrez notre nouvelle tablette au chocolat praliné Édition Limitée. À l'intérieur de cette tablette, vous trouverez une délicieuse couche de praliné noisette et amande avec ses croquantes crêpes dentelles, qui donnent du croustillant à la tablette. Cette tablette est sans sucres ajoutés ! Elle est également disponible au chocolat au lait.",
        price: 4.80,
        image: "produit-1-tablette-praline.jpg"
    },
    {
        id: 2,
        name: "Truffes au Chocolat Noir",
        description: "Découvrez nos Truffes au Chocolat Noir, à la texture fondante en bouche.",
        price: 7.50,
        image: "produit-2-truffes.jpg",
        isTruffes: true,
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
        description: "Découvrez notre délicieuse pâte à tartiner créée à base de 3 ingrédients seulement : du chocolat, des noisettes, et des amandes. Elle se conserve 2 semaines. Sans sucres ajoutés !",
        price: 5.00,
        image: "produit-3-pate-tartiner.jpg"
    },
    {
        id: 4,
        name: "Plaque de Chocolat Noir en forme d'une lettre",
        description: "Cette plaque de chocolat prend la forme d'une lettre de votre choix. Merci d'indiquer cette lettre lors de votre commande. Cette plaque est également est disponible au chocolat au lait.",
        price: 4.00,
        image: "produit-4-tablette-lettre.jpg"
    },
    {
        id: 5,
        name: "Tablette au Chocolat Noir décorée d'une lettre",
        description: "Sur cette tablette de chocolat est dessinée la lettre de votre choix, en chocolat blanc. Merci d'indiquer cette lettre lors de votre commande. Cette tablette est également disponible au chocolat au lait.",
        price: 3.80,
        image: "produit-5-tablette-decoree.jpg"
    },
    {
        id: 6,
        name: "Tablette Classique au Chocolat Noir ou Lait",
        description: "Découvrez notre Tablette Classique au Chocolat Noir ou Lait.",
        price: 2.10,
        image: "produit-6-tablette-classique.jpg"
    }
];

// ------------------------------------------
// PANIER
// ------------------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
    setupCartEvents();
});

// ------------------------------------------
// AFFICHAGE DES PRODUITS
// ------------------------------------------
function renderProducts() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    grid.innerHTML = products.map(product => {

        if (product.isTruffes) {
            return `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>

                    <h3>${product.name}</h3>
                    <p>${product.description}</p>

                    <div class="product-price" id="price-${product.id}">
                        ${product.truffesOptions[0].price.toFixed(2)} €
                    </div>

                    <div class="product-controls">
                        <select id="truffes-option-${product.id}" onchange="updateTruffesPrice(${product.id})">
                            ${product.truffesOptions.map(o =>
                                `<option value="${o.quantity}" data-price="${o.price}">
                                    ${o.quantity} truffes
                                </option>`
                            ).join("")}
                        </select>

                        <button class="btn-add-cart" onclick="addToCart(${product.id}, true)">
                            Ajouter au Panier
                        </button>
                    </div>
                </div>
            `;
        }

        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <h3>${product.name}</h3>
                <p>${product.description}</p>

                <div class="product-price">${product.price.toFixed(2)} €</div>

                <div class="product-controls">
                    <select id="qty-${product.id}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        Ajouter au Panier
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

function updateTruffesPrice(productId) {
    const select = document.getElementById(`truffes-option-${productId}`);
    const price = select.options[select.selectedIndex].dataset.price;
    document.getElementById(`price-${productId}`).textContent =
        parseFloat(price).toFixed(2) + " €";
}

// ------------------------------------------
// AJOUT AU PANIER
// ------------------------------------------
function addToCart(productId, isTruffes = false) {
    const product = products.find(p => p.id === productId);

    let itemName, quantity, price, key;

    if (isTruffes) {
        const select = document.getElementById(`truffes-option-${productId}`);
        quantity = parseInt(select.value);
        price = parseFloat(select.options[select.selectedIndex].dataset.price);
        itemName = `${product.name} (${quantity} truffes)`;
        key = `${productId}-${quantity}`;
    } else {
        quantity = parseInt(document.getElementById(`qty-${productId}`).value);
        price = product.price;
        itemName = product.name;
        key = productId;
    }

    const exists = cart.find(i => i.key === key);

    if (exists) {
        exists.quantity++;
    } else {
        cart.push({ key, name: itemName, price, quantity: 1 });
    }

    saveCart();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = count;
}

// ------------------------------------------
// PANIER SIDEBAR
// ------------------------------------------
function setupCartEvents() {
    const cartIcon = document.getElementById("cartIcon");
    const sidebar = document.getElementById("cartSidebar");
    const overlay = document.getElementById("overlay");

    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
            renderCartItems();
        });
    }

    document.getElementById("closeCart")?.addEventListener("click", closeCart);
    overlay?.addEventListener("click", closeCart);

    document.getElementById("btnOrder")?.addEventListener("click", () => {
        if (cart.length === 0) return alert("Votre panier est vide");
        openOrderModal();
    });

    document.getElementById("closeModal")?.addEventListener("click", closeOrderModal);
}

function closeCart() {
    document.getElementById("cartSidebar").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

function renderCartItems() {
    const container = document.getElementById("cartItems");

    if (cart.length === 0) {
        container.innerHTML = "<p class='empty-cart'>Votre panier est vide</p>";
        document.getElementById("cartTotal").textContent = "0,00 €";
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                ${item.quantity} × ${item.price.toFixed(2)} €
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                🗑️
            </button>
        </div>
    `).join("");

    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    document.getElementById("cartTotal").textContent = total.toFixed(2) + " €";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartItems();
    updateCartCount();
}

// ------------------------------------------
// MODAL COMMANDE
// ------------------------------------------
function openOrderModal() {
    document.getElementById("orderModal").classList.add("active");
}

function closeOrderModal() {
    document.getElementById("orderModal").classList.remove("active");
}

// ------------------------------------------
// ENVOI COMMANDE → SUPABASE (TABLE orders)
// ------------------------------------------
document.getElementById("orderForm")?.addEventListener("submit", async e => {
    e.preventDefault();

    const orderData = {
        first_name: firstName.value.trim(),
        last_name: lastName.value.trim(),
        email: email.value.trim(),
        address: address.value.trim(),
        cart_json: cart,
        created_at: new Date().toISOString()
    };

    const { error } = await supabaseClient.from("orders").insert(orderData);

    if (error) {
        console.error(error);
        alert("Erreur lors de l'envoi de la commande.");
        return;
    }

    alert("Commande envoyée avec succès !");
    cart = [];
    saveCart();
    updateCartCount();
    renderCartItems();
    closeOrderModal();
});
