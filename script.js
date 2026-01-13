// Produits disponibles
const products = [
    { id: 1, name: "Tablette Pralinée", price: 4.80, image: "produit-1-tablette-praline.jpg", description: "Délicieuse tablette pralinée." },
    { id: 2, name: "Truffes Chocolat Noir", price: 7.50, image: "produit-2-truffes.jpg", isTruffes: true,
      truffesOptions: [
        { quantity: 5, price: 4 },
        { quantity: 10, price: 7.5 },
        { quantity: 15, price: 10 },
        { quantity: 20, price: 12.5 }
      ]
    },
    { id: 3, name: "Pâte à Tartiner", price: 5.00, image: "produit-3-pate-tartiner.jpg" },
    { id: 4, name: "Plaque Lettre", price: 4.00, image: "produit-4-tablette-lettre.jpg" },
    { id: 5, name: "Tablette décorée", price: 3.80, image: "produit-5-tablette-decoree.jpg" },
    { id: 6, name: "Tablette Classique", price: 2.10, image: "produit-6-tablette-classique.jpg" }
];

// PANIER
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

// Affichage produits
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
    setupCartEvents();
});

function renderProducts() {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = products.map(p => {
        if (p.isTruffes) {
            return `
            <div class="product-card">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <select id="opt-${p.id}" onchange="updatePrice(${p.id})">
                    ${p.truffesOptions.map(o => `<option value="${o.price}" data-q="${o.quantity}">${o.quantity} truffes</option>`)}
                </select>
                <div class="price" id="price-${p.id}">${p.truffesOptions[0].price} €</div>
                <button onclick="addToCart(${p.id}, true)">Ajouter</button>
            </div>`;
        }
        return `
        <div class="product-card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <div>${p.price} €</div>
            <button onclick="addToCart(${p.id})">Ajouter</button>
        </div>`;
    }).join("");
}

function updatePrice(id) {
    let select = document.getElementById("opt-" + id);
    document.getElementById("price-" + id).textContent = select.value + " €";
}

function addToCart(id, truffes = false) {
    const product = products.find(p => p.id === id);
    let itemName = product.name;
    let price = product.price;

    if (truffes) {
        const sel = document.getElementById("opt-" + id);
        price = parseFloat(sel.value);
        const q = sel.options[sel.selectedIndex].dataset.q;
        itemName += ` (${q} truffes)`;
    }

    cart.push({ name: itemName, price: price, quantity: 1 });
    saveCart();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.length;
}

// PANIER SIDEBAR
function setupCartEvents() {
    document.getElementById("cartIcon").addEventListener("click", () => {
        document.getElementById("cartSidebar").classList.add("active");
        document.getElementById("overlay").classList.add("active");
        renderCartItems();
    });

    document.getElementById("closeCart").addEventListener("click", closeCart);
    document.getElementById("overlay").addEventListener("click", closeCart);

    document.getElementById("btnOrder").addEventListener("click", () => {
        if (cart.length === 0) return alert("Panier vide");
        document.getElementById("orderModal").classList.add("active");
    });

    document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("orderModal").classList.remove("active");
    });

    document.getElementById("orderForm").addEventListener("submit", submitOrder);
}

function closeCart() {
    document.getElementById("cartSidebar").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

function renderCartItems() {
    const container = document.getElementById("cartItems");
    if (cart.length === 0) {
        container.innerHTML = "<p>Panier vide</p>";
        return;
    }
    container.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
            ${item.name} — ${item.price}€
            <button onclick="removeItem(${i})">X</button>
        </div>
    `).join("");
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartItems();
    updateCartCount();
}

function submitOrder(e) {
    e.preventDefault();

    const order = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value,
        cart: JSON.stringify(cart)
    };

    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Commande envoyée !");
    cart = [];
    saveCart();
    updateCartCount();
    document.getElementById("orderModal").classList.remove("active");
}
