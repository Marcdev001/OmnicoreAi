"use client"

import { useState } from "react"
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer 
} from "recharts"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DataVisualizationProps {
  data: {
    timeSeriesData: any[]
    distributionData: any[]
    correlationMatrix: any[]
  }
}

export function DataVisualization({ data }: DataVisualizationProps) {
  return (
    <Card className="p-6 bg-black/30 border-[#30D5C8]/20">
      <Tabs defaultValue="timeSeries" className="w-full">
        <TabsList className="grid w-full mb-6 grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0">
          <TabsTrigger value="timeSeries">Time Series</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="correlation">Correlation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeSeries">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data.timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" stroke="#30D5C8" opacity={0.7} />
              <YAxis stroke="#30D5C8" opacity={0.7} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(0,0,0,0.8)", 
                  border: "1px solid rgba(48,213,200,0.2)" 
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#30D5C8" 
                strokeWidth={2}
                dot={{ fill: "#30D5C8" }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="distribution">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data.distributionData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" stroke="#30D5C8" opacity={0.7} />
              <YAxis stroke="#30D5C8" opacity={0.7} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(0,0,0,0.8)", 
                  border: "1px solid rgba(48,213,200,0.2)" 
                }} 
              />
              <Legend />
              <Bar 
                dataKey="value" 
                fill="#30D5C8" 
                strokeWidth={2}
              />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="correlation">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(0,0,0,0.8)", 
                  border: "1px solid rgba(48,213,200,0.2)" 
                }} 
              />
              <Legend />
              <Pie 
                data={data.correlationMatrix} 
                dataKey="value" 
                nameKey="name" 
                fill="#30D5C8" 
                strokeWidth={2}
              />
            </PieChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
