
import {createBrowserRouter} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import { RouterProvider } from 'react-router'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Failed from './pages/Failed'
import Success from './pages/Success'
import Landing from "./components/Landing"
import Bill from "./pages/Bill"
import AdminRoutes from "./features/AdminRoutes"

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<>
    <Navbar/>
    <Landing/>
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
    element:
    <Login/>
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
  },
  {
    path:"/dashboard",
    element:
    <AdminRoutes>
    <Navbar/>
    <Bill/>
    </AdminRoutes>

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
