import { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
import { useSelector, useDispatch } from 'react-redux'

import { BrowserRouter, Routes, Route ,NavLink} from "react-router-dom"
export default function NavBar() {
    const count = useSelector(state => state.Red.isAuth)
    const [isAuth, setIsAuth] = useState(count);
    const logOut=()=>{
        localStorage.clear()
        window.location.pathname = "/"
    }
  return (
   <div  className='navBar'>

   <NavLink to='/'>    <h1>Logo</h1></NavLink>
   <Nav className='navBar'>
   {isAuth? <NavLink  to='/admin'> Dashboard</NavLink>: null}
  {isAuth? <NavLink   onClick={logOut}> LogOut</NavLink>: <NavLink to='/admin'> Login</NavLink>}
   </Nav>
   </div>
  )
}
