
import React, { useState, useContext, useEffect } from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/features/AuthContext';
import { IoFastFoodSharp } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { useUser } from '@/features/UserContext';
import AddItem from './AddItem';
import Cart from './Cart';
import { CartContext } from '@/features/CartContext';

function Navbar({onSelect}) {
  const [addItem, setAddItem] = useState(false);
  const [cart, setCart] = useState(false);
  const navigate = useNavigate();
  const {isLoggedIn, logout} = useContext(AuthContext);
  const {user} = useUser();
  const {cartItems} = useContext(CartContext);

  
  
  
  return (
    
    <div className=' pt-3 pb-3 text-white bg-gradient-to-r from-[red] via-[#fe3232] to-[red] pl-6 pr-6 flex gap-2 sticky justify-between z-10' >
      <div className="logo pl-6 font-bold text-xl text-white ">
        <h1>BiteRush.</h1>
      </div>
      <div className="items flex gap-6  text-xl items-center ">
        
        {
          user?.role  === "admin" && isLoggedIn &&
           <IoFastFoodSharp  onClick={()=> setAddItem(true)} className='cursor-pointer ' />
        }
        <div className='flex' >

        <h1  className=' cart cursor-pointer ' ><CiShoppingCart onClick={()=> setCart(true)} />
        <Cart className="relative" isOpen={cart} onClose={()=> setCart(false)} />
        </h1>

        <div className= ' absolute top-3.5 right-40   bg-black p-1 rounded-full items-center justify-center w-4 h-4 flex' >
          <p className='object-contain text-[10px] text-white font-bold' >{cartItems.length}</p>
        </div>
        
        </div>
        <h1 className=' contact cursor-pointer  '><CiPhone /></h1>
        

        {!isLoggedIn ? (    
        <div className='flex gap-3' >
        <Button className="text-sm" onClick={()=>navigate("/login")} >Login</Button>
        <Button className="text-sm" onClick={()=>navigate("/signup")} >Signup</Button>
        </div> 
          ) : (
            <div>
              <Button onClick={logout} className=" cursor-pointer " >logout</Button>
            </div>
          )
       }
      </div>
      {
        addItem && <AddItem isOpen={addItem} onClose={()=> setAddItem(false)} />
      }
     

    </div>
  )
}

export default Navbar
