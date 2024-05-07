const { Dog, Temperaments} = require('../db.js')
const axios = require('axios')
const {URL, APPI_KEY} = process.env;

const Temperamento = async (req, res) => {
    try {
        const response = await axios.get(`${URL}size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10&api_key=${APPI_KEY}`);
        const breeds = response.data;

        const foundDogs = await breeds.map(async (dog) => {
            const temperamentValue = dog.breeds[0]?.temperament;
            if (!temperamentValue) {
              //  console.log("El temperamento es undefined o null.");
                return []; // Retornar un array vacío si el temperamento no está definido
            }

            const dogTemperaments = temperamentValue.split(',').map(temp => temp.trim()).filter(temp => temp !== '' && temp !== null);

            console.log(`Temperamentos del perro: ${JSON.stringify(dogTemperaments)}`);

            const promises = dogTemperaments.map(async (temperament) => {
                try {
                    const [temperamentInstance, created] = await Temperaments.findOrCreate({
                        where: { name: temperament },
                        defaults: { name: temperament }
                    });

                    if (created) {
                        console.log(`Temperamento "${temperamentInstance.name}" creado exitosamente.`);
                        return temperamentInstance.name;
                    } else {
                        console.log(`Temperamento "${temperamentInstance.name}" ya existe en la base de datos.`);
                    }
                } catch (error) {
                    console.error(`Error al guardar el temperamento "${temperament}" en la base de datos:`, error);
                }
            });

          //  return await Promise.all(promises);
        });

        const allTemperaments = await Temperaments.findAll();

        return res.status(200).json({ temperamentos:allTemperaments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
   
    Temperamento
}
