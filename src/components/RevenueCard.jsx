import React from 'react'
import { Card, CardContent } from './ui/card'
import { TrendingUp } from 'lucide-react'


function RevenueCard({title,value,icon:Icon,change}) {
  return (
    <Card className=" border-0 p-0 bg-gradient-to-tr from-[hsl(240_4%_16%)] to-[hsl(240_6%_20%)] " >
        <CardContent className="p-6" >
            <div className='flex items-center justify-between'>
            <div className='space-y-1'>
                <p className='text-sm text-zinc-300  font-medium  ' >{title}</p>
                <p className='text-3xl text-white font-bold  ' >{value}</p>
                <div className='flex items-center gap-1 ' >    
                 <TrendingUp className='h-4 w-4 text-green-600 ' />
                 <span className='text-sm text-green-600' >{change}% </span>
                 <span className='text-zinc-300' >from last period</span>
                </div>
            </div>
            
            <div className='p-3 rounded-lg bg-[hsl(0_70%_50%)]/20  text-[hsl(0_70%_50%)] ' >
            <Icon className='h-6 w-6' />
            </div>
            </div>

        </CardContent>
    </Card>
  )
}

export default RevenueCard
