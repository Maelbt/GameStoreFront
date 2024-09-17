document.addEventListener("DOMContentLoaded", async () => {
    // Assurez-vous que les éléments sont chargés avant d'essayer de les manipuler
    const form = document.getElementById('userForm');
    const deleteButton = document.getElementById('deleteAccount');

    if (!form || !deleteButton) {
        console.error('Form or delete button not found');
        return;
    }

    // Récupérer et pré-remplir les données de l'utilisateur
    try {
        const response = await fetch('/api/account/me');
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');

        const userData = await response.json();
        document.getElementById('NomInput').value = userData.nom || '';
        document.getElementById('PrenomInput').value = userData.prenom || '';
        document.getElementById('AdresseInput').value = userData.adresse || '';
        document.getElementById('CodePostalInput').value = userData.codePostal || '';
        document.getElementById('VilleInput').value = userData.ville || '';

    } catch (error) {
        console.error('Erreur:', error);
    }

    // Gérer la soumission du formulaire
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche l'envoi par défaut du formulaire

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // Convertit les données du formulaire en objet

        try {
            const response = await fetch('/api/account/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Erreur lors de la mise à jour des données');

            alert('Informations mises à jour avec succès');
        } catch (error) {
            console.error('Erreur:', error);
        }
    });

    // Gérer la suppression du compte
    deleteButton.addEventListener('click', async () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
            try {
                const response = await fetch('/api/account/me');
                if (!response.ok) throw new Error('Erreur lors de la récupération des données utilisateur');

                const userData = await response.json();
                const userId = userData.id; // Assurez-vous que l'ID est présent dans la réponse

                const deleteResponse = await fetch(`/api/account/delete/${userId}`, {
                    method: 'DELETE'
                });

                if (!deleteResponse.ok) throw new Error('Erreur lors de la suppression du compte');

                alert('Compte supprimé avec succès');
                window.location.href = '/'; // Redirige vers la page d'accueil ou une autre page après la suppression
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
    });
});