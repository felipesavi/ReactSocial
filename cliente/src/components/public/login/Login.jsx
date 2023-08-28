import React, { useState } from 'react'
import Style from './Login.module.css'
import { useForm } from '../../../hooks/useForm'
import { Global } from '../../../helpers/Global';
import useAuth from '../../../hooks/useAuth';

const Login = () => {

  const { form, changed} = useForm({});
  const [saved, setSaved]= useState("not_sended");

  const  {setAuth} = useAuth();

  const loginUser =async(e)=>{
    e.preventDefault();

    let userToLogin = form;

    const request = await fetch(Global.url+'user/login',{
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers:{
        'Content-Type': 'application/json'
     }
    })

    const data = await request.json();

    if(data.status == "success"){

      localStorage.setItem("token", data.token);
      localStorage.setItem("user",JSON.stringify(data.user));

      setSaved("login")

      //Set datos en el auth
      setAuth(data.user);

      //Redireccion
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    }else{
      setSaved("error")
    }
  }

  return (
    <>
    {saved == "login" ?<strong className={`${Style.alt} ${Style.altSvd}`} >Usuario identificado correctamente !!</strong>: ''}
    {saved == "error" ?<strong className={`${Style.alt} ${Style.altErr}`} >Usuario no se ha  identificado !!</strong>: ''}
       <div className={Style.Cont} >
         <h1>Login</h1>
         <form onSubmit={loginUser}>
           <div className={Style.ContLab}>
              <label htmlFor="">Email</label>
              <input type="email" name='email' onChange={changed} />
           </div>
           <div className={Style.ContLab}>
              <label htmlFor="">Contraseña</label>
              <input type="password" name='password'onChange={changed} />
           </div>
            <input className={Style.Btn} type="submit"  value="Identificate"/>
         </form>

       </div>
    
    </>
  )
}

export default Login