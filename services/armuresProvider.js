export default class ArmuresProvider{

    static fetchArmures = async () => {
        try {
            const response = await fetch("/.netlify/functions/dinosaurs");
            const json = await response.json();
            return json.armures;
        } catch (error) {
            console.error('Error fetching Armures', error);
        }
    }

    static postArmure = async (Armure) => {
        try {
            const response = await fetch("/.netlify/functions/dinosaurs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(Armure),
            });
            const json = await response.json();
            return json.armures;
        } catch (error) {
            console.error('Error posting Armure', error);
        }
    }

    static getArmure = async (id) => {
        try {
            const response = await fetch(`/.netlify/functions/dinosaurs/${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching Armure', error);
        }
    }
}