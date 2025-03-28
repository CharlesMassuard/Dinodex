const dinosaurs = require("../../dinosaurs.json");

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify(dinosaurs),
        headers: { "Content-Type": "application/json" }
    };
};