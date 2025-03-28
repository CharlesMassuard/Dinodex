const dinosaursData = require("../../dinosaurs.json");

exports.handler = async (event) => {
    const { httpMethod, path } = event;

    // Vérifie si un ID est présent dans l'URL
    const idMatch = path.match(/\/nourritures\/(\d+)/);
    if (httpMethod === "GET" && idMatch) {
        const id = parseInt(idMatch[1], 10);
        const nourriture = dinosaursData.nourritures.find(n => n.id === id);
        if (nourriture) {
            return {
                statusCode: 200,
                body: JSON.stringify(nourriture),
                headers: { "Content-Type": "application/json" },
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Nourriture not found" }),
                headers: { "Content-Type": "application/json" },
            };
        }
    }

    // Retourne toutes les nourritures
    if (httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify(dinosaursData.nourritures),
            headers: { "Content-Type": "application/json" },
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid request" }),
        headers: { "Content-Type": "application/json" },
    };
};