import './Styles/pagenotfound.css'
import { CgSmileSad } from "react-icons/cg";
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className='container'>
      <h1 className='h1-404'>4 <CgSmileSad className='icon' /> 4  - PAGE NOT FOUND.</h1>
      <p>The page you are looking for might have been removed or <br /> had it's name changed or it temporarily unavaible.</p>

      <Link to="/" ><button className='back-to-btn'>GO BACK TO LOGIN</button></Link>
    </div>
  )
}
