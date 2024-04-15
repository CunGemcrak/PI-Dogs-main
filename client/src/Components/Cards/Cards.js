import React, { useEffect, useState } from 'react';
import Card from '../Card/Card.js';


import './Cards.css'
//mport Nohaydatos from '../../img/loading/imgloading.jpg'

//import { useSelector } from 'react-redux';


const Cards = ({ startIndex, endIndex, busqueda})=>{
   
    //const busqueda = useSelector((state) => state.allVideoGamer);
    const [existe, setExiste] = useState(false)

   useEffect(()=>{
  



    if(busqueda.length === 0){
        setExiste(false); // Si no hay datos, cambiar el estado a `false`
    } else {
        setExiste(true);
    }
    }, [busqueda])

            //console.log("Esta es la busqueda final del dispach"+ JSON.stringify(busqueda));

    return (
        <div className='containerCards'>
    {
                    existe === true
                    ?busqueda.slice(startIndex, endIndex).map((element, index) => (
                        <Card className="card"
                            key={index}
                           
                            code={element.code}
                            name={element.name}
                            life_span={element.life_span}
                            url={element.url}
                            weight = {element.weight}
                            temperament = {element.temperament}
                        />
                    ))
                    : null //<div className='verificar'>   <h1 className='sinJuego'> </h1>  <img className='imgSinjuego' src={Nohaydatos} alt='No se encontraron datos'/> </div> 

            }

        </div>
    )
}

export default Cards;