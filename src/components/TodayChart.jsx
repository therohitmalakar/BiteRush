import React from 'react'
import {ResponsiveContainer,LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip} from "recharts"


const timeRevenue = [
        {time:"10:00",revenue:"4000"},
        {time:"11:00",revenue:"5448"},
        {time:"12:00",revenue:"548"},
        {time:"13:00",revenue:"874"},
        {time:"14:00",revenue:"1844"},
        {time:"15:00",revenue:"7962"},
        {time:"16:00",revenue:"7617"},
        {time:"17:00",revenue:"4265"},
        {time:"18:00",revenue:"1124"},
        {time:"19:00",revenue:"1535"},
        {time:"20:00",revenue:"8824"}
    ]

    const formatCurrency =(v)=>`$${v.toLocaleString()}`;
function TodayChart({data = timeRevenue}) {
    
  return (
    <div className='w-full rounded-2xl p-6 text-white bg-gradient-to-tr from-[hsl(240_4%_16%)] to-[hsl(240_6%_20%)] ' >
        <h2 className='text-3xl font-semibold mb-4 ' >Today Revenue</h2>

        <div className="h-[380px]">
            <ResponsiveContainer>
                <LineChart data={data} margin={{top:10, rigth:20, bottom:10, left:60}} >
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
                    <XAxis dataKey="time" tick={{fill:"rgba(255,255,255,0.85)",dy:15}} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={formatCurrency}
                    tick={{fill:"rgba(255,255,255,0.85)",dx:-15}}
                    width={72}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, (max)=> Math.ceil(max/1000)*1000+1000]}
                    />
                    <Tooltip formatter={(v)=>[formatCurrency(v),"Revenue"]}
                    contentStyle={{background:"rgba(0,0,0,0.6)",
                        border:"1px solid rgba(255,255,255,0.1)",
                        borderRadius:"0.5rem",
                        color:"white"
                    }} labelStyle={{color:"white"}} />
                    <Line type="monotone" dataKey="revenue"
                    stroke='hsl(0 70% 50%)'
                    strokeWidth={4}
                    dot={{r:4, fill: "hsl(0 70% 50%)",strokeWidth:0}} activeDot={{r:6}} isAnimationActive />
                </LineChart>
            </ResponsiveContainer>
        </div>
      
    </div>
  )
}

export default TodayChart
