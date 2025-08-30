import React, { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CiShoppingCart } from "react-icons/ci";
import { CartContext } from "@/features/CartContext";
import { RxCross2} from "react-icons/rx";
import { useStripe } from "@stripe/react-stripe-js";

function Cart({ onClose, isOpen }) {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [itemCounter, setItemCounter] = useState({});
  const maxItemCount = 50;
  const minItemCount = 1;

  const stripe = useStripe();

  const makePayment = async () =>{

    console.log("make payment",cartItems[0].item)

    const itemsWithQuant = cartItems.map((ci)=>{
      const product = ci.item;
      return{
        _id: product._id,
        name:product.name,
        price:product.price,
        image:product.imageUrl,
        quantity: itemCounter[product._id] || ci.quantity || 1
      }
      
    })

    const response = await fetch("http://localhost:8080/user/payment",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({products: itemsWithQuant})
    })

    const session = await response.json();
    await stripe.redirectToCheckout({sessionId: session.id})
  }

  const updateItemCount = (id, itemCount) =>{
    setItemCounter((prev)=>({
      ...prev,
      [id]: Math.max(minItemCount, Math.min(maxItemCount, itemCount))
    })
  )}

  const subTotal = cartItems.reduce((acc,ci)=>{
    const product = ci.item;
  const count = itemCounter[product._id] || ci.quantity || 1;
  return acc + (product.price || 0 )* count;
  },0)

  function limitDescription(text, wordLimit){
    if(!text) return ""
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0,wordLimit).join(" ")+ "..." : text;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
        <div className="mt-6 flex items-center gap-2 font-bold  font-['Neue_Montreal'] text-black ">
          <CiShoppingCart className="text-3xl   " />
          <h1 className="text-2xl">Your Cart</h1>
        </div>
        </DialogTitle>

        <div className="overflow-y-auto max-h-[50vh]" >
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((ci) => {
              const product = ci.item;
              const count = itemCounter[product._id] || ci.quantity || 1;
              return(
              <Card className="p-2 mb-2 gap-0">
                <div className="flex justify-end">
                  <RxCross2 onClick={()=>removeFromCart(product._id)} className="cursor-pointe text-zinc-600 hover:text-zinc-800  "  />
                  </div>
                <div className="flex gap-2 ">
                  <div className=" w-1/4  mb-12 aspect-[16/9] rounded-md overflow-hidden">
                    <img
                      className="h-full w-full object-cover rounded-xl"
                      src={`http://localhost:8080${product.imageUrl}`}
                      alt={product.name}
                    />
                  </div>

                  <div className=" gap-3 w-3/4 title flex flex-col pl-2 pr-2 ">
                    <div className=" name items-center justify-between ">
                      <h1 className="font-bold">{product.name}</h1>
                      <p>{limitDescription(product.description,10)}</p>
                    </div>

                    <div className="  w-full flex justify-between ">
                      <div className="increment p-1 rounded-md bg-[#F4F3F7] gap-3 flex items-center ">
                        <Button
                          className="bg-[#F4F3F7] text-xl  text-black hover:bg-white  "
                          onClick={() =>
                           updateItemCount(product._id, count-1 )
                          }
                        >
                          -
                        </Button>
                        <p className="">{count}</p>
                        <Button
                          className="bg-[#F4F3F7] text-xl text-black hover:bg-white"
                          onClick={() =>
                             updateItemCount(product._id, count+1 )
                          }
                        >
                          +
                        </Button>
                      </div>

                      <div className="flex flex-col items-end ">
                        <p className="totalPrice text-md font-bold text-[#f5b802] ">
                          ₹{product.price * count }
                        </p>
                        <p className="itemPrice">₹{product.price} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              )
             })
          )}
        </div>

        <div className="footer">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-bold " >₹{subTotal}</p>
          </div>

          <div className="flex justify-between">
            <h1>Total</h1>
            <h1 className="font-black" >₹{subTotal}</h1>
          </div>
        </div>
       
        <Button onClick={makePayment} name="Buy" className="bg-[#FFBC0D] cursor-pointer hover:bg-[#f5b802]">
          Proceed
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default Cart;
