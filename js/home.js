//Récupérer les informations des images

async function getAllgames(){

    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    try{
    const response = await fetch(apiUrl+"game", requestOptions);
    if (!response.ok) throw new Error('Network response was not ok');
    const games = await response.json();
    console.log(games);

    let HTML="";
    games.forEach((game)=>{
      const imageUrl = game.picture || '../images/default.jpg'; // Valeur par défaut en cas d'absence d'image
        HTML +=`
        <div class="image-card text-white col p-3">
          <img src="${imageUrl}" class="rounded w-100" alt="${game.name} image"/>
          <p class="price-card">${game.price}€</p>
          <p class="titre-image">${game.name}</p>
          <div class="action-image-buttons" data-show="admin">
            <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal"><i class="bi bi-pencil-square"></i></button>
            <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeletePhotoModal"><i class="bi bi-trash"></i></button>
          </div>
        </div>`;

    });
    return document.getElementById("allGames").innerHTML = HTML;
}  catch (error) {
  console.error('There was a problem with the fetch operation:', error);
}
}

getAllgames();