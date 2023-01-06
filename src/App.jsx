import { useState } from 'react'
import './App.css'
import LoginPage from './AdminPages/LoginPage'
import Dashboard from './AdminPages/Dashboard/Dashboard'
import Home from './Pages/Home'
import NavBar from './Components/NavBar/NavBar'
import BlogPage from './Pages/BlogPage'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route ,Link} from "react-router-dom"
function App() {

  const count = useSelector(state => state.Red.isAuth)
  const [isAuth, setIsAuth] = useState(count);
  return (
    <div className="App">
    <BrowserRouter>
    <NavBar/>

    <Routes>
    <Route path='/' element={<Home/>} />
  
    <Route path='/admin' element={!isAuth ?  <LoginPage/> :<Dashboard />} />
    <Route path='/dashboard' element={isAuth ? <Dashboard />  :<LoginPage/>} />
    
    <Route path="/:id" element={<BlogPage/>} />

    
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
