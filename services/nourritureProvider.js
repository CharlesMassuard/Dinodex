export default class FoodProvider{

    static fetchFoods = async () => {
        try {
            const response = await fetch("/.netlify/functions/dinosaurs");
            const json = await response.json();
            console.log("Foods fetched successfully", json);
            return json.nourritures;
        } catch (error) {
            console.error('Error fetching foods', error);
        }
    }

    static postFood = async (food) => {
        try {
            const response = await fetch("/.netlify/functions/dinosaurs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(food),
            });
            const json = await response.json();
            return json.nourritures;
        } catch (error) {
            console.error('Error posting food', error);
        }
    }

    static getFood = async (id) => {
        try {
            const response = await fetch(`/.netlify/functions/dinosaurs/${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching food', error);
        }
    }
}