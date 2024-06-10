import hifive from '../images/hifive.png';
import './header.css';
import '../fonts/fonts.css';
import { Link } from 'react-router-dom';
import Main from './main/Main.js';


export default function App() {
  return (
    <div className="Header">
      <Link to="/Main"><img className="hifive" src={hifive} alt="logo" /></Link>
      <Link to="/Login">< button className="LoginBtn">Login</button></Link>
    </div>
  );
}