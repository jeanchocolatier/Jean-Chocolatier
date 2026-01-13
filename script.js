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
        description: "Cette plaque de chocolat prend la forme d'une lettre de votre choix...",
        price: 4.00,
        image: "produit-4-tablette-lettre.jpg"
    },
    {
        id: 5,
        name: "Tablette au Chocolat Noir décorée d'une lettre",
        description: "Sur cette tablette de chocolat est dessinée la lettre de votre choix...",
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

// SUPABASE
const supabase = window.supabase.createClient(
    "https://opwjehlwkksuytrmdeii.supabase.co",
    "sb_publishable_MF0N_X53H4t7szkg_AJOAA_g0073LpN"
);

// PANIER
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
    setupCartEvents();
});

// AFFICHAGE PRODUITS
function renderProducts() {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-image">
                <img src="${p.image}">
            </div>
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <div class="product-price">${p.price.toFixed(2)} €</div>

            <div class="product-controls">
                <select id="qty-${p.id}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <button class="btn-add-cart" onclick="addToCart(${p.id})">
                    Ajouter au panier
                </button>
            </div>
        </div>
    `).join("");
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    const qty = parseInt(document.getElementById(`qty-${id}`).value);

    cart.push({
        name: p.name,
        price: p.price,
        quantity: qty
    });

    saveCart();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// MODAL + ENVOI COMMANDES SUPABASE
document.getElementById("orderForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const order = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value,
        cart: JSON.stringify(cart)
    };

    const { error } = await supabase.from("orders").insert(order);
    if (error) {
        alert("Erreur lors de l'envoi !");
        console.log(error);
        return;
    }

    alert("Commande envoyée !");
    cart = [];
    saveCart();
    document.getElementById("orderModal").classList.remove("active");
    updateCartCount();
});
