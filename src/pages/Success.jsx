import React from "react";
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
import { useNavigate } from "react-router-dom";

function Success() {
    const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[50vh]">
        <CardHeader className="flex flex-col justify-center items-center gap-2" >
          <FaRegCheckCircle className="h-20 w-20 text-green-500 mb-4 " />
          <CardTitle className="text-3xl font-['Test_Founders_Grotesk_X']">Payment Successfull</CardTitle>
          <p className="text-xs " >Your payment has been successfully processed. Now you can go to the homepage & discover new products.</p>
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
