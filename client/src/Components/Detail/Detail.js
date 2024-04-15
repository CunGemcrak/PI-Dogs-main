import './Detail.css'
import { useParams, Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

import imagennull from '../../img/ayuda/image.png'


const Detail = () => {
    const [dog, setDog] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = `http://localhost:3001/dogs/${id}`;
                const response = await axios.get(endpoint);
                const { datos } = response.data;

                setDog(datos);
                console.log("Datas: " + JSON.stringify(datos));
            } catch (error) {
                console.error('Error al mostrar Dog:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleImage = (img1) => {
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

        const isValid = (imagen) => {
            if (!imagen) return false;
            const lowerCaseUrl = imagen.toLowerCase();
            return imageExtensions.some(ext => lowerCaseUrl.endsWith(ext));
        };

        const img1Valid = isValid(img1);

        return img1Valid ? img1 : imagennull;
    };

    return <div className="containerDetail">
            <div className='izquierda'> { //
            }
            <img src={handleImage(dog.url)} alt={dog.name} className='imagen_dogs' />
            </div>
            <div className='derecha'>
                <div className='super_titulo'>
                    <div className='titulo'>
                        <h1>{dog.breeds?.[0]?.name  || dog.name} </h1>
                    </div>
                    <div className='cerrar'> 
                        <Link to={'/home'} >X</Link>
                    </div>
                </div>
                <div className='Gurpo_dogs'>
                id: {dog.id}
                <br/>
                breed group: {dog.breeds?.[0]?.breed_group || 'Base de Datos'}
                <br/>
                life span : {dog.breeds?.[0]?.life_span || dog.life_span + ' years'}
                </div>


                <div className='Gurpo_dogs'>
                temperament: <ul>
                    {dog.breeds?.[0]?.temperament?.split(',').map((temperamento, index) => (
                        <li key={index}>{temperamento.trim()}</li>
                    )) || dog.Temperaments?.map((temperament, index) => (
                        <li key={index}>{temperament.name}</li>
                    )) }
                </ul>
                </div>
                <div className='Gurpo_dogs'>Weight: 
                  <ul><li>imperial {dog.breeds?.[0]?.weight?.imperial || '--'} pulgadas</li>
                  <li>metric {dog.breeds?.[0]?.weight?.metric || dog.weight }centimetros</li>
                  </ul>
                </div>
                <div className='Gurpo_dogs'>height: 
                  <ul><li>imperial {dog.breeds?.[0]?.height?.imperial || '--'} pulgadas</li>
                  <li>metric {dog.breeds?.[0]?.height?.metric || dog.height } centimetros</li>
                  </ul>
                </div>

                <div className='Gurpo_dogs'>
                bred for: <ul>
                    {dog.breeds?.[0]?.bred_for?.split(',').map((bred_for, index) => (
                        <li key={index}>{bred_for.trim()}</li>
                    )) || 'No information available'}
                </ul>
                </div>


                {/* Otros datos que quieras mostrar */}
            </div>
        </div>

};
export default Detail;