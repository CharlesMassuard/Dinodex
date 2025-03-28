const dinosaursData = require("../../dinosaurs.json");

exports.handler = async (event) => {
    const { httpMethod, path } = event;

    // Vérifie si un ID est présent dans l'URL
    const idMatch = path.match(/\/dinosaurs\/(\d+)/);
    if (httpMethod === "GET" && idMatch) {
        const id = parseInt(idMatch[1], 10);
        const dinosaur = dinosaursData.dinosaures.find(d => d.id === id);
        if (dinosaur) {
            return {
                statusCode: 200,
                body: JSON.stringify(dinosaur),
                headers: { "Content-Type": "application/json" },
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Dinosaur not found" }),
                headers: { "Content-Type": "application/json" },
            };
        }
    }

    // Retourne tous les dinosaures
    if (httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify(dinosaursData.dinosaures),
            headers: { "Content-Type": "application/json" },
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid request" }),
        headers: { "Content-Type": "application/json" },
    };
};