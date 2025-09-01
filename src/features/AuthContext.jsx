
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUser = async ()=>{
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_URL}/user/me`,{
          method:"GET",
          credentials:"include"
        })

        if(res.ok){
          setIsLoggedIn(true);
        }else{
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.error("Auth check failed:",error)
        setIsLoggedIn(false)
      }
    }

  useEffect(()=>{
    checkUser();
  },[])

  const login = async () =>{
    
    setIsLoggedIn(true);
  }

  const logout = async () =>{
    try {
      await fetch(`${import.meta.env.VITE_APP_URL}/logout`,{
        method:"POST",
        credentials:"include"
      })
     
        setIsLoggedIn(false)
    } catch (error) {
      console.log("Logout failed:",error)
    }
       
   }
   

    return(
        <AuthContext.Provider value={{isLoggedIn,login,logout}}>
        {children}
        </AuthContext.Provider>
    )
}

