import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Add this import at the top
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files')

    // Process each file and analyze data
    const analysisResults = await Promise.all(
      files.map(async (file: any) => {
        const content = await file.text()
        let data
        
        try {
          // Parse file based on type
          if (file.name.endsWith('.csv')) {
            data = parseCSV(content)
          } else if (file.name.endsWith('.json')) {
            data = JSON.parse(content)
          } else {
            // For other file types, treat as plain text and structure it
            data = {
              content: content,
              type: 'text',
              lines: content.split('\n').filter((line: string) => line.trim()),
              length: content.length
            }
          }
        } catch (parseError) {
          console.error(`Error parsing file ${file.name}:`, parseError)
          throw new Error(`Unable to parse file ${file.name}. Please ensure it's properly formatted.`)
        }

        // Perform AI analysis using Gemini
        const analysis = await analyzeData(data)
        
        return {
          fileName: file.name,
          insights: analysis.insights,
          patterns: analysis.patterns,
          predictions: analysis.predictions,
          visualizations: analysis.visualizations
        }
      })
    )

    return NextResponse.json({ results: analysisResults })
  } catch (error) {
    console.error("Analysis Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze data" },
      { status: 500 }
    )
  }
}

async function analyzeData(data: any) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("API key not configured");
    }

    const prompt = `You are a data analysis AI. Analyze the following dataset and provide insights in JSON format.
    Return ONLY valid JSON with this exact structure, no other text:
    {
      "insights": "Brief summary of key findings",
      "correlations": [
        {"feature": "feature name", "coefficient": numeric value}
      ],
      "trends": ["trend 1", "trend 2"],
      "anomalies": ["anomaly 1", "anomaly 2"],
      "predictions": ["prediction 1", "prediction 2"],
      "confidence": 0.95
    }
    
    Dataset to analyze: ${JSON.stringify(data)}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.3, // Lower temperature for more structured output
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to analyze data");
    }

    const result = await response.json();
    
    if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response structure from AI");
    }

    // Clean the response text to ensure it's valid JSON
    const responseText = result.candidates[0].content.parts[0].text.trim();
    let analysis;
    try {
      // Clean markdown wrapper if present
      const cleanedText = responseText.replace(/```json\n|\n```/g, '').trim();
      analysis = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      // Backup attempt to extract JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        console.error("Original response:", responseText);
        throw new Error("Could not parse AI response as JSON");
      }
    }

    return {
      insights: analysis.insights || "No insights available",
      patterns: {
        correlations: analysis.correlations || [],
        trends: analysis.trends || [],
        anomalies: analysis.anomalies || []
      },
      predictions: {
        forecast: analysis.predictions || [],
        confidence: analysis.confidence || 0.95
      },
      visualizations: generateVisualizationData(data, analysis)
    }
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze data with AI");
  }
}

function parseCSV(content: string) {
  // CSV parsing logic
  return content.split('\n').map(row => row.split(','))
}

function extractPatterns(data: any) {
  // Pattern recognition logic
  return {
    correlations: [],
    trends: [],
    anomalies: []
  }
}

function generatePredictions(data: any) {
  // Prediction generation logic
  return {
    forecast: [],
    confidence: 0.95
  }
}

function generateVisualizationData(data: any, analysis: any) {
  return {
    timeSeriesData: processTimeSeriesData(data),
    distributionData: processDistributionData(data),
    correlationMatrix: processCorrelationData(analysis.correlations)
  }
}

// Update type definitions for data processing functions
function processTimeSeriesData(data: any[]): any[] {
  try {
    // Handle array data
    if (Array.isArray(data)) {
      return data.map((item, index) => ({
        name: `Point ${index + 1}`,
        value: typeof item === 'number' ? item : parseFloat(item) || 0
      }))
    }

    // Handle object data with timestamps
    if (typeof data === 'object') {
      return Object.entries(data).map(([key, value]) => ({
        name: key,
        value: typeof value === 'number' ? value : parseFloat(String(value)) || 0
      }))
    }

    return []
  } catch (error) {
    console.error("Error processing time series data:", error)
    return []
  }
}

// Distribution data processing
function processDistributionData(data: any[]): any[] {
  try {
    // Create frequency distribution
    const distribution = new Map<number | string, number>()
    
    const values = Array.isArray(data) 
      ? data 
      : Object.values(data)

    values.forEach(value => {
      const key = typeof value === 'number' ? value : String(value)
      distribution.set(key, (distribution.get(key) || 0) + 1)
    })

    return Array.from(distribution).map(([key, value]) => ({
      name: String(key),
      value: value
    })).sort((a, b) => b.value - a.value).slice(0, 10) // Top 10 most frequent values
  } catch (error) {
    console.error("Error processing distribution data:", error)
    return []
  }
}

// Correlation data processing
function processCorrelationData(correlations: Record<string, any>[]): any[] {
  try {
    if (!Array.isArray(correlations)) {
      return []
    }

    // Process correlations into pie chart format
    return correlations.map(correlation => ({
      name: correlation.feature || 'Unknown',
      value: Math.abs(correlation.coefficient || 0) * 100 // Convert to percentage
    })).sort((a, b) => b.value - a.value)
      .slice(0, 5) // Top 5 strongest correlations
  } catch (error) {
    console.error("Error processing correlation data:", error)
    return []
  }
}

// Data normalization helper
function normalizeValue(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const num = parseFloat(value)
    return isNaN(num) ? 0 : num
  }
  return 0
}

// Statistical analysis helpers
function calculateMean(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0) / values.length
}

function calculateStandardDeviation(values: number[], mean: number): number {
  const squareDiffs = values.map(value => Math.pow(value - mean, 2))
  return Math.sqrt(squareDiffs.reduce((sum, val) => sum + val, 0) / values.length)
}

function detectOutliers(values: number[]): number[] {
  const mean = calculateMean(values)
  const std = calculateStandardDeviation(values, mean)
  const threshold = 2 * std

  return values.filter(value => Math.abs(value - mean) > threshold)
}

// Data preprocessing helper
function preprocessData(data: unknown[]): number[] {
  return data
    .map(normalizeValue)
    .filter(value => !isNaN(value) && isFinite(value))
}

// Define interfaces for better type safety
interface AnalysisResult {
  insights: string;
  correlations: Array<{
    feature: string;
    coefficient: number;
  }>;
  trends: string[];
  anomalies: string[];
  predictions: any[];
  confidence: number;
}

interface VisualizationData {
  timeSeriesData: Array<{
    name: string;
    value: number;
  }>;
  distributionData: Array<{
    name: string;
    value: number;
  }>;
  correlationMatrix: Array<{
    name: string;
    value: number;
  }>;
}

// Export helper functions for reuse
export {
  processTimeSeriesData
}