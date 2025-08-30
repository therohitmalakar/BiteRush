
import {createBrowserRouter} from "react-router-dom"
import Login from './pages/login'
import Signup from './pages/Signup'
import { RouterProvider } from 'react-router'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Failed from './pages/Failed'
import Success from './pages/Success'
import Landing from "./components/Landing"

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<>
    <Navbar/>
    <Landing/>
    {/* <Hero/> */}
    </>,
  },
  {
    path:"/menu",
    element:<>
    <Hero/>
    </>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/failed",
    element:<Failed/>
  },
  {
    path:"/success",
    element:<Success/>
  }

])
function App() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)
  return (
    <>
    <Elements stripe={stripePromise} >
      <RouterProvider router={appRouter}/>
      </Elements>
    </>
  )
}

export default App
