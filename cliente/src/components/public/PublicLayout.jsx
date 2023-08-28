import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navpbc from "./navpbc/Navpbc"
import useAuth from '../../hooks/useAuth';


const PublicLayout = () => {

  const  {auth} = useAuth();

  return (
      <>
       <Navpbc/>

       <section>
        {!auth._id ?
           <Outlet/>
          :
          <Navigate to="/social" />
        }
       </section>
      </>
  )
}

export default PublicLayout