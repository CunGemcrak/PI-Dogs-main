import { useEffect, useState } from 'react';
import './Home.css'

import izquieda from '../../img/desplazar/izquierda.png'
import derecha from '../../img/desplazar/derecha.png'
import estrella from '../../img/desplazar/image.png'

import buscando from '../../img/loading/loadingdog/image_processing20200701-12577-15bg800.gif'


import Cards from '../Cards/Cards';
import { useSelector } from 'react-redux';


const Home = ()=>{
    const busqueda= useSelector((state) => state.allDogs)
  //  const temperamento = useSelector((state) => state.temperamento)

//console.log(temperamento);

  //Estado de la pagina incial 
const storedStartIndex = parseInt(localStorage.getItem('startIndex')) || 0;
const storedEndIndex = parseInt(localStorage.getItem('endIndex')) || 15;
const storedPage = parseInt(localStorage.getItem('page')) || 1;

const [startIndex, setStartIndex] = useState(storedStartIndex)
const [endIndex, setEndIndex] = useState(storedEndIndex)
const [page, setPage ] = useState(storedPage)
const [ayuda, setAyuda] = useState(true)
 // const [loading, setLoading]= useState(true)
useEffect(() => {

    localStorage.setItem('startIndex', startIndex)
    localStorage.setItem('endIndex', endIndex)
    localStorage.setItem('page', page)
   
    if(busqueda.length < 15){
        setStartIndex(0)
        setEndIndex(15)
        setPage(1)
        }
        if(busqueda.length >0){
            setAyuda(false)
        }else{
            setAyuda(true)
        }
}, [startIndex, endIndex, page, busqueda.length]);





const handleNex = ()=>{
    //alert("Siguiente busqueda");

    if(endIndex < busqueda.length ){
        setStartIndex(startIndex + 15);
        setEndIndex(endIndex + 15);
        setPage(page+1)
    }else{
        setStartIndex(0);
        setEndIndex(15);
        setPage(1)
    }
}



const handleback = ()=>{
   // alert("Anterior ");
   const newStartIndex = Math.max(startIndex - 15, 0);
   setStartIndex(newStartIndex);
   setEndIndex(newStartIndex + 15);
   setPage( Math.max(page - 1, 1))
    
}

    return <div className="contenedorHome">
        {ayuda === true
        ?<img src={buscando} alt="dogs" className="ayuda"/>
        : <Cards className="containerHomeCard" startIndex={startIndex} endIndex={endIndex} busqueda={busqueda}/>
        }
        
        <div className="paginas">
                    <div>
                        {startIndex ?<img src={izquieda} alt="Anterior" className="anterior" onClick={handleback}/>:null}
                        <img src={estrella} alt="mario" className="estrella"/>
                                <label className="pagelabel">{ page }</label>
                        <img src={estrella} alt="mario" className="estrella"/>
                        <img src={derecha} alt="siguiente" className="siguiente" onClick={handleNex} />
                    </div>
                </div>
    </div>
}

export default Home;