export default class ArmuresProvider{

    static fetchArmures = async () => {
        try {
            const response = await fetch("/.netlify/functions/armures");
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching Armures', error);
        }
    }

    static postArmure = async (Armure) => {
        try {
            const response = await fetch("/.netlify/functions/armures", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(Armure),
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error posting Armure', error);
        }
    }

    static getArmure = async (id) => {
        try {
            const response = await fetch(`/.netlify/functions/armures${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching Armure', error);
        }
    }
}