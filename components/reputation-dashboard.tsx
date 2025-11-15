'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Award, TrendingUp, Trophy, Star, Coins } from 'lucide-react'

interface ReputationDashboardProps {
  walletAddress: string
}

export default function ReputationDashboard({ walletAddress }: ReputationDashboardProps) {
  // Mock data - In production, fetch from blockchain
  const reputationScore = 2847
  const level = 'Gold'
  const nextLevelScore = 3000
  const progress = (reputationScore / nextLevelScore) * 100
  const tokenBalance = 456.78
  const recentActivities = [
    { type: 'Purchase', points: 50, date: '2 hours ago' },
    { type: 'Feedback', points: 25, date: '1 day ago' },
    { type: 'Receipt Scan', points: 100, date: '2 days ago' },
    { type: 'Feedback', points: 25, date: '3 days ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Reputation Score Card */}
      <Card className="glass-light overflow-hidden border border-border/50 p-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Reputation Score</p>
            <h2 className="text-5xl font-bold tracking-tight text-foreground">{reputationScore.toLocaleString()}</h2>
          </div>
          <Badge variant="secondary" className="rounded-lg bg-foreground px-3 py-1.5 text-sm text-background">
            <Trophy className="mr-1.5 h-3.5 w-3.5" />
            {level}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next tier: Platinum</span>
            <span className="font-medium text-foreground">{nextLevelScore - reputationScore} pts remaining</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-light border border-border/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <Coins className="h-5 w-5 text-foreground" />
          </div>
          <p className="mb-1 text-3xl font-bold tracking-tight text-foreground">{tokenBalance.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">RTC Tokens</p>
        </Card>

        <Card className="glass-light border border-border/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <TrendingUp className="h-5 w-5 text-foreground" />
          </div>
          <p className="mb-1 text-3xl font-bold tracking-tight text-foreground">+342</p>
          <p className="text-sm text-success">↑ 18% this month</p>
        </Card>

        <Card className="glass-light border border-border/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <Award className="h-5 w-5 text-foreground" />
          </div>
          <p className="mb-1 text-3xl font-bold tracking-tight text-foreground">147</p>
          <p className="text-sm text-muted-foreground">Total activities</p>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="glass-light border border-border/50 p-6">
        <h3 className="mb-6 text-lg font-semibold text-foreground">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between border-b border-border/30 pb-4 last:border-0 last:pb-0">
              <div>
                <p className="font-medium text-foreground">{activity.type}</p>
                <p className="text-sm text-muted-foreground">{activity.date}</p>
              </div>
              <span className="rounded-lg bg-muted px-3 py-1 text-sm font-medium text-foreground">
                +{activity.points}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
