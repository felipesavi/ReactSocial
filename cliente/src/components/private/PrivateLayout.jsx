import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Sidebar from './sidebar/Sidebar';


const PrivateLayout = () => {

  const {auth, loading} =useAuth();

  if( loading){
    return <h1>Cargando...</h1>
  }else{

  return (
    <>
       <Sidebar/>
       <section>
        { auth._id ?
            <Outlet/>
          :
           <Navigate to="/login" />
        }
       </section>
      </>
  )
  }
}

export default PrivateLayout