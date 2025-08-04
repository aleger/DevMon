import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
        throw new Error('No analysis generated')
      }

      return this.parseAnalysis(analysis)
    } catch (error) {
      console.error('AI analysis error:', error)
      throw new Error('Failed to analyze metrics')
    }
  }

  static async generateInsights(metrics: MetricData[]): Promise<string[]> {
    try {
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
        return []
      }

      return insights.split('\n').filter(line => line.trim().startsWith('-')).map(line => line.replace('- ', ''))
    } catch (error) {
      console.error('AI insights error:', error)
      return []
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
      // Extract JSON from the response
      const jsonMatch = analysis.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('No JSON found in analysis')
      }

      const predictions = JSON.parse(jsonMatch[0])
      return predictions.map((p: any) => ({
        type: p.type,
        title: p.title,
        description: p.description,
        confidence: p.confidence,
        severity: p.severity,
        recommendations: p.recommendations || []
      }))
    } catch (error) {
      console.error('Failed to parse AI analysis:', error)
      return []
    }
  }
} 