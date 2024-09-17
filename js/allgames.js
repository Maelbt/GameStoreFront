async function getAllgames(filters = {}) {
    console.log("filter", filters);
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        // Construire l'URL avec les filtres si présents
        let url = new URL(apiUrl + "game");
        Object.keys(filters).forEach(key => {
            if (filters[key]) url.searchParams.append(key, filters[key]);
        });

        const response = await fetch(url, requestOptions);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const games = await response.json();
        console.log(games);

        let HTML = "";

        if (games.length > 0) {
            games.forEach((game) => {
                const imageUrl = game.picture || '../images/default.jpg'; // Valeur par défaut en cas d'absence d'image
                if (game.promotion > 0) {
                    let promo = (game.price * (1 - (game.promotion / 100))).toFixed(2);
                    HTML += `
                    <div class="image-card text-white col p-3" data-id="${game.id}">
                        <img src="${imageUrl}" class="rounded w-100" alt="${game.name} image"/>
                        <p class="price-card">${promo}€</p>
                        <p class="promotion-card">${game.promotion}%</p>
                        <p class="titre-image">${game.name}</p>
                    </div>`;
                } else {
                    HTML += `
                    <div class="image-card text-white col p-3" data-id="${game.id}">
                        <img src="${imageUrl}" class="rounded w-100" alt="${game.name} image"/>
                        <p class="price-card">${game.price}€</p>
                        <p class="titre-image">${game.name}</p>
                    </div>`;
                }
            });
        } else {
            HTML = `<div class="d-flex justify-content-center text-white w-100 my-5"><p>Aucun jeu trouvé</p></div>`;
        }

        document.getElementById("allGames").innerHTML = HTML;

        document.querySelectorAll('.image-card').forEach(card => {
            card.addEventListener('click', () => {
                const gameId = card.getAttribute('data-id');
                if (gameId) {
                    window.location.href = `/game?id=${gameId}`;
                }
            });
        });

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


document.getElementById('filterForm').addEventListener('submit', function (event) {
    console.log("bonjour");
    event.preventDefault();

    const genre = document.getElementById('genreSelect').value;
    const price = document.getElementById('priceRange').value;

    const filters = {};
    if (genre) filters.genre = genre;
    if (price) filters.price = price;

    getAllgames(filters);
});

// Initialiser les jeux et les options de filtre
getAllgames();