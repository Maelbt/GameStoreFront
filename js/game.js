let gameInfo = null;

async function fetchGameDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    console.log(gameId);

    if (!gameId) {
        document.getElementById('gameDetails').innerHTML = 'No game ID provided.';
        return;
    }

    try {
        const response = await fetch(apiUrl + `game/${gameId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        console.log(response);

        const game = await response.json();
        gameInfo = game;
        console.log(game);

        // Mettre à jour les éléments de la page
        document.getElementById('gameName').innerText = game.name || 'N/A';
        document.getElementById('gamePicture').src = game.picture || '../images/default.jpg';
        document.getElementById('gameDescription').innerText = game.description || 'No description available';

        const priceElement = document.getElementById('gamePrice');
        const promotionElement = document.getElementById('gamePromotion');
        const finalPriceElement = document.getElementById('gameFinalPrice');

        // Mettre à jour le prix
        const price = game.price ? parseFloat(game.price) : 0;
        priceElement.innerText = price ? `${price}€` : 'N/A';

        // Mettre à jour la promotion
        const promotion = game.promotion ? parseFloat(game.promotion) : 0;
        if (promotion > 0) {
            promotionElement.innerText = `-${promotion}%`;
            promotionElement.style.display = 'block'; // Assurez-vous que l'élément est visible

            // Calculer et afficher le prix final
            const finalPrice = price * (1 - (promotion / 100));
            finalPriceElement.innerText = `${finalPrice.toFixed(2)}€`;
            finalPriceElement.style.display = 'block'; // Assurez-vous que l'élément est visible

            // Réduire la taille de la police de #gamePrice si promotion est > 0
            priceElement.style.fontSize = '1rem';
        } else {
            promotionElement.style.display = 'none'; // Masquez l'élément si la promotion est 0 ou non définie
            finalPriceElement.style.display = 'none'; // Masquez l'élément si la promotion est 0

            // Augmenter la taille de la police de #gamePrice si promotion est 0
            priceElement.style.fontSize = '1.5rem';
        }

        document.getElementById('gameReleaseDate').innerText = `Date de sortie : ${game.releaseDate || 'N/A'}`;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('gameDetails').innerHTML = 'Error fetching game details.';
    }
}

fetchGameDetails();



//Ajout au panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.getElementById('addToCart').addEventListener('click', () => {
    console.log(gameInfo);
    
    cart.push({...gameInfo});
    localStorage.setItem('cart', JSON.stringify(cart)); // Sauvegarder dans localStorage

    alert(`${gameInfo.name} a été ajouté au panier!`);
});