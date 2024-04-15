import './App.css';

import Home from './Components/Home/Home'
import Detail from './Components/Detail/Detail'
import Loading from './Components/Loading/Loading'
import Form from './Components/Form/Form'
import About from './Components/About/About'
import SearchBar from './Components/SearchBar/SearchBar';



import { Routes,Route, useLocation} from "react-router-dom";
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'



import { Alldogs,AllTemperamento } from './Redux/actions';





function App() {

  const location = useLocation()
  const dispatch = useDispatch()
useEffect(()=>{
try {
  dispatch(Alldogs())
  dispatch(AllTemperamento())
} catch (error) {
  console.error('Error al mostrar dogs:', error);
}
}, [dispatch]);


  return (
    <div className="App">
      {
      location.pathname !== '/'
        ?<SearchBar/>
        :null
      }
      <div className='container-top'>
      <Routes>
              <Route path='/' element={<Loading/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/detail/:id' element={<Detail/>}/>
              <Route path='/form' element={<Form/>}/>
              <Route path='/about' element={<About/>}/>
        
      </Routes>
      </div>
      
    </div>
  );
}

export default App;
