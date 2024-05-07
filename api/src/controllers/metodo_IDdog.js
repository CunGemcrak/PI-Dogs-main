const { Dog, Temperaments} = require('../db.js')
const axios = require('axios')
const {URL2, APPI_KEY} = process.env;


const dog = async (req, res) =>{
    const idRaza = req.params.idRaza

    //console.log("Esta es la id Raza: "+idRaza);
    
    try {
        if (Number.isNaN(Number(idRaza))) {
           // console.log("Entro al id con api");
            const respinse = await axios.get(`${URL2}${idRaza}?api_key=${APPI_KEY}`)//`${URL2}/${idRaza}?api_key=${APPI_KEY}`)    
            let datos = respinse.data
           // const bd_dogs = Dog.findAll()
            //console.log("Direccion de Acceso"+JSON.stringify(datos))
            //
           // console.log("Solo API")
            return res.status(200).json({datos})
           
        }else{
           

            console.log("Entro al id con numero");
            const bd_dog = await Dog.findByPk(idRaza, {
                include: Temperaments
            });

            if (bd_dog) {
                let datos = bd_dog
             //   console.log("que tengo del db_dog" + JSON.stringify(datos))
                return res.status(200).json({ datos });
            } else {
                return res.status(404).json({ message: 'No se encontró el perro con el ID proporcionado' });
            }

        }
       
        
    
    } catch (error) {
            console.error(error)
            return res.status(500).json({message: error.message})
        } 

}
module.exports = {
    
    dog,
    
}
