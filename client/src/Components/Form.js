import React, {useState} from 'react'
import './From.css'
import axios from 'axios'

//validaciond de datos

import validation from '../Validation/validation.js'

import { useDispatch } from 'react-redux'
import { busquedaAll } from '../../Redux/actions.js'





const Form = ()=>{

    const dispatch = useDispatch(); 
    const [errors, setErrors] = useState({});
    const [userData, setUserData]=useState({
        name:'', 
        description:'', 
        platforms:'', 
        image:'', 
        release_date:'', 
        rating:'', 
        genres:''
    });

    const handlChange = (event) =>{
     
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

    event.preventDefault(); //bloquea el recargar de la pagina 
  

try {
    const endpoint = 'http://localhost:3001/videogames/'
    const response = await axios.post(endpoint, userData)
    console.log(response.data.message)
    alert(response.data.message)
    dispatch(busquedaAll())
    handleLimpiar();


} catch (error) {
    console.error('Error al mostrar Juegos:', error);
    alert("Error al guardar la informacion")
    error.response.data.message !== undefined //|| error.response.data.message === true
    ? console.log(error.response.data.message)
    : console.log(error.response.data.error)
    

}



}

const handleLimpiar = () => {
    setUserData({
        name: '',
        description: '',
        platforms: '',
        image: '',
        release_date: '',
        rating: '',
        genres: ''
    });
    setErrors({});
}




   
    return (
    
    <div className="containerCreate">
            <div className="container_titulo"> 
             <h1> Nuevo Videojuego</h1>
            </div>
          
            <form  onSubmit={handleGuardar}>
           <div className="contenedor_texto">
         
          
                Nombre: 
                <input 
                        type="text" 
                        name="name" 
                        value={userData.name}
                        onChange={handlChange}
                        placeholder="Nombre del Viedogamer"
                        />
                      

                        <br/>
                        <div>
                        {
                                            errors.name && <p className='error'>* {errors.name}</p>
                                        }
                                        </div>
                                        <br/>
                Descripción: 
                <input 
                type="text" 
                name="description" 
                value={userData.description}
                onChange={handlChange}
                placeholder="Descriptions"
                />
                <div>
                   {
                                            errors.description && <p className='error'>* {errors.description}</p>
                                        }
                                        </div>
           
              
                <br/>
                Fecha de lanzamiento: 
                <input 
                type="text" 
                name="release_date"
                value={userData.release_date} 
                onChange={handlChange}
                placeholder="Fecha Publicado (AAAA/MM/DD)"
                />
                    <div>
                                {
                                            errors.release_date && <p className='error'>* {errors.release_date}</p>
                                        }
                                        </div>


                <br/>
         
                  Rating: 
                  <input 
                  type="text" 
                  name="rating" 
                  value={userData.rating}
                  onChange={handlChange}
                  placeholder="Rating"
                  />
            <br/>
            <div>
            {
                                            errors.rating && <p className='error'>* {errors.rating}</p>
                                        }
                                        </div>
                                        <br/>
            platforms: 
            <input 
            type="text" 
            name="platforms" 
            value={userData.platforms}
            onChange={handlChange}
            placeholder="Plataforms"
            />
            <br/>
            <div>
            {
                                            errors.platforms && <p className='error'>* {errors.platforms}</p>
                                        }
                                        </div>
                                        <br/>
            genres: 
            <input 
            type="text" 
            name="genres" 
            value={userData.genres}
            onChange={handlChange}
            placeholder="Genres"
            />
            <br/>
            <div>
            {
                                            errors.genres && <p className='error'>* {errors.genres}</p>
                                        }
                                        </div>
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
           
           <div className="container_botones">
            <button className="boton_guardar" onClick={handleGuardar}>Enviar</button> 
            <button className="boton_verificar" onClick={handleLimpiar}>Limpiar</button> 

           </div>
           </form>

    </div>)
}

export default Form