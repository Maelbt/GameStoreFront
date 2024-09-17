async function getAllXboxGames() {
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
      const filteredGames = games.filter(game => 
        game.plateforme && Array.isArray(game.plateforme) && game.plateforme.includes("Xbox")
    );

    if (filteredGames.length > 0) {
        filteredGames.forEach((game) => {
        const imageUrl = game.picture || '../images/default.jpg'; // Valeur par défaut en cas d'absence d'image
        if(game.promotion > 0){
          let promo = (game.price*(1-(game.promotion/100))).toFixed(2);
          HTML += `
          <div class="image-card text-white col p-3" data-id="${game.id}">
              <img src="${imageUrl}" class="rounded w-100" alt="${game.name} image"/>
              <p class="price-card">${promo}€</p>
              <p class="promotion-card">${game.promotion}%</p>
              <p class="titre-image">${game.name}</p>
          </div>`;
          } else{
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
  
  getAllXboxGames();