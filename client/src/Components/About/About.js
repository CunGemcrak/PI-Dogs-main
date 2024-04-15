import {React} from "react";
import  "./About.css";
import imagenyo from '../../img/loading/yo3.jpg'


const About = ()=>{
    return(
        <div className="containerAbaut">
            
                <div>
                    
                    <div className="info">
                    <div>
                        <h1>Creador</h1>
                    </div>
                          <p>Nombre: Luis Alberto Buelvas Cogollo</p>
                          <h3>Titulos:</h3>
                          <p>Licenciado en informática y medios Audiovisuales</p>
                          <p>Magister en Educación</p>
                          <p>Estudiantes de Ingenieria de Sistemas</p>
                          <h3>Comunicate</h3>
                          <p>Corre personal: labc.1021@gmail.com</p>
                          <p>Whatsapp: 3175770713</p>
                          
                    </div>
                </div>



                <div className="divimagen">
                   
                   <img src={imagenyo} alt="Iamgen Creador Luis Buelvas" />
                </div>
              
        </div>
    )
}

export default About;