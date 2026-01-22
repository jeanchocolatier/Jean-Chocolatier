/* ================================
   SUPABASE CONFIG
================================ */

const SUPABASE_URL = "https://opwjehlwkksuytrmdeii.supabase.co";
const SUPABASE_KEY = "sb_publishable_MF0N_X53H4t7szkg_AJOAA_g0073LpN";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* ================================
   PRODUITS (ORIGINE)
================================ */

const products = [
  {
    id: 1,
    name: "Tablette Pralinée au Chocolat Noir",
    description:
      "Découvrez notre nouvelle tablette au chocolat praliné Édition Limitée. À l'intérieur de cette tablette, vous trouverez une délicieuse couche de praliné noisette et amande avec ses croquantes crêpes dentelles, qui donnent du croustillant à la tablette. Cette tablette est sans sucres ajoutés ! Elle est également disponible au chocolat au lait.",
    price: 4.8,
    image: "produit-1-tablette-praline.jpg",
  },
  {
    id: 2,
    name: "Truffes au Chocolat Noir",
    description:
      "Découvrez nos Truffes au Chocolat Noir, à la texture fondante en bouche.",
    price: 7.5,
    image: "produit-2-truffes.jpg",
    isTruffes: true,
    truffesOptions: [
      { quantity: 5, price: 4.0 },
      { quantity: 10, price: 7.5 },
      { quantity: 15, price: 10.0 },
      { quantity: 20, price: 12.5 },
    ],
  },
  {
    id: 3,
    name: "Pâte à tartiner",
    description:
      "Découvrez notre délicieuse pâte à tartiner créée à base de 3 ingrédients seulement : du chocolat, des noisettes, et des amandes. Elle se conserve 2 semaines. Sans sucres ajoutés !",
    price: 5.0,
    image: "produit-3-pate-tartiner.jpg",
  },
  {
    id: 4,
    name: "Plaque de Chocolat Noir en forme d'une lettre",
    description:
      "Cette plaque de chocolat prend la forme d'une lettre de votre choix. Merci d'indiquer cette lettre lors de votre commande. Cette plaque est également est disponible au chocolat au lait.",
    price: 4.0,
    image: "produit-4-tablette-lettre.jpg",
  },
  {
    id: 5,
    name: "Tablette au Chocolat Noir décorée d'une lettre",
    description:
      "Sur cette tablette de chocolat est dessinée la lettre de votre choix, en chocolat blanc. Merci d'indiquer cette lettre lors de votre commande. Cette tablette est également disponible au chocolat au lait.",
    price: 3.8,
    image: "produit-5-tablette-decoree.jpg",
  },
  {
    id: 6,
    name: "Tablette Classique au Chocolat Noir ou Lait",
    description:
      "Découvrez notre Tablette Classique au Chocolat Noir ou Lait.",
    price: 2.1,
    image: "produit-6-tablette-classique.jpg",
  },
];


/* ================================
   PANIER
================================ */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
  setupCartEvents();
});


/* ================================
   AFFICHAGE PRODUITS
================================ */

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = products
    .map((product) => {
      if (product.isTruffes) {
        return `
      <div class="product-card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>

        <div id="price-${product.id}" class="product-price">
          ${product.truffesOptions[0].price.toFixed(2)} €
        </div>

        <select id="truffes-option-${product.id}"
          onchange="updateTruffesPrice(${product.id})">
          ${product.truffesOptions
            .map(
              (o) =>
                `<option value="${o.quantity}" data-price="${o.price}">
                ${o.quantity} truffes
              </option>`
            )
            .join("")}
        </select>

        <button class="btn-add-cart"
          onclick="addToCart(${product.id}, true)">
          Ajouter au Panier
        </button>
      </div>`;
      }

      return `
    <div class="product-card">
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>

      <div class="product-price">
        ${product.price.toFixed(2)} €
      </div>

      <select id="qty-${product.id}">
        <option>1</option><option>2</option>
        <option>3</option><option>4</option>
        <option>5</option>
      </select>

      <button class="btn-add-cart"
        onclick="addToCart(${product.id})">
        Ajouter au Panier
      </button>
    </div>`;
    })
    .join("");
}

function updateTruffesPrice(id) {
  const select = document.getElementById(`truffes-option-${id}`);
  const price =
    select.options[select.selectedIndex].dataset.price;

  document.getElementById(`price-${id}`).textContent =
    parseFloat(price).toFixed(2) + " €";
}


/* ================================
   AJOUT PANIER
================================ */

function addToCart(productId, isTruffes = false) {
  const product = products.find((p) => p.id === productId);

  let quantity, price, name;

  if (isTruffes) {
    const select =
      document.getElementById(`truffes-option-${productId}`);
    quantity = parseInt(select.value);
    price =
      parseFloat(
        select.options[select.selectedIndex].dataset.price
      );
    name = `${product.name} (${quantity} truffes)`;
  } else {
    quantity =
      parseInt(
        document.getElementById(`qty-${productId}`).value
      );
    price = product.price;
    name = product.name;
  }

  cart.push({ name, quantity, price });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}


/* ================================
   ENVOI COMMANDE
================================ */

document
  .getElementById("orderForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      address: address.value,
      cart_json: cart,
    };

    const { error } = await supabaseClient
      .from("orders")
      .insert([data]);

    if (error) {
      console.error(error);
      alert("Échec de l'envoi");
      return;
    }

    alert("Commande envoyée !");
    cart = [];
    localStorage.removeItem("cart");
    location.reload();
  });


/* ================================
   CONTACT
================================ */

document
  .getElementById("contactForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { error } = await supabaseClient
      .from("messages")
      .insert([
        {
          name: name.value,
          email: email.value,
          subject: subject.value,
          message: message.value,
        },
      ]);

    if (error) {
      alert("Échec de l'envoi");
      console.error(error);
      return;
    }

    alert("Message envoyé !");
    e.target.reset();
  });
