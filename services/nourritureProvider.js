export default class FoodProvider{

    static fetchFoods = async () => {
        try {
            const response = await fetch("/.netlify/functions/nourritures");
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching foods', error);
        }
    }

    static postFood = async (food) => {
        try {
            const response = await fetch("/.netlify/functions/nourritures", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(food),
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error posting food', error);
        }
    }

    static getFood = async (id) => {
        try {
            const response = await fetch(`/.netlify/functions/nourritures/${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching foods', error);
        }
    };
}