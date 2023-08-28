import React, { useState, useEffect, createContext } from 'react';
import { Global } from '../helpers/Global';

const  AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [ auth , setAuth] = useState({});
    const [ counters , setCounters] = useState({});
    const [loading, setLoading] = useState(true);
    

    useEffect(() =>{
        authUser();
    },[]);

    const authUser =  async() =>{
        // Sacar datos del usuario idenftificado
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        //comprobar si tenmos token y user

        if(!token || !user) {
            setLoading(false);
            return false;
        }
        //tranformar datos a un objeto de js
        const userObj = JSON.parse(user);
        const userId = userObj.id;

        //peticiones ajaz al backen que compruebe el token 
        const request = await fetch(Global.url+"user/profile/"+ userId,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        // peticion para los contadores
        const requestCounters = await fetch(Global.url+"user/counters/"+userId,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const dataCounters = await requestCounters.json();

        // Setear el estado auth
        setAuth(data.user);
        setCounters(dataCounters);
        setLoading(false);
    }
    

  return (<AuthContext.Provider
                value={{
                    auth,
                    setAuth,
                    counters,
                    loading,
                    setCounters
                }}
            >
        {children}
  </AuthContext.Provider>
  )
}

export default AuthContext;