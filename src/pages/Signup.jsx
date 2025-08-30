import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'


function Signup() {
    const navigate = useNavigate();

    const [signupFormData, setSignupFormData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    phone: null,
    address:""
  })

  const formHandler = (e)=>{
     const {name, value} = e.target;
     
    setSignupFormData({...signupFormData, [name]:value });
  }

  const handleSignup = async (e)=>{
    e.preventDefault();

    try {
        const res = await fetch("http://localhost:8080/user/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials: "include",
            body:JSON.stringify(signupFormData)
        })

        const data = await res.json();

        if(res.ok){
        alert(data.message);
        navigate("/");
      }
      else{
        console.error("signup failed",data.message)
        alert(data.message);
      }
    } catch (error) {
        console.error("signup error",error.message)
      alert("Something went wrong");
    }
  }
  

  return (
     <div className='flex justify-center items-center h-screen ' >
      <Card className="w-full max-w-sm">
      <CardHeader className="flex-col justify-center ">
        <CardTitle className="flex justify-center" >Create your account</CardTitle>
        <CardDescription>
          Enter your details below to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} >
          <div className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                value={signupFormData.name}
                onChange={(e)=> formHandler(e)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={signupFormData.email}
                onChange={(e)=> formHandler(e)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                name="phone"
                type="phone"
                placeholder="Phone Number"
                required
                value={signupFormData.phone}
                onChange={(e)=> formHandler(e)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                name="address"
                type="text"
                placeholder="Your Address"
                required
                value={signupFormData.address}
                onChange={(e)=> formHandler(e)}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input name="password" type="password" required value={signupFormData.password} 
              onChange={(e)=> formHandler(e)} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm password</Label>
              </div>
              <Input name="confirmPassword" type="password" required value={signupFormData.confirmPassword} 
              onChange={(e)=> formHandler(e)} />
            </div>
            <Button type="submit" className="w-full">
          Signup
        </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex">
          <p>Already have an account? Please login.</p>
          <Button variant="link" onClick={()=>navigate("/login")} >Login</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Signup
