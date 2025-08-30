import React from 'react'
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
import { useNavigate } from "react-router-dom";
import { FaRegTimesCircle } from "react-icons/fa";

function Failed() {
    const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[50vh]">
        <CardHeader className="flex flex-col justify-center items-center gap-2" >
          <FaRegTimesCircle className="h-20 w-20 text-red-500 mb-4 " />
          <CardTitle className="text-3xl font-['Test_Founders_Grotesk_X']">Payment Failed</CardTitle>
           <p className="text-xs text-justify " >Hey, seems like there was some trouble. Go to homepage and try again.</p>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full bg-[#6542E0] hover:bg-[#4f2bcf] cursor-pointer " onClick={()=>navigate("/")} >Go to Home</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Failed
