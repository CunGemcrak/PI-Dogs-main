import img_mario from '../../img/loading/imgloading.jpg'
import { Link } from "react-router-dom"
import './Card.css'

const Card = (datos_card)=>{
    const {  code,  name,  url, temperament, weight} = datos_card;



    const urls = (imagen) => {
        const imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;
        return imageExtensions.test(imagen);
    };

console.log("El peso es " + weight);

return (<div className='principal' id={code}>
      <Link to={`/detail/${code}`} >
            <div className="containerCard">
            <img src={
                    urls(url)
                    ?url
                    :img_mario
                    } alt={name} className='imagendogs'/>
             <div className='submenuCard'>
                <div className='textocards'>{name }</div>
                <div className='textocards2'>Temperamento: {temperament}</div>
                <div className='textocards3'>Peso: {weight} kg</div> 
            </div>
            </div>
            </Link>

    </div>)
}
export default Card;