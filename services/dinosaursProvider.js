export default class DinosaursProvider{

    static fetchDinosaurs = async () => {
        try {
            const response = await fetch("/.netlify/functions/dinosaurs");
            const json = await response.json();
            console.log("Dinosaurs fetched successfully", json);
            return json;
        } catch (error) {
            console.error('Error fetching dinosaurs', error);
        }
    }

    static postDinosaur = async (dinosaur) => {
        try {
            const response = await fetch("/.netlify/functions/dinosaurs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(dinosaur),
            });
            const json = await response.json();
            console.log("Dinosaur posted successfully", json);
            return json;
        } catch (error) {
            console.error('Error posting dinosaur', error);
        }
    }

    static getDinosaur = async (id) => {
        try {
            const response = await fetch(`/.netlify/functions/dinosaurs/${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching dinosaur', error);
        }
    }
}