import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState();

    const fetchUser = async () =>{
     
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_URL}/user/me`,{
          method: "GET",
          credentials:"include"
        }) 

        const data = await res.json();
        if(res.ok){
          setUser(data.user);
        }else{
          console.error(data.message);
          setUser(null)
        }
      } catch (error) {
        console.error("Error fetching user:",error);
       
      };
      
    }
    useEffect(()=>{
        fetchUser();
      },[])

  return (
    <UserContext.Provider  value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);
