// document.addEventListener('DOMContentLoaded', () => {
//     updateCartDisplay();
// });

// function updateCartDisplay() {
//     fetch('/api/panier') // Requête pour récupérer le panier de l'utilisateur connecté
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(cart => {
//             const cartItems = document.getElementById('cart-items');
//             const emptyCartMessage = document.getElementById('empty-cart-message');
//             const cartMessage = document.getElementById('cart-message');
//             const officialPriceElem = document.getElementById('official-price');
//             const discountsElem = document.getElementById('discounts');
//             const subtotalElem = document.getElementById('subtotal');

//             cartItems.innerHTML = '';

//             let totalPrice = 0;
//             let totalDiscount = 0;

//             if (cart.games.length === 0) {
//                 emptyCartMessage.style.display = 'block';
//                 cartMessage.style.display = 'block';
//             } else {
//                 emptyCartMessage.style.display = 'none';
//                 cartMessage.style.display = 'none';

//                 cart.games.forEach(item => {
//                     const li = document.createElement('li');
//                     li.innerText = `${item.name} - ${item.price}€`;
//                     cartItems.appendChild(li);

//                     // Récupération du prix et promotion pour calculer
//                     const priceValue = parseFloat(item.price);
//                     const promotionValue = item.promotion ? parseFloat(item.promotion) : 0;

//                     // Ajouter le prix au total
//                     totalPrice += priceValue;

//                     // Ajouter la réduction au total
//                     if (promotionValue > 0) {
//                         const discountAmount = priceValue * (promotionValue / 100);
//                         totalDiscount += discountAmount;
//                     }
//                 });

//                 officialPriceElem.innerText = `Prix officiel: ${totalPrice.toFixed(2)}€`;
//                 discountsElem.innerText = `Réductions: ${totalDiscount.toFixed(2)}€`;
//                 subtotalElem.innerText = `Sous-total: ${(totalPrice - totalDiscount).toFixed(2)}€`;
//             }
//         })
//         .catch(error => {
//             console.error('Erreur lors de la récupération du panier:', error);
//         });
// }


let cart = JSON.parse(localStorage.getItem('cart')) || [];

const initPanier=() =>{
    let HTML = "";
    if(cart.length === 0){
        HTML = `<div class="achats achats-panier-vide">
        <h4>Votre panier est vide</h4>
        <p>Vous n'avez pas encore ajouté de jeux dans votre panier.</p>
        <a href="/allgames" class="button button-secondary">Découvrir des jeux</a>
        <ul></ul> <!-- Liste des articles dans le panier -->
    </div>`
    return  document.getElementById("achats-panier").innerHTML = HTML;
    }
    
    HTML = `<div class="achats achats-panier">
    <div class="row titres-panier">
        <p class="col-6">Nom du jeu</p>
        <p class="col-2">Prix</p>
        <p class="col-2">Promotion</p>
        <p class="col-2">Prix final</p>
    </div>`

    let prixOfficiel = 0;
    let reductions = 0;
    let sousTotal = 0;

    cart.forEach(game => {
        const finalPrice = (game.price * (1-(game.promotion)/100))
        HTML += `<div class="row articles-panier">
        <p class="col-6">${game.name}</p>
        <p class="col-2">${game.price}€</p>
        <p class="col-2">${game.promotion}%</p>
        <p class="col-2">${finalPrice.toFixed(2)}€</p>
        </div>`

        prixOfficiel += game.price;
        reductions += game.price * (game.promotion/100);
    });
    sousTotal = prixOfficiel - reductions;
    HTML += `</div>`
    document.getElementById("official-price").innerHTML = `${prixOfficiel.toFixed(2)}€`;
    document.getElementById("discounts").innerHTML = `${reductions.toFixed(2)}€`;
    document.getElementById("subtotal").innerHTML = `${sousTotal.toFixed(2)}€`;
    return  document.getElementById("achats-panier").innerHTML = HTML;
}

initPanier();