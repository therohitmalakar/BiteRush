import React, {createContext, useEffect, useState } from 'react'
import { useUser } from './UserContext';

export const CartContext = createContext();

export function CartProvider  ({children}) {

    const {user} = useUser();
    const [cartItems, setCartItems] = useState([])


    useEffect(()=>{ 
        if(!user?._id) return;

        fetch(`${import.meta.env.VITE_APP_URL}/user/${user._id}`)
        .then((res)=>{
            if(!res.ok) throw new Error("failed to fetch cart")
                return res.json();
            
        })
        .then((data) => setCartItems(data))
        .catch((err)=> console.error("error fetching cart",err) )
    },[user])


    const addToCart = async (itemId) =>{
        console.log("item id",itemId)
        if(!user?._id) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_URL}/user/${user._id}`,{
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({itemId: itemId._id}),
            })
            if(!res.ok) throw new Error("Failed to add item")
                const data = await res.json();
            setCartItems(data)
            console.log("data",data)
            
        } catch (error) {
            console.error("Error adding to cart",error)
        }  
    }

    const removeFromCart = async (itemId) =>{
        if(!user?._id) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_URL}/user/${user._id}/${itemId}`,{
                method: "DELETE",
            })
            if(!res.ok) throw new Error("Failed to remove item");
            const data = await res.json();
            setCartItems(data);
        } catch (error) {
            console.error("Error removing from cart:",error)
        }
    }
   
    return(
        <CartContext.Provider value={{addToCart, cartItems, removeFromCart}} >
            {children}
        </CartContext.Provider>
    )
}
