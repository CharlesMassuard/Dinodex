export async function handler(event, context) {
    const dinosaurs = require("../dinosaurs.json");
    return {
        statusCode: 200,
        body: JSON.stringify(dinosaurs),
        headers: { "Content-Type": "application/json" }
    };
}
