import './Form.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'

import {Alldogs, AllTemperamento} from '../../Redux/actions.js'
import validation from '../Validation/validation.js'
import { useSelector } from 'react-redux';

const Form = ()=>{
    const dispatch = useDispatch(); 
    const [errors, setErrors] = useState({});
    const [conname, setConname] =useState(40)
    const [altura, setAltura] =useState('')
    const [iniAltura, setIniAltura] =useState(0)
    const [finAltura, setFinAltura] =useState(0)
    const [pesokg, SetPesoKg] = useState('')
    const [pinicial, setPesoIni]  =useState(0)
    const [pesofin, setPesoFin] =useState(0)
    const [vida, setVida] = useState('')
    const [iniciovida, setInicioVida]=useState(0)
    const [finalvida, setFinalVida] = useState(0)
    const [conet, setConet] = useState(0)
    const [userDatatem, setUserDatatem] = useState({ Temperament: '' });
    const [temperTem, setTemperTem] = useState([]);
    const temperamento = useSelector((state) => state.temperamento)
    const [userData, setUserData]=useState({
        name:'',
        image:'',
    });
    
    const [dataquery, setDataQuery] = useState({})

    

    useEffect(() => {
        setAltura('de ' + iniAltura + '  a ' + finAltura);
        SetPesoKg('de ' + pinicial + 'a ' + pesofin);
        setVida('de ' + iniciovida + ' a ' + finalvida);
        setDataQuery({ 'name': userData.name, 'url': userData.image, 'life_span': vida, 'weight': pesokg, 'height': altura, 'temperament': temperTem });
    }, [iniAltura, finAltura, pinicial, pesofin, iniciovida, finalvida, vida, userData.name, userData.image, pesokg, altura, temperTem]);
    

    const handlChange = (event) =>{
       
        const { name, value } = event.target;

        if (name === 'name') {
            if (value.length<=40) {
                    setConname(40-value.length); // Actualizar conname con la nueva longitud
                }
        }



        setUserData({
            ...userData,
            [event.target.name]:event.target.value
        })

        setErrors(validation({
            ...userData,
            [event.target.name]:event.target.value
        }))

    }


    const handleGuardar =async (event)=>{
       // console.log("este es el data query"+JSON.stringify(dataquery))
        try {
            const endpoint = 'http://localhost:3001/dogs'
            const response = await axios.post(endpoint, dataquery)
           // console.log("revisando el query"+JSON.stringify(dataquery))
            alert(response.data.message)
            dispatch(Alldogs())
            dispatch(AllTemperamento())

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message
                alert(errorMessage) // Mostrar el mensaje de error al usuario
              } else {
             //   console.error('Error en la solicitud:', error) // Manejar otros tipos de errores
                alert('Error en la solicitud, consulte la consola para más detalles.')
              }
        }
       

    }


    const handlSeected = (event)=>{
        const {value, id}=event.target
        
                if((id==="final" && value !==0)){
                    if(value >= parseInt(iniAltura)){
                        setFinAltura(value)
                    }else{
                        setFinAltura('--')
                        alert("Altura maxima no puede ser menor a la altura minima")
                    }
                }
                if((id==="inicio")){
                    
                        setIniAltura(value)
                        setFinAltura(0)
                    }



                    if(id==="finalkg" && value !==0){
                        if(value >= parseInt(pinicial)){
                            setPesoFin(value)
                        }else{
                            setPesoFin('--')
                            alert("Peso maxima no puede ser menor al Peso minima")
                        }
                    }
                    if(id === "iniciokg"){
                        setPesoIni(value)
                        setPesoFin(0)
                    }



                    if(id==="finalvida" && value !==0){
                        if(value >= parseInt(iniciovida)){
                            setFinalVida(value)
                        }else{
                            setFinalVida('--')
                            alert("Años de vida mal selecionados")
                        }
                    }
                    if(id === "iniciovida"){
                        setInicioVida(value)
                        setFinalVida(0)
                    }

    }



const handleSelecTem = (event) => {
    const selectedTemperament = event.target.value;

    // Verificar si el temperamento ya está en el array
    if (temperTem.includes(selectedTemperament)) {
        // Mostrar mensaje de error o tomar la acción que desees
        setErrors({ ...errors, Temperament: 'El temperamento ya ha sido seleccionado' });
    } else {
        // Verificar la longitud del array
        if (temperTem.length >= 5) {
            // Mostrar mensaje de error si se excede el límite de 5 temperamentos
            setErrors({ ...errors, Temperament: 'Solo se admiten 5 temperamentos' });
        } else {
            // Agregar el temperamento al array si todo está correcto
            setTemperTem([...temperTem, selectedTemperament]);
            setUserDatatem({ ...userDatatem, Temperament: '' });
            // Actualizar el contador conet si es necesario
            setConet(conet + 1);
            // Limpiar el campo de entrada de temperamento
            setUserDatatem({ Temperament: '' });
            // Limpiar el mensaje de error si existía
            setErrors({ ...errors, Temperament: '' });
        }
    }
};

    const agregarTemperamento = () => {
        if (temperTem.length >= 5) {
          //  alert("Solo se admiten 5 temperamentos");
            setErrors({ ...errors, Temperament: 'Solo se admiten 5 temperamentos' });
        } else
        if (userData.Temperament && userData.Temperament.trim().length > 0 && temperTem.length < 5) {
            setTemperTem([...temperTem, userData.Temperament.trim()]);
            setUserDatatem({ ...userDatatem, Temperament: '' });
            // Actualizar el contador conet si es necesario
            setConet(conet + 1);
            userData.Temperament=''
        } else {
            // Establecer el mensaje de error en caso de que la condición no se cumpla
            setErrors({ ...errors, Temperament: 'El Temperamento debe tener entre 1 y 5 caracteres' });
        }
    };
    
    const eliminarTemperamento = (temperamento) => {
        const nuevosTemperamentos = temperTem.filter((temp) => temp !== temperamento);
        setTemperTem(nuevosTemperamentos);
        setConet(conet-1)
    };





    return (
    
        <div className="containerCreate">
                <div className="container_titulo"> 
                 <h1> Nuevo Dog</h1>
                </div>
              
                <form  onSubmit={handleGuardar}>
               <div className="contenedor_texto">
             
              
                    Raza: 
                    <input 
                            type="text" 
                            name="name" 
                            value={userData.name}
                            onChange={handlChange}
                            maxLength={40}
                            placeholder="Raza"
                            title='No Puede ser mayor a 40 caracteres'
                            /><label id='name_con'>quedan {conname} caracteres</label>
                            <br/>
                        <div>
                                {
                                                errors.name && <p className='error'>* {errors.name}</p>
                                            }
                                </div>
                        

                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                           height: 
                                      <select className="plegablefrom" id='inicio' name='inicio' onChange={handlSeected}>
                                         <option value="No">De</option>
                                         
                                             {
                                                Array.from({ length: 150 }, (_, index) => (
                                                    <option key={index} value={index}>{index}</option>
                                                ))
                                            }
                                         </select> 
                                         <label className='labeldosgs'>a</label>   
                                           
                                           <select className="plegablefrom" id='final' name='final' onChange={handlSeected}>
                                         <option value="No">De</option>
                                         
                                             {
                                                Array.from({ length: 150 }, (_, index) => (
                                                    <option key={index} value={index}>{index}</option>
                                                ))
                                            }
                                         </select>
                                        <label id='centimetros'>{altura } cm</label>
                          
    
                            <br/>
                            
                         

                    weight: <select className="plegablefrom" id='iniciokg' name='iniciokg' onChange={handlSeected}>
                                         <option value="No">De</option>
                                         
                                             {
                                                Array.from({ length: 150 }, (_, index) => (
                                                    <option key={index} value={index}>{index}</option>
                                                ))
                                            }
                                         </select> 
                                         <label className='labeldosgs'>a</label>   
                                           
                                           <select className="plegablefrom" id='finalkg' name='finalkg' onChange={handlSeected}>
                                         <option value="No">De</option>
                                         
                                             {
                                                Array.from({ length: 150 }, (_, index) => (
                                                    <option key={index} value={index}>{index}</option>
                                                ))
                                            }
                                         </select>
                                        <label id='centimetros'>{pesokg } kg</label>
                          
    
                           
                                            <br/>
                                            Life Span: <select className="plegablefrom" id='iniciovida' name='iniciovida' onChange={handlSeected}>
                                         <option value="No">De</option>
                                         
                                             {
                                                Array.from({ length: 150 }, (_, index) => (
                                                    <option key={index} value={index}>{index}</option>
                                                ))
                                            }
                                         </select> 
                                         <label className='labeldosgs'>a</label>   
                                           
                                           <select className="plegablefrom" id='finalvida' name='finalvida' onChange={handlSeected}>
                                         <option value="No">De</option>
                                         
                                             {
                                                Array.from({ length: 150 }, (_, index) => (
                                                    <option key={index} value={index}>{index}</option>
                                                ))
                                            }
                                         </select>
                                        <label id='centimetros'>{vida } años de vida</label>
                          
    
                         
                                            <br/>
                




                
                Imagen: 
                <input 
                type="text" 
                name="image" 
                value={userData.image}
                onChange={handlChange}
                placeholder="URL de Imagen"
                />
                <br/>
                <div>
                {
                                                errors.image && <p className='error'>* {errors.image}</p>
                                            }
                                            </div>
                </div>





                Temperament : 
                <br/>
                <div className='Selectedtem'>
                Selecciona  
                
                <select className="filtro"  onChange={handleSelecTem}>
                    <option value="No">Selecciona </option>
                            {
                        temperamento.map((element )=> (<option key={element.id}  value={element.name}>{element.name}</option>))
                    }
              </select>  o  digita
                <input 
                type="text" 
                name="Temperament" 
                value={userData.Temperament}
                onChange={handlChange}
                className='inputfrom'
                placeholder="Temperament"
                />
               {conet <=5
               ?<div className='addboton' onClick={agregarTemperamento}>Agregar</div> 
               :null
               }
                
                </div>
                <div className='error_temp'>
                {
                    errors.Temperament && <p className='error'>* {errors.Temperament}</p>
                }
                </div>
                <div >
                {temperTem.map((temperamento, index) => (
                    <div  className='listadoTem' key={index}>
                        {temperamento}
                        <div className='boton' onClick={() => eliminarTemperamento(temperamento)}>X</div>
                    </div>
                ))}
            </div>
                <br/>
               

                










               
               
               <div className="container_botones">
                <div className="boton_guardar" onClick={handleGuardar}>Guardar</div> 
                
    
               </div>
               </form>
    
        </div>)
    }

export default Form;