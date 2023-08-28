import React, { useState } from 'react'
import Style from './Register.module.css'
import { useForm } from '../../../hooks/useForm'
import { Global } from '../../../helpers/Global'



const Register = () => {
   
   const { form, changed } = useForm({})
   const  [saved, setSaved] = useState("not_sended");

   const saveUser = async (e)=>{
      e.preventDefault();

      let newUser = form;

      const request = await fetch(Global.url+'user/register',{
         method: "POST",
         body: JSON.stringify(newUser),
         headers:{
            'Content-Type': 'application/json'
         }
      })

      const data = await request.json();
      console.log(data)
     
      if(data.status == "success"){
         setSaved("saved");
      }else{
         setSaved("error")
      }

   }

   
  return (
    <>
    
    {saved == "saved" ?<strong className={`${Style.alt} ${Style.altSvd}`} >Usuario registrado correctamente !!</strong>: ''}
    {saved == "error" ?<strong className={`${Style.alt} ${Style.altErr}`} >Usuario no se ha registrado !!</strong>: ''}
      <div className={Style.Cont}>
          <h1>Register</h1>
          <form className={Style.Form} onSubmit={saveUser} >
               <div className={Style.ContLab} >
                  <label htmlFor="name">Nombre</label>
                  <input type="text" name="name" onChange={changed} />
               </div>
               <div className={Style.ContLab} >
                  <label htmlFor="surname">Apellido</label>
                  <input type="text" name="surname"  onChange={changed} />
               </div>
               <div className={Style.ContLab} >
                  <label htmlFor="nick">Nick</label>
                  <input type="text" name="nick"  onChange={changed} />
               </div>
               <div className={Style.ContLab} >
                  <label htmlFor="email">Correo electrónico </label>
                  <input type="email" name="email" onChange={changed} />
               </div>
               <div className={Style.ContLab} >
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" name="password"  onChange={changed} />
               </div>
                <input type="submit" value="Registrate"  className={Style.Btn}/>
          </form>
      </div>
    </>
  )
}

export default Register