import RevenueCard from '@/components/RevenueCard';
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { ShoppingBag, Users, IndianRupee, TrendingUp } from 'lucide-react';
import TodayChart from '@/components/TodayChart';

function Bill() {

  const [orders, setOrders] = useState([])
  const [selectedFilter, setSelectedFilter ] = useState("all")

  useEffect(()=>{
    const fetchOrders = async ()=>{
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_URL}/user/getOrder`);
        const data = await res.json();

        const reqData = data.map((order)=>({
          id:order._id.slice(-4),
          name:order.customer?.name,
          amountTotal:order.amountTotal,
          items:order.items,
          time:order.createdAt
        }))

        setOrders(reqData)
      } catch (error) {
        console.error("Error fetching orders",error)
      }
    }
    fetchOrders();
  },[])

  const dayFilter = [
    {label:"All",value:"all"},
    {label:"Today",value:"today"},
    {label:"This Week",value:"weel"},
    {label:"This Month",value:"month"},
  ];

  const handleFilter = (item) =>{
    setSelectedFilter(item)
  }

  const recentOrders = [
    {id:1,name:"Rohit",items:"burger,pizza",amount:"900",time:"20:00"},
    {id:1,name:"Rohit",items:"burger,pizza",amount:"900",time:"20:00"},
    {id:1,name:"Rohit",items:"burger,pizza",amount:"900",time:"20:00"},
    {id:1,name:"Rohit",items:"burger,pizza",amount:"900",time:"20:00"},
  ]

  return (
    <div className='h-screen flex flex-col gap-8 bg-zinc-900 p-8 overflow-scroll  ' >

        {/* dashboard heading and day filter */}
      <div className='flex  justify-between  ' >
        <div className='text-white ' >
          <h1 className='font-bold text-3xl'>DashBoard</h1>
          <p className='text-zinc-400' >Track your restaurant's performance </p>
        </div>

        <div className='flex justify-center items-center' >
          <div className='bg-zinc-800 flex items-center p-1 gap-2 rounded-lg' >
            {
              dayFilter.map((item)=>(
                <Button onClick={()=>handleFilter(item.value)} key={item.value} className={`bg-zinc-800 text-zinc-400  transition-all duration-200 hover:bg-zinc-700   hover:text-white  ${selectedFilter === item.value ? "bg-[hsl(0_70%_50%)] text-white ":"" } ` } >{item.label}</Button>
              ))
            }
          </div>
        </div>
      </div>

        {/* Revenue Div */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' >
        <RevenueCard title="Total Revenue" value={`₹4565`} change={12.5} icon={IndianRupee}/>
        <RevenueCard title="Total Orders" value={1243} change={8.2} icon={ShoppingBag}/>
        <RevenueCard title="Customers" value={982} change={42} icon={Users}/>
        <RevenueCard title="Avg Order Value" value={64} change={14} icon={TrendingUp}/>
      </div>

        {/* Graph and recent orders */}
      <div className='flex gap-6 pb-10  ' >
        <div className='w-[70%]' >
          <TodayChart/>
        </div>
        <div className='bg-gradient-to-tr from-[hsl(240_4%_16%)] to-[hsl(240_6%_20%)] w-[30%] rounded-2xl p-6' >
          <div className='w-full pb-6 ' >
          <h1 className='text-3xl text-white font-bold' >Recent Orders</h1>
          </div>

          <div className="data px-2 overflow-x-auto ">
          <div className=' max-h-[52vh] overflow-y-auto  ' >
            <table className='table-auto w-full' >
              <thead className='text-zinc-400 sticky top-0 bg-zinc-800 ' >
                <tr>
                  <th className='px-4 py-2' >Order Id</th>
                  <th className='px-4 py-2' >Customer</th>
                  <th className='px-4 py-2' >Items</th>
                  <th className='px-4 py-2' >Amount</th>
                  <th className='px-4 py-2' >Time</th>
                </tr>
              </thead>
              <tbody className='text-sm' >
                {
                  orders.map((order)=>(
                    <tr key={order.id} >
                      <td className='px-2 py-4 text-center text-white' >#{order.id}</td>
                      <td className='px-2 py-4 text-center text-zinc-400' >{order.name}</td>
                      <td className='px-2 py-4 text-center text-zinc-400 flex' >
                        {order.items.map((item)=>(
                          <div key={item._id} >{item.name},</div>
                      ))}
                      </td>
                      <td className='px-2 py-4 text-center text-white' >₹{order.amountTotal}</td>
                      <td className='px-2 py-4 text-center text-zinc-400' >{new Date(order.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</td>
                    </tr>
                  ) )
                }
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Bill
