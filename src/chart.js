import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function PieRechartComponent (props) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
    return (
        <div>
            <PieChart width={730} height={300}>
                <Pie 
                    data={props.data} 
                    color="#000000" 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={120} 
                    fill="#8884d8" >
                    {
                        props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
}

export default PieRechartComponent;