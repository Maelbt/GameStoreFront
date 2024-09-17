import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", [], "/js/home.js"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_EMPLOYE"], "/js/auth/account.js"),
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_EMPLOYE"]),
    new Route("/panier", "Mon panier", "/pages/panier.html", ["ROLE_CLIENT", "ROLE_ADMIN"]),
    new Route("/admin", "Admin", "/pages/admin.html", ["ROLE_ADMIN", "ROLE_EMPLOYE"], "/js/admin.js"),
    new Route("/game", "Jeu", "/pages/game.html", [], "/js/game.js"),
    new Route("/allgames", "Recherche", "/pages/allgames.html", [], "/js/allgames.js"),
    new Route("/pc", "PC", "/pages/plateformes/pc.html", [], "/js/plateformes/pc.js"),
    new Route("/playstation", "Playstation", "/pages/plateformes/playstation.html", [], "/js/plateformes/playstation.js"),
    new Route("/xbox", "Xbox", "/pages/plateformes/xbox.html", [], "/js/plateformes/xbox.js"),
    new Route("/nintendo", "Nintendo", "/pages/plateformes/nintendo.html", [], "/js/plateformes/nintendo.js"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Gamestore";