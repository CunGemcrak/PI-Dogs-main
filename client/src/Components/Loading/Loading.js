import './Loading.css'
import {Link} from 'react-router-dom'

const Loading = ()=>{
    return (
        <div className="Loadingcontainer">
        <h1>Henry Dogs</h1>
       
        <Link to='/home'><div className='botones'>home page...</div></Link>
    </div>
    )
}

export default Loading;