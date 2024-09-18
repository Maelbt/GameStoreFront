//Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputDescription = document.getElementById("DescriptionInput");
const inputPegi = document.getElementById("PegiInput");
const inputGenre = document.getElementById("GenreInput");
const inputPlateforme = document.getElementById("PlateformeInput");
const inputPrice = document.getElementById("PriceInput");
const inputPromotion = document.getElementById("PromotionInput");
const inputQuantity = document.getElementById("QuantityInput");
const inputReleaseDate = document.getElementById("ReleaseDateInput");
const btnValidation = document.getElementById("btn-validation-creation");
const formCreation = document.getElementById("formulaireCreation");

inputNom.addEventListener("keyup", validateForm); 
inputDescription.addEventListener("keyup", validateForm);
inputPegi.addEventListener("keyup", validateForm);
inputGenre.addEventListener("keyup", validateForm);
inputPlateforme.addEventListener("keyup", validateForm);
inputPrice.addEventListener("keyup", validateForm);
inputPromotion.addEventListener("keyup", validateForm);
inputQuantity.addEventListener("keyup", validateForm);
inputReleaseDate.addEventListener("keyup", validateForm);

btnValidation.addEventListener("click", CreationJeu);

//Function permettant de valider tout le formulaire
function validateForm(){
    const nomOk = validateRequired(inputNom);
    const descriptionOk = validateRequired(inputDescription);
    const pegiOk = validateRequired(inputPegi);
    const genreOk = validateRequired(inputGenre);
    const plateformeOk = validateRequired(inputPlateforme);
    const priceOk = validateRequired(inputPrice);
    const promotionOk = validateRequired(inputPromotion);
    const quantityOk = validateRequired(inputQuantity);
    const releaseDateOk = validateRequired(inputReleaseDate);

    if(nomOk && descriptionOk && pegiOk && genreOk && plateformeOk && priceOk && promotionOk && quantityOk && releaseDateOk){
        btnValidation.disabled = false;
    }
    else{
        btnValidation.disabled = true;
    }
}

function validateRequired(input){
    if(input.value != ''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function CreationJeu(){
    let dataForm = new FormData(formCreation);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let genre = dataForm.get("Genre").split(",")
    let plateforme = dataForm.get("Plateforme").split(",")
    let raw = JSON.stringify({
      "name": dataForm.get("Nom"),
      "description": dataForm.get("Description"),
      "pegi": Number(dataForm.get("Pegi")),
      "genre": genre,
      "plateforme": plateforme,
      "price": Number(dataForm.get("Prix")),
      "promotion": Number(dataForm.get("Promotion")),
      "quantity": Number(dataForm.get("Quantité")),
      "releaseDate": dataForm.get("DateDeSortie")
    });
    console.log(raw);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(apiUrl+"game", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            alert("Erreur lors de la création du jeu");
        }
    })
    .then(result => {
        alert("Le jeu " + dataForm.get("Nom") + " a bien été créé.");
    })
    .catch(error => console.log('error', error));
}