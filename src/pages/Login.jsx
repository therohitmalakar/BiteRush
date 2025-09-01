import React, { useContext, useState } from 'react'
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
import { AuthContext} from '@/features/AuthContext'
import { useUser } from '@/features/UserContext'

function Login() {

  const {login } = useContext(AuthContext);
  const {setUser} = useUser();
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    email:"",
    password:"",
  })

  const formHandler = (e) =>{
    const {name, value} = e.target;
    setLoginFormData({...loginFormData, [name]:value });
  };

  const handleLogin = async (e)=>{
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_APP_URL}user/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials: "include",
        body:JSON.stringify(loginFormData)
      })

      const data = await res.json();
      
      if(res.ok){
        alert(data.message);
        login();
        setUser(data.user);
        navigate("/")
      }
      else{
        console.error("login failed",data.message)
        alert(data.message);
      }
      
    } catch (error) {
      console.error("login error",error.message)
      alert("Something went wrong");
    }
  }



  return (
    <div className='flex justify-center items-center h-screen ' >
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={()=>navigate("/signup")} >Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={loginFormData.email}
                onChange={(e)=> formHandler(e)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input name="password" type="password" required value={loginFormData.password} 
              onChange={formHandler} />
            </div>
            <Button type="submit" className="w-full">
          Login
        </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        
      </CardFooter>
    </Card>
    </div>
  )
}

export default Login
