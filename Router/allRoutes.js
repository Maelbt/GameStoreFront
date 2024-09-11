import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", [], "/js/home.js"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["client", "admin"]),
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["client", "admin"]),
    new Route("/panier", "Mon panier", "/pages/panier.html", ["client"]),
    new Route("/pc", "PC", "/pages/plateformes/pc.html", []),
    new Route("/playstation", "Playstation", "/pages/plateformes/playstation.html", []),
    new Route("/xbox", "Xbox", "/pages/plateformes/xbox.html", []),
    new Route("/nintendo", "Nintendo", "/pages/plateformes/nintendo.html", []),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Game Store";