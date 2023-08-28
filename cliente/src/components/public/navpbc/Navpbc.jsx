import React from 'react'
import Style from './Navpbc.module.css'
import { Link } from 'react-router-dom'


const Navpbc = () => {
  return (
    <header className={Style.header} >
        <div>
            <h2>ReactSocial</h2>
        </div>
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/registro">Register</Link>
        </nav>
    </header>
  )
}

export default Navpbc