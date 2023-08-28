import React from 'react'
import useAuth from '../../../hooks/useAuth'
import Style from './Sidebar.module.css'
import { Global } from '../../../helpers/Global';
import avatar from '../../img/user.png'
import Navpvt from '../navpvt/Navpvt';

const Sidebar = () => {
    const { auth, counters } = useAuth();

    console.log(auth, counters);
  return (
    <>
      <div className={Style.Cont}>
             <Navpvt/>
            <div className={Style.ContAvatar}>
               <div className={Style.Contitems}>
                   {auth.image != "default.png" && <img src={Global.url+"user/avatar/"+ auth.image} alt="imagen.png" /> }
                   {auth.image == "default.png" && <img src={avatar} alt="imagen.png" /> }
                 <div className={Style.txtName}>
                  <a>{auth.name} {auth.surname}</a>
                  <p>{auth.nick}</p>
                 </div>
               </div>
               <div className={Style.ContFollo}>
                  <div className={Style.ContFllItm}>
                      <a href="" className={Style.following__link}>
                          <span className={Style.following__title}>Siguiendo</span>
                          <span className={Style.following__number}>{counters.following}</span>
                      </a>
                  </div>
                  <div className={Style.ContFllItm}>
                      <a href="" className={Style.following__link}>
                          <span className={Style.following__title}>Seguidores</span>
                          <span className={Style.following__number}>{counters.followed}</span>
                      </a>
                  </div>
                  <div className={Style.ContFllItm}> 
                      <a href="#" className={Style.following__link}>
                          <span className={Style.following__title}>Publicaciones</span>
                          <span className={Style.following__number}>{counters.publications}</span>
                      </a>
                  </div>
               </div>
          </div>
      </div>
    </>
  )
}

export default Sidebar