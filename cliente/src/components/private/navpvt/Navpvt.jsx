import React from 'react'
import icoSalir from '../../img/icoSalir.png'
import icoAjustes from '../../img/icoAjustes.png'
import Style from './Navpvt.module.css'
import { Link, NavLink } from 'react-router-dom'
import avatar from '../..//img/user.png'
import { Global } from '../../../helpers/Global'
import useAuth from '../../../hooks/useAuth'

const Navpvt = () => {
  
  const { auth, counters } = useAuth();

  return (
    <header className={Style.header} >
        <div className={Style.Contnav}>
            <h2>ReactSocial</h2>
            <nav>
            <Link to="">Inicio</Link>
            <Link to="">Timeline</Link>
            <Link to="">Gente</Link>
          </nav>
        </div>
        <div className={Style.Contend}>
           <div>
            {auth.image != "default.png" && <img className={Style.imgnav}  src={Global.url+"user/avatar/"+ auth.image} alt="imagen.png" /> }
            {auth.image == "default.png" && <img className={Style.imgnav} src={avatar} alt="imagen.png" /> }
          </div>  
            <p className={Style.txt}>{auth.nick}</p>
            <NavLink  to='/social/ajustes/' className={Style.ajustes} >
             <img src={icoAjustes} alt=""/>
              <span>Ajustes</span>
            </NavLink>
            <NavLink to = '/social/logout' className={Style.salir} >
              <img src={icoSalir} alt=""/>
              <span>Cerrar sesion</span>
            </NavLink>
        </div>
        
    </header>
  )
}

export default Navpvt