const dinosaursData = require("../../dinosaurs.json");

exports.handler = async (event) => {
    const { httpMethod, path } = event;

    // Vérifie si un ID est présent dans l'URL
    const idMatch = path.match(/\/armures\/(\d+)/);
    if (httpMethod === "GET" && idMatch) {
        const id = parseInt(idMatch[1], 10);
        const armure = dinosaursData.armures.find(a => a.id === id);
        if (armure) {
            return {
                statusCode: 200,
                body: JSON.stringify(armure),
                headers: { "Content-Type": "application/json" },
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Armure not found" }),
                headers: { "Content-Type": "application/json" },
            };
        }
    }

    // Retourne toutes les armures
    if (httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify(dinosaursData.armures),
            headers: { "Content-Type": "application/json" },
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid request" }),
        headers: { "Content-Type": "application/json" },
    };
};