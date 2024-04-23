const { JSON } = require('sequelize');
const { Dog, Temperaments} = require('../db.js')

/*
Imagen.*
Nombre.*
Altura.*
Peso.*
Años de vida.
temperament
*/
const busquedaDog = async (req, res)=>{
    const { name, url, height, weight, life_span, temperament, bred_for  } = req.body
   console.log('este es el query' + name + ' - ' + url + ' - '+ height + ' - ' +  weight + ' - ' + life_span + ' - '+ temperament + '-' + bred_for)


    try {
      //  console.log("entro al try");
        if(!name || !url || !height || !weight || !life_span || !temperament.length === 0 || !bred_for){
            return res.status(404).json({message: "Faltan datos"})
        }
     //   console.log("PAso el validar");
        if(url.length > 250){
            return res.status(404).json({message: "La url de la imagen es muy larga"})
        }
      //  console.log("PAso el tamaño de la imagen ");
        const consuldog = await Dog.findOne({ where: { name } });


       // console.log("consulto el Dogs");
        if (consuldog) {
            console.log("El dog ya existe");
            return res.status(400).json({ message: 'El nombre del Cachorro ya existe.' });
            }else{
                console.log("Se puede almacenar");
            

        const create = await Dog.create({
            name,
            url,
            height,
            weight,
            life_span,
            bred_for
        })
        console.log("Datos guardados correctamente");
       
        const prueba = temperament.join(', ');
        //console.log("ver la prueva"+ prueba);
        const temperamentosArray = prueba.split(',').map(t => t.trim()); // Divide la cadena de temperamentos en un array y elimina los espacios en blanco alrededor de cada temperamento

        temperamentosArray.map(async (temp) => {
        try {
            const [temper, created] = await Temperaments.findOrCreate({
                where: { name: temp },
                defaults: { name: temp }
            });
            if(temper){
                await create.addTemperaments(temper);
            }
        } catch (error) {
            
            console.error(`Error al guardar el temperamento "${temp}" en la base de datos:`, error);
        }
        });

        return res.status(201).json({ message: "Datos guardados correctamente" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

module.exports = {busquedaDog};
