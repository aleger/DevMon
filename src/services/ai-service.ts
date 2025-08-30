import OpenAI from 'openai'

// Validate API key on startup
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY environment variable is not set')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000, // 30 second timeout
  maxRetries: 3, // Retry failed requests up to 3 times
})

export interface MetricData {
  type: string
  value: number
  date: string
  metadata?: any
}

export interface PredictionRequest {
  metrics: MetricData[]
  teamSize: number
  sprintDuration: number
  currentSprintProgress: number
}

export interface Prediction {
  type: 'SPRINT_SPILLOVER_RISK' | 'TEAM_BURNOUT_RISK' | 'DELIVERY_DELAY_RISK' | 'QUALITY_DEGRADATION_RISK' | 'CAPACITY_OVERLOAD_RISK'
  title: string
  description: string
  confidence: number
  severity: 'low' | 'medium' | 'high'
  recommendations: string[]
}

export class AIService {
  static async analyzeMetrics(data: PredictionRequest): Promise<Prediction[]> {
    try {
      // Validate input data
      if (!data || !data.metrics || data.metrics.length === 0) {
        throw new Error('Invalid input data: metrics array is required and cannot be empty')
      }

      if (!process.env.OPENAI_API_KEY) {
        console.error('OpenAI API key not configured')
        return this.getFallbackPredictions()
      }

      const prompt = this.buildAnalysisPrompt(data)
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert software engineering analyst specializing in developer productivity metrics. 
            Analyze the provided metrics and generate actionable insights and predictions about team performance, 
            sprint risks, and improvement opportunities. Be specific and provide concrete recommendations.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      })

      const analysis = response.choices[0]?.message?.content
      if (!analysis) {
        console.warn('No analysis content received from OpenAI')
        return this.getFallbackPredictions()
      }

      return this.parseAnalysis(analysis)
    } catch (error) {
      console.error('AI analysis error:', error)
      
      // Return fallback predictions instead of throwing
      return this.getFallbackPredictions()
    }
  }

  static async generateInsights(metrics: MetricData[]): Promise<string[]> {
    try {
      // Validate input
      if (!metrics || metrics.length === 0) {
        return ['No metrics data available for analysis']
      }

      if (!process.env.OPENAI_API_KEY) {
        return [
          'Metrics collection is active',
          'Configure AI analysis for detailed insights',
          'Review team performance trends manually'
        ]
      }

      const prompt = `Analyze these developer metrics and provide 3-5 key insights:
      
      ${metrics.map(m => `${m.type}: ${m.value} (${m.date})`).join('\n')}
      
      Provide insights in the format:
      - Insight 1
      - Insight 2
      - Insight 3`

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a software engineering productivity expert. Provide clear, actionable insights from metrics data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
      })

      const insights = response.choices[0]?.message?.content
      if (!insights) {
        return ['Unable to generate insights at this time']
      }

      const parsedInsights = insights.split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace('- ', '').trim())
        .filter(insight => insight.length > 0)

      return parsedInsights.length > 0 ? parsedInsights : ['Analysis completed but no specific insights generated']
    } catch (error) {
      console.error('AI insights error:', error)
      return ['Error generating insights - please try again later']
    }
  }

  private static buildAnalysisPrompt(data: PredictionRequest): string {
    const metricsSummary = data.metrics.map(m => `${m.type}: ${m.value}`).join(', ')
    
    return `Analyze the following developer metrics and generate predictions about potential risks and opportunities:

    Metrics: ${metricsSummary}
    Team Size: ${data.teamSize}
    Sprint Duration: ${data.sprintDuration} days
    Current Sprint Progress: ${data.currentSprintProgress}%

    Generate predictions in the following JSON format:
    [
      {
        "type": "SPRINT_SPILLOVER_RISK",
        "title": "High risk of sprint spillover",
        "description": "Detailed explanation of the risk",
        "confidence": 85,
        "severity": "high",
        "recommendations": ["Recommendation 1", "Recommendation 2"]
      }
    ]

    Focus on:
    1. Sprint completion risks
    2. Team burnout indicators
    3. Delivery timeline risks
    4. Quality concerns
    5. Capacity issues

    Be specific and provide actionable recommendations.`
  }

  private static parseAnalysis(analysis: string): Prediction[] {
    try {
      // Extract JSON from the response with better error handling
      const jsonMatch = analysis.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        console.warn('No JSON array found in AI response, using fallback')
        return this.getFallbackPredictions()
      }

      const predictions = JSON.parse(jsonMatch[0])
      
      // Validate parsed data structure
      if (!Array.isArray(predictions)) {
        console.warn('Parsed data is not an array, using fallback')
        return this.getFallbackPredictions()
      }

      return predictions.map((p: any) => ({
        type: p.type || 'SPRINT_SPILLOVER_RISK',
        title: p.title || 'Analysis Result',
        description: p.description || 'No description available',
        confidence: Math.max(0, Math.min(100, p.confidence || 50)), // Clamp between 0-100
        severity: ['low', 'medium', 'high'].includes(p.severity) ? p.severity : 'medium',
        recommendations: Array.isArray(p.recommendations) ? p.recommendations : []
      })).filter(p => p.title && p.description) // Filter out invalid entries
    } catch (error) {
      console.error('Failed to parse AI analysis:', error)
      return this.getFallbackPredictions()
    }
  }

  private static getFallbackPredictions(): Prediction[] {
    return [
      {
        type: 'SPRINT_SPILLOVER_RISK',
        title: 'Analysis Unavailable',
        description: 'AI analysis is currently unavailable. Please check your configuration.',
        confidence: 0,
        severity: 'low',
        recommendations: ['Check AI service configuration', 'Review metrics manually']
      }
    ]
  }
} 