//const { JSON } = require('sequelize');
const { Dog, Temperaments} = require('../db.js')
const axios = require('axios')
const {URL, URL2, APPI_KEY} = process.env;

const allDogs = async (req, res)=>{
    try {
    const respinse = await axios.get(`${URL}size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=100&api_key=${APPI_KEY}`)    
    let datos = respinse.data
    const bd_dogs = await Dog.findAll({
        include: Temperaments
    }); 




    //console.log("Direccion de Acceso"+JSON.stringify(datos))
    const modifiedDogs = bd_dogs.map((dog) => {
        const temperamentNames = dog.Temperaments.map((temp) => temp.name).join(', ');
        return {
            ...dog.toJSON(), // Convertir a objeto JSON
            temperament: temperamentNames,
        };
    });





    console.log("el dog encontrado dent4o de la api es"+ JSON.stringify(modifiedDogs));
    if(!modifiedDogs.length){
        console.log("Solo API")
        return res.status(200).json({'api':datos})
    }
    console.log("API and BD "+JSON.stringify(datos) + JSON.stringify(modifiedDogs))
    return res.status(200).json({'api':datos, 'bd':modifiedDogs})

    

} catch (error) {
        console.error(error)
        return res.status(500).json({message: error.message})
    }
}

const dog = async (req, res) =>{
    const idRaza = req.params.idRaza

    console.log("Esta es la id Raza: "+idRaza);
    
    try {
        const respinse = await axios.get(`${URL2}${idRaza}?api_key=${APPI_KEY}`)//`${URL2}/${idRaza}?api_key=${APPI_KEY}`)    
        let datos = respinse.data
       // const bd_dogs = Dog.findAll()
        //console.log("Direccion de Acceso"+JSON.stringify(datos))
        //
        console.log("Solo API")
        return res.status(200).json({datos})
        
    
    } catch (error) {
            console.error(error)
            return res.status(500).json({message: error.message})
        } 

}

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

const Temperamento = async (req, res) => {
    try {
        const response = await axios.get(`${URL}size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10&api_key=${APPI_KEY}`);
        const breeds = response.data;

        const foundDogs = await breeds.map(async (dog) => {
            const temperamentValue = dog.breeds[0]?.temperament;
            if (!temperamentValue) {
                console.log("El temperamento es undefined o null.");
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
    allDogs,
    dog,
    dogName,
    Temperamento
}
