"use client"

import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { useCallback, useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { DataVisualization } from "@/components/data-visualization"
import { AnalysisResults } from "@/components/analysis-results"
import { Button } from "@/components/ui/button"
import { Download, LineChart, BarChart2, PieChart } from "lucide-react"
import { ChatInterface } from "@/components/chat-interface"

interface AnalysisResult {
  fileName: string
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
  visualizations: {
    timeSeriesData: any[]
    distributionData: any[]
    correlationMatrix: any[]
  }
}

export default function ToolsPage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, loading, router])

  const handleFileUpload = useCallback(async (files: File[]) => {
    setIsAnalyzing(true)
    try {
      const formData = new FormData()
      files.forEach(file => formData.append("files", file))
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      setAnalysisResults(data.results)
    } catch (error) {
      console.error("Error analyzing files:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-[#30D5C8]">Data Analysis Tools</h1>
            <p className="mt-2 text-foreground/70">
              Upload your data files for AI-powered analysis
            </p>
          </div>

          <FileUpload 
            onUpload={handleFileUpload}
            isLoading={isAnalyzing}
          />

          {analysisResults.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Analysis Results</h2>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Analysis
                </Button>
              </div>

              {analysisResults.map((result, index) => (
                <div 
                  key={index}
                  className="bg-black/30 border border-[#30D5C8]/20 rounded-lg p-6 space-y-6"
                >
                  <h3 className="text-lg font-semibold">{result.fileName}</h3>
                  
                  {/* Key Insights */}
                  <AnalysisResults 
                    insights={result.insights}
                    patterns={result.patterns}
                    predictions={result.predictions}
                  />

                  {/* Data Visualizations */}
                  <DataVisualization data={result.visualizations} />
                </div>
              ))}

              <ChatInterface />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
