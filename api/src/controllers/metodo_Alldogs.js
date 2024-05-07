const { Dog, Temperaments} = require('../db.js')
const axios = require('axios')
const {URL, APPI_KEY} = process.env;

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





    //console.log("el dog encontrado dent4o de la api es"+ JSON.stringify(modifiedDogs));
    if(!modifiedDogs.length){
       // console.log("Solo API")
        return res.status(200).json({'api':datos})
    }
   // console.log("API and BD "+JSON.stringify(datos) + JSON.stringify(modifiedDogs))
    return res.status(200).json({'api':datos, 'bd':modifiedDogs})

    

} catch (error) {
        console.error(error)
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    allDogs,
 
}
