import {Link} from 'react-router-dom'
import './SearchBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { FiltroInput, OrderAZ, FiltertTemperamento,  Copydog, SeleccionaBD } from '../../Redux/actions'



const SearchBar = () =>{
  const dispatch = useDispatch();
  const temperamento = useSelector((state) => state.temperamento)

  const handleBusuqeda = (event)=>{
    const valor = event.target.value;
   // alert(valor)
    dispatch(FiltroInput(valor));
   
  }
  const handelAZfinal = (dato)=>{
    dispatch(OrderAZ(dato))

  }
  const handleTemperamento = (event) =>{
 
 const valor = event.target.value;
 
 if(valor === 'No'){
  dispatch(Copydog())
 }else {
 dispatch(FiltertTemperamento(valor))
 }
  }

  const handelAPI_BD = (valor) => {
    
   // alert("entro con" + valor)
    dispatch(SeleccionaBD(valor))
  }
    return <div className="container-SearchBar">
                <div className='logo'> </div>
                <Link to='/home'><div className='botones'>Home</div></Link>
                <Link to='/form'><div className='botones'>Formulario</div></Link>
                <Link to='/about'><div className='botones'>About</div></Link>
                 <div className='grupo'>
                    <input name='buscar_input' className='buscarinput' onChange={handleBusuqeda}/>
                       
                
                <select className='botonesTemperamento' onChange={handleTemperamento}>
                    <option value="No">Filtro Temperamento </option>
                            {
                        temperamento.map((element )=> (<option key={element.id}  value={element.name}>{element.name}</option>))
                    }
              </select>
                    </div>
                  <div className='grupo'>
                  <div className='botones' onClick={() => handelAPI_BD('API')}>API</div>
                  <div className='botones' onClick={() => handelAPI_BD('BD')}>BD</div>
                    <div className="botones"  onClick={() => handelAZfinal('A')}>A a la Z</div>
                    <div className="botones"  onClick={() => handelAZfinal('B')}>Z a la A</div>
                  </div>


           </div>
}

export default SearchBar;