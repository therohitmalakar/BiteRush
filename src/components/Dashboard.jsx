import React, { useContext, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { CartContext } from "@/features/CartContext";
import { CiShoppingCart } from "react-icons/ci";
import { PiHamburger } from "react-icons/pi";
import { CiPizza } from "react-icons/ci";
import { GiBerriesBowl } from "react-icons/gi";
import { CiFries } from "react-icons/ci";
import { TbSalad } from "react-icons/tb";
import { RiDrinks2Line, RiShoppingCartLine } from "react-icons/ri";
import { LuDessert } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useStripe } from "@stripe/react-stripe-js";
import {motion, AnimatePresence} from "motion/react"

function Dashboard() {
  //Stripe
  const stripe = useStripe();

  //contexts
  const { addToCart } = useContext(CartContext);
  const { cartItems, removeFromCart } = useContext(CartContext);

  //States
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("burgers");
  const [showCart, setShowCart] = useState(false);
  const [itemCounter, setItemCounter] = useState({});

  //for handling count of items
  const maxItemCount = 50;
  const minItemCount = 1;

  // Stripe Payment Integration starts here
  const makePayment = async () => {
    

    const itemsWithQuant = cartItems.map((ci) => {
      const product = ci.item;
      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity: itemCounter[product._id] || ci.quantity || 1,
      };
    });

    const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: itemsWithQuant }),
    });

    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };
  //Stripe Payment End

  const sectionsRef = {
    burgers: useRef(null),
    pizza: useRef(null),
    pasta: useRef(null),
    snacks: useRef(null),
    meal: useRef(null),
    drinks: useRef(null),
    desserts: useRef(null),
  };

  //fetching items from the DB
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_URL}/user/getItem`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  
  const categoryName = [
    { id: 1, img: <PiHamburger />, name: "Burgers" },
    { id: 2, img: <CiPizza />, name: "Pizza" },
    { id: 3, img: <GiBerriesBowl />, name: "Pasta" },
    { id: 4, img: <CiFries />, name: "Snacks" },
    { id: 5, img: <TbSalad />, name: "Meal" },
    { id: 6, img: <RiDrinks2Line />, name: "Drinks" },
    { id: 7, img: <LuDessert />, name: "Desserts" },
  ];

  const handleCategory = (item) => {
    const category = item.name.toLowerCase();
    setSelectedCategory(category);
    sectionsRef[category.toLowerCase()].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const itemFilter = items.filter(
    (item) =>
      item.category &&
      item.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  function limitDescription(text, wordLimit) {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }

  const updateItemCount = (id, itemCount) => {
    setItemCounter((prev) => ({
      ...prev,
      [id]: Math.max(minItemCount, Math.min(maxItemCount, itemCount)),
    }));
  };

  const subTotal = cartItems.reduce((acc, ci) => {
    const product = ci.item;
    const count = itemCounter[product._id] || ci.quantity || 1;
    return acc + (product.price || 0) * count;
  }, 0);

  const handleAddToCart = (item) =>{
    addToCart(item);
    setShowCart(true)
  }


  return (
    <div className="flex">
      <motion.div  className="h-screen w-full pl-10 pr-10 mt-12 ">
        <div className="category mt-4 gap-4 grid grid-cols-7 ">
          {categoryName.map((item, index) => (
            <Card
              key={index}
              className={`pt-2 pb-2 pl-1 pr-1 shadow-md border-0 cursor-pointer text-white bg-[#d90429]  font-['Neue_Montreal transition-all duration-300 hover:scale-90 ']`}
            >
              <div
                onClick={() => handleCategory(item)}
                className="flex justify-center items-center gap-1"
              >
                <p>{item.img}</p>
                <p>{item.name}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* section */}
        <div className="pb-32">
          {categoryName.map((cat) => (
            <div key={cat.id} ref={sectionsRef[cat.name.toLowerCase()]}>
              <div className="foodTitle flex justify-center font-gasoek text-white tracking-wide text-6xl mt-12">
                <h1>{cat.name.toUpperCase()}</h1>
              </div>
              <div className="card grid gap-6 grid-cols-1  md:grid-cols-3 lg:grid-cols-4 font-['Test_Founders_Grotesk_X'] pt-12 ">
                {items
                  .filter(
                    (item) =>
                      item.category &&
                      item.category.toLowerCase() === cat.name.toLowerCase()
                  )
                  .map((item, index) => (
                    <Card
                      key={index}
                      className=" bg-[#d90429] border-0  max-w-75 py-0  group rounded-2xl shadow-xl overflow-hidden gap-1 hover:text-[#ff9d00] transition-shadow duration-500 hover:shadow-2xl   "
                    >
                      <div className="flex aspect-[16/9] justify-center h-[30vh] overflow-hidden">
                        <img
                          className="h-full w-full object-cover  transition-transform duration-500 ease-in-out transform group-hover:scale-105 "
                          src={`${import.meta.env.VITE_APP_URL}${item.imageUrl}`}
                          alt={item.name}
                        />
                      </div>
                      <div className="title h-[12vh] flex gap-2 flex-col mt-2 mx-4 overflow-hidden">
                        <h1 className="font-bold tracking-wider text-white  text-3xl">
                          {item.name}
                        </h1>
                        <p className=" text-zinc-700 text-sm font-['Neue_Montreal'] ">
                          {limitDescription(item.description, 10)}
                        </p>
                      </div>

                      <div className="flex justify-between  items-center gap-4 mx-3 my-4 ">
                        <p className="price text-2xl tracking-wide font-bold text-white pl-1 ">
                          ₹{item.price}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            className="bg-zinc-900 text-white shadow-lg  rounded-lg h-full   font-bold cursor-pointer "
                            onClick={() => handleAddToCart(item)}
                          >
                            <RiShoppingCartLine />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* cart div */}
      <AnimatePresence>
      {showCart && (
        <motion.div initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }} className="cartDiv px-2 bg-white h-screen sticky top-0 w-[30%] ">
          <div className="my-6 flex justify-between items-center font-bold  font-['Neue_Montreal'] text-black ">
            <div className="flex gap-2 " >
            <CiShoppingCart className="text-3xl" />
            <h1 className="text-2xl">Your Cart</h1>
            </div>
            <h1 onClick={()=>setShowCart(false)} ><RxCross2/></h1>
          </div>
          
          <div className="flex flex-col gap-10" >
          <div className="overflow-y-auto border-1 rounded-md p-2 max-h-[65vh]">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((ci) => {
                const product = ci.item;
                const count = itemCounter[product._id] || ci.quantity || 1;
                return (
                  <Card className="p-2 mb-2 gap-0">
                    <div className="flex justify-end">
                      <RxCross2
                        onClick={() => removeFromCart(product._id)}
                        className="cursor-pointe text-zinc-600 hover:text-zinc-800  "
                      />
                    </div>
                    <div className="flex gap-2 ">
                      <div className=" w-1/4 rounded-md overflow-hidden">
                        <img
                          className="h-[50%] w-full object-cover rounded-xl"
                          src={`${import.meta.env.VITE_APP_URL}${product.imageUrl}`}
                          alt={product.name}
                        />
                      </div>

                      <div className=" gap-3 w-3/4 title flex flex-col pl-2 pr-2 ">
                        <div className=" name items-center justify-between ">
                          <h1 className="font-bold">{product.name}</h1>
                          <p className="text-xs" >{limitDescription(product.description, 10)}</p>
                        </div>

                        <div className=" w-full flex justify-between ">
                          <div className="increment px-1  rounded-md bg-[#F4F3F7] flex  items-center ">
                            <Button
                              className="bg-[#F4F3F7] py-0 text-lg  text-black hover:bg-white  "
                              onClick={() =>
                                updateItemCount(product._id, count - 1)
                              }
                            >
                              -
                            </Button>
                            <p className="px-1 text-xs ">{count}</p>
                            <Button
                              className="bg-[#F4F3F7]  py-0 text-lg text-black hover:bg-white"
                              onClick={() =>
                                updateItemCount(product._id, count + 1)
                              }
                            >
                              +
                            </Button>
                          </div>

                          <div className="flex flex-col items-end ">
                            <p className="totalPrice text-md font-bold text-[#ff0000] ">
                              ₹{product.price * count}
                            </p>
                            <p className="itemPrice">₹{product.price} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>

          {cartItems.length !== 0 &&
          <div className="footer ">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-bold ">₹{subTotal}</p>
            </div>

            <div className="flex justify-between">
              <h1>Total</h1>
              <h1 className="font-black">₹{subTotal}</h1>
            </div>
            <Button
            onClick={makePayment}
            name="Buy"
            className="bg-[#FF0000] mt-4 w-full cursor-pointer hover:bg-[#fe3e3e]">
            Proceed
          </Button>
          </div>
          }
          
          </div>

        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
