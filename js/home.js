//Récupérer les informations des images

async function getAllgames() {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl + "game", requestOptions);
        if (!response.ok) throw new Error('Network response was not ok');

        const games = await response.json();
        console.log(games);

        // Convertir les chaînes de caractères en objets Date et trier les jeux par date de sortie
        games.sort((a, b) => {
            const dateA = new Date(a.releaseDate.split('/').reverse().join('/'));
            const dateB = new Date(b.releaseDate.split('/').reverse().join('/'));
            return dateB - dateA; // Trier par date décroissante
        });

        // Limiter à 6 jeux
        const gamesToDisplay = games.slice(0, 6);

        let HTML = "";
        gamesToDisplay.forEach((game) => {
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

        document.getElementById("allGames").innerHTML = HTML;

        document.querySelectorAll('.image-card').forEach(card => { //redirection vers la page /game correspondante
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


async function getAllPromos() {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl + "game", requestOptions);
        if (!response.ok) throw new Error('Network response was not ok');

        const games = await response.json();
        console.log(games);

        let HTML = "";

        // Filtrer les jeux avec promotion
        const filteredGames = games.filter(game => game.promotion > 0);

        if (filteredGames.length > 0) {
            filteredGames.forEach((game) => {
                const imageUrl = game.picture || '../images/default.jpg'; // Valeur par défaut en cas d'absence d'image
                let promo = (game.price * (1 - (game.promotion / 100))).toFixed(2);
                HTML += `
                <div class="image-card text-white col p-3" data-id="${game.id}">
                    <img src="${imageUrl}" class="rounded w-100" alt="${game.name} image"/>
                    <p class="price-card">${promo}€</p>
                    <p class="promotion-card">${game.promotion}%</p>
                    <p class="titre-image">${game.name}</p>
                </div>`;
            });
        } else {
            HTML = `<div class="d-flex justify-content-center text-white w-100 my-5"><p>Aucun jeu trouvé</p></div>`;
        }

        document.getElementById("allPromos").innerHTML = HTML;

        document.querySelectorAll('.image-card').forEach(card => { //redirection vers la page /game correspondante
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

getAllPromos();




//Edition Modal
async function openEditModal(gameId) {
  try {
      const response = await fetch(`/api/game/${gameId}`);
      if (!response.ok) throw new Error('Erreur de réseau');
      const game = await response.json();

      document.getElementById('editGameId').value = game.id;
      document.getElementById('editName').value = game.name;
      document.getElementById('editPrice').value = game.price;
      document.getElementById('editDescription').value = game.description;
      document.getElementById('editGenre').value = game.genre.join(', ');
      document.getElementById('editPlateforme').value = game.plateforme.join(', ');
      document.getElementById('editReleaseDate').value = new Date(game.releaseDate).toISOString().split('T')[0];

      new bootstrap.Modal(document.getElementById('EditionPhotoModal')).show();
  } catch (error) {
      console.error('Erreur lors de la récupération des données du jeu:', error);
  }
}

//soumission formulaire édition
document.getElementById('editGameForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const gameId = document.getElementById('editGameId').value;
  const updatedGame = {
      name: document.getElementById('editName').value,
      price: parseFloat(document.getElementById('editPrice').value),
      description: document.getElementById('editDescription').value,
      genre: document.getElementById('editGenre').value.split(',').map(g => g.trim()),
      plateforme: document.getElementById('editPlateforme').value.split(',').map(p => p.trim()),
      releaseDate: document.getElementById('editReleaseDate').value
  };

  try {
      const response = await fetch(`/api/game/${gameId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedGame)
      });
      if (!response.ok) throw new Error('Erreur de réseau');

      new bootstrap.Modal(document.getElementById('EditionPhotoModal')).hide();
      // Recharger la liste des jeux ou effectuer toute autre action nécessaire
      getAllGames(); // Remplacez par votre méthode pour recharger les jeux
  } catch (error) {
      console.error('Erreur lors de la mise à jour du jeu:', error);
  }
});

//Suppression Modal
async function openDeleteModal(gameId) {
  try {
      const response = await fetch(`/api/game/${gameId}`);
      if (!response.ok) throw new Error('Erreur de réseau');
      const game = await response.json();

      document.getElementById('deleteGameId').value = game.id;
      document.getElementById('deleteGameName').textContent = game.name;

      new bootstrap.Modal(document.getElementById('DeletePhotoModal')).show();
  } catch (error) {
      console.error('Erreur lors de la récupération des données du jeu:', error);
  }
}

//soumission formulaire suppression
document.getElementById('confirmDelete').addEventListener('click', async function () {
  const gameId = document.getElementById('deleteGameId').value;

  try {
      const response = await fetch(`/api/game/${gameId}`, {
          method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur de réseau');

      new bootstrap.Modal(document.getElementById('DeletePhotoModal')).hide();
      // Recharger la liste des jeux ou effectuer toute autre action nécessaire
      getAllGames(); // Remplacez par votre méthode pour recharger les jeux
  } catch (error) {
      console.error('Erreur lors de la suppression du jeu:', error);
  }
});

//Action des boutons
function setupGameActions() {
  document.querySelectorAll('.btn-outline-light').forEach(button => {
      button.addEventListener('click', function() {
          const gameId = this.dataset.gameId;
          const action = this.dataset.action;
          
          if (action === 'edit') {
              openEditModal(gameId);
          } else if (action === 'delete') {
              // Obtenez les informations du jeu pour la suppression, ici en tant qu'exemple
              const imageUrl = this.dataset.imageUrl;
              const gameName = this.dataset.gameName;
              openDeleteModal(gameId, imageUrl, gameName);
          }
      });
  });
}

getAllgames().then(() => {
  setupGameActions();
});