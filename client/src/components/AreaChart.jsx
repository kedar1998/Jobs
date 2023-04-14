import React from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

const AreaCharts = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data} margin={{top: 50,}}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Area dataKey='count' fill='#bef8fd' type='monotone' />
        </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaCharts