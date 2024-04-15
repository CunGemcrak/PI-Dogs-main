const { Dog, Temperaments} = require('../db.js')
const axios = require('axios')
const {URL, APPI_KEY} = process.env;


const dogName = async (req, res) =>{

    const { name } = req.params;

    try {
        const response = await axios.get(`${URL}size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10&api_key=${APPI_KEY}`);
        let data = response.data
         const breeds = data

        // Buscar el cachorro por su nombre en los datos obtenidos
        //console.log("resultado del  "+ JSON.stringify(breeds))
        const foundDog = breeds.find(dog => dog.breeds[0].name.toLowerCase() === name.toLowerCase());

        if (!foundDog) {
            return res.status(404).json({ message: 'Cachorro no encontrado' });
        }

        return res.status(200).json({ dog: foundDog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }


}

module.exports = {

    dogName,

}
