import React, { useState } from 'react'
import Style from './Config.module.css'
import useAuth from '../../../hooks/useAuth'
import { Global } from '../../../helpers/Global';
import avatar  from '../../img/user.png'
import { SerealizeForm } from '../../../helpers/SerialiceForm';

export const Config = () => {

    const {auth, setAuth} = useAuth();
    
    const  [saved, setSaved] = useState ("not_sended");

    const updateUser = async (e) =>{
        e.preventDefault();

        // Token de autenticacion 

        const token = localStorage.getItem("token");


      //Recoger datos del formulario  
      let newDataUser=  SerealizeForm(e.target);

      //Borrar propiedad inecesaria
      delete newDataUser.file0;

      //Actualizar usuario en la base de datos 
      const request= await  fetch(Global.url + "user/update",{
         method: "PUT",
         body: JSON.stringify(newDataUser),
         headers:{
            "Content-Type":"application/json",
            "Authorization": token
         }
      })
      const data = await  request.json();

      if(data.status = "success" && data.user){
         delete data.user.password;

         setAuth(data.user)
         setSaved("saved")
      }else{
         setSaved("error");
      }

      //Subida de imagenes
      const fileInput = document.querySelector("#file");

      if(data.status = "success" && fileInput.files[0]){

         //Recoger imagen a subir
         const formData = new FormData();
         formData.append('file0', fileInput.files[0]);

         // Peticion para  enviar la imagen
         const uploadRequest = await fetch(Global.url + "user/upload",{
            method: "POST",
            body: formData,
            headers: {
               "Authorization": token
            }
         });
         const uploadData =  await uploadRequest.json();

         if(uploadData.status = "success" && uploadData.user){

            delete uploadData.user.password;

            setAuth(uploadData.user);           
            setSaved("saved");
         }else{
            setSaved("error");
         }
      }

    }
  return (
    <>
         {saved == "saved" ?<strong className={`${Style.alt} ${Style.altSvd}`} >Usuario Actualizado correctamente !!</strong>: ''}
         {saved == "error" ?<strong className={`${Style.alt} ${Style.altErr}`} >Usuario no se ha Actualizado !!</strong>: ''}
        <div className={Style.Cont}>
          <h1>Register</h1>
          <form className={Style.Form} onSubmit={updateUser} >
               <div className={Style.ContLab} >
                  <label htmlFor="name">Nombre</label>
                  <input type="text" name="name"  defaultValue={auth.name}/>
               </div>
               <div className={Style.ContLab} >
                  <label htmlFor="surname">Apellido</label>
                  <input type="text" name="surname"  defaultValue={auth.surname}  />
               </div>
               <div className={Style.ContLab} >
                  <label htmlFor="nick">Nick</label>
                  <input type="text" name="nick"  defaultValue={auth.nick}  />
               </div>
               <div className={Style.ContLab} >
                  <label htmlFor="bio">Bio </label>
                  <textarea name='bio' defaultValue={auth.bio} />
               </div>
               <div className={Style.ContLab} >
                  <label htmlFor="email">Correo electrónico </label>
                  <input type="email" name="email" defaultValue={auth.email} />
               </div>
               <div className={Style.ContLab} >
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" name="password"   />
               </div>
               <div>
                    <label htmlFor="file0">Avatar</label>
                    <div className={Style.contImg} >
                        {auth.image != "default.png" && <img src={Global.url+"user/avatar/"+ auth.image} alt="imagen.png" /> }
                        {auth.image == "default.png" && <img src={avatar} alt="imagen.png" /> }
                    </div>
                    <input type="file" name='file0' id='file' />

               </div>
                <input type="submit" value="Actualizar"  className={Style.Btn}/>
          </form>
      </div>
    
    </>
  )
}
