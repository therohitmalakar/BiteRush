import React, { useState, useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

function Success() {
    const navigate = useNavigate()
    const [params] = useSearchParams();
    const [bill, setBill] = useState(null)

    useEffect(()=>{
      const sessionId = params.get("session_id");
      if(sessionId){
        fetch(`${import.meta.env.VITE_APP_URL}/user/bill?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => setBill(data));
      }
    },[])
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[50vh]">
        <CardHeader className="flex flex-col justify-center items-center gap-2" >
          <FaRegCheckCircle className="h-20 w-20 text-green-500 mb-4 " />
          <CardTitle className="text-3xl font-['Test_Founders_Grotesk_X']">Payment Successfull</CardTitle>
          <p className="text-xs " >Your payment has been successfully processed. Now you can go to the homepage & discover new products.</p>
          {bill? (
            <div className="mt-4 w-full p-4 border rounded  " >
              <h1 className="flex justify-center mb-2 font-['Test_Founders_Grotesk_X'] text-2xl  " >Thank You</h1>
              <h1 className="font-bold text-sm " >Bill Details:</h1>
              <p className="text-xs "><strong>Customer: </strong>{bill.customer.name }</p>  
              <p className="text-xs "><strong>Email: </strong>{bill.customer.email }</p> 
              <h2 className="mt-2 " ><strong>Items:</strong></h2>
              <ul>
                {bill.lineItems.map((item, i)=>(
                  <li className="text-sm" key={i} >
                    {item.quantity} x {item.name} - {item.price}
                  </li>
                  
                ))
                 }</ul> 
                 <h2 className="mt-2 font-semibold">
                  Total: ₹{bill.amountTotal} {bill.currency}
                 </h2>
            </div>
          ):(
            <p className="font-['Test_Founders_Grotesk_X']" >Loading Bill...</p>
          )}
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full bg-[#6542E0] hover:bg-[#4f2bcf] cursor-pointer " onClick={()=>navigate("/")} >Go to Home</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Success;
