const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// import metodos controles een un solo documento 
//const {allDogs, dog, dogName, Temperamento} = require('../controllers/metodosGet')
const {busquedaDog} = require('../controllers/metodosPost')
const {allDogs}= require('../controllers/metodo_Alldogs')
const {dog}= require('../controllers/metodo_IDdog')
const {dogName}= require('../controllers/metodo_NameDog')
const {Temperamento}= require('../controllers/metodo_Temperament')



//import de los moduloes o controler por separado


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get('/dogs', allDogs);
router.get('/dogs/:idRaza', dog);
router.get('/dogs/name/:name', dogName);
router.get('/temperament', Temperamento);
router.post('/dogs', busquedaDog);


module.exports = router;
