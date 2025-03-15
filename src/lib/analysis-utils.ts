export function processTimeSeriesData(data: any[]): any[] {
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
