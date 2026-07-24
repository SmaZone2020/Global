import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'

interface DimensionScores {
  demand: number
  cultureFit: number
  competition: number
  channelAccess: number
  compliance: number
  economics: number
}

interface MarketRadarProps {
  scores: DimensionScores
}

const dimensionLabels: Record<string, string> = {
  demand: '需求机会',
  cultureFit: '文化匹配',
  competition: '竞争空间',
  channelAccess: '渠道可达',
  compliance: '合规便利',
  economics: '经济性',
}

export default function MarketRadar({ scores }: MarketRadarProps) {
  const radarData = Object.entries(scores).map(([key, value]) => ({
    dimension: dimensionLabels[key] || key,
    score: value,
    fullMark: 100,
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#c9a96e20" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: '#1a1a2e80', fontSize: 11 }}
        />
        <Radar
          dataKey="score"
          stroke="#c9a96e"
          fill="#c9a96e"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
