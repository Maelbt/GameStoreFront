//Récupérer les informations des images

async function getAllgames(){

    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const response = await fetch(apiUrl+"game", requestOptions);
    const games = await response.json();
    console.log(games);

    let HTML="";
    games.forEach((game)=>{
        HTML=HTML+`
        <div class="image-card text-white col p-3">
          <img src="../images/the-last-of-us-2.jpg" class="rounded w-100"/>
          <p class="price-card">${game.price}€</p>
          <p class="titre-image">${game.name}</p>
          <div class="action-image-buttons" data-show="admin">
            <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal"><i class="bi bi-pencil-square"></i></button>
            <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeletePhotoModal"><i class="bi bi-trash"></i></button>
          </div>
        </div>`

    })
    return document.getElementById("allGames").innerHTML=HTML
}

getAllgames()