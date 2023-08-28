import React from 'react';
import { Routes, Route ,BrowserRouter, Navigate } from 'react-router-dom';
import PublicLayout from '../components/public/PublicLayout';
import Login from '../components/public/login/Login';
import Register from '../components/public/register/Register';
import PrivateLayout from '../components/private/PrivateLayout';
import { AuthProvider } from '../contex/AuthProvider';
import { Logout } from '../components/private/Logout';
import { Config } from '../components/private/config/Config';
import Feed from '../components/private/feed/Feed';


const Routing = () => {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path='/' element={<PublicLayout/>}>
                <Route index element={<Login/>} />
                <Route path='login' element={<Login/>}/>
                <Route path='registro' element={<Register/>}/>
            </Route>
            <Route path='/social' element={<PrivateLayout/>} >
                 <Route index element={<Feed/>} />
                <Route path='feed'    element={<Feed/>}/>
                <Route path='logout'  element={<Logout/>}/>
                <Route path='ajustes' element={<Config/>}/>
            </Route>
            <Route path='*'  element={<h1>Error 404</h1>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default Routing