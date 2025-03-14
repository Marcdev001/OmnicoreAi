"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Brain, AlertTriangle } from "lucide-react"

interface AnalysisResultsProps {
  insights: string
  patterns: {
    correlations: any[]
    trends: any[]
    anomalies: any[]
  }
  predictions: {
    forecast: any[]
    confidence: number
  }
}

export function AnalysisResults({ insights, patterns, predictions }: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <Card className="p-6 bg-black/30 border-[#30D5C8]/20">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#30D5C8]" />
              Key Insights
            </h4>
            <p className="text-foreground/70">{insights}</p>
          </Card>
        </TabsContent>

        <TabsContent value="patterns">
          <Card className="p-6 bg-black/30 border-[#30D5C8]/20">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#30D5C8]" />
              Patterns & Trends
            </h4>
            <ul className="space-y-2">
              {patterns.trends.map((trend, index) => (
                <li key={index} className="text-sm text-foreground/70">
                  {trend}
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies">
          <Card className="p-6 bg-black/30 border-[#30D5C8]/20">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#30D5C8]" />
              Anomalies
            </h4>
            <ul className="space-y-2">
              {patterns.anomalies.map((anomaly, index) => (
                <li key={index} className="text-sm text-foreground/70">
                  {anomaly}
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
