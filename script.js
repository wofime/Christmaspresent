// Variables globales
const GITHUB_API_URL = "https://api.github.com/repos/TON_UTILISATEUR/gestion-listes/contents";
const TOKEN = "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"; // À générer dans les paramètres de ton compte GitHub

// Créer une liste
document.getElementById("createListBtn").addEventListener("click", async () => {
  const listCode = prompt("Entrez un code unique pour votre liste (ex: ABC123)");
  const data = {
    codeListe: listCode,
    elements: []
  };

  const response = await fetch(`${GITHUB_API_URL}/${listCode}.json`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: `Création de la liste ${listCode}`,
      content: btoa(JSON.stringify(data)) // Convertir les données en base64
    })
  });

  if (response.ok) {
    alert(`Liste ${listCode} créée avec succès !`);
  } else {
    alert("Erreur lors de la création de la liste.");
  }
});

// Voir une liste
document.getElementById("viewListBtn").addEventListener("click", async () => {
  const listCode = document.getElementById("listCodeInput").value;

  const response = await fetch(`https://raw.githubusercontent.com/TON_UTILISATEUR/gestion-listes/main/${listCode}.json`);
  if (response.ok) {
    const data = await response.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
  } else {
    alert("Liste introuvable.");
  }
});
