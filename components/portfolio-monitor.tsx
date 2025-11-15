'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, PieChart, Users } from 'lucide-react'

interface PortfolioMonitorProps {
  walletAddress: string
}

export default function PortfolioMonitor({ walletAddress }: PortfolioMonitorProps) {
  const portfolioStats = {
    totalLoaned: 2450000,
    activeLoans: 47,
    interestEarned: 124800,
    defaultRate: 1.2,
    avgRepsScore: 682
  }

  const riskDistribution = [
    { range: '750+', count: 12, percentage: 25.5, color: 'bg-green-600' },
    { range: '700-749', count: 18, percentage: 38.3, color: 'bg-blue-600' },
    { range: '650-699', count: 13, percentage: 27.7, color: 'bg-yellow-600' },
    { range: '600-649', count: 4, percentage: 8.5, color: 'bg-orange-600' }
  ]

  const recentActivity = [
    { type: 'approval', wallet: '0x742d...9f3a', amount: 15000, score: 672, date: '2024-01-15' },
    { type: 'repayment', wallet: '0x8b1c...4e2d', amount: 2400, score: 782, date: '2024-01-15' },
    { type: 'approval', wallet: '0x3f9a...7c6b', amount: 45000, score: 715, date: '2024-01-14' }
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-light border border-border/50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <p className="mb-1 text-2xl font-bold text-foreground">
            ${(portfolioStats.totalLoaned / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-muted-foreground">Total Loaned</p>
        </Card>

        <Card className="glass-light border border-border/50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <Users className="h-5 w-5 text-muted-foreground" />
            <Badge variant="secondary" className="rounded text-xs">{portfolioStats.activeLoans}</Badge>
          </div>
          <p className="mb-1 text-2xl font-bold text-foreground">{portfolioStats.activeLoans}</p>
          <p className="text-xs text-muted-foreground">Active Loans</p>
        </Card>

        <Card className="glass-light border border-border/50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <p className="mb-1 text-2xl font-bold text-foreground">
            ${(portfolioStats.interestEarned / 1000).toFixed(1)}K
          </p>
          <p className="text-xs text-muted-foreground">Interest Earned</p>
        </Card>

        <Card className="glass-light border border-border/50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <TrendingDown className="h-4 w-4 text-green-600" />
          </div>
          <p className="mb-1 text-2xl font-bold text-foreground">{portfolioStats.defaultRate}%</p>
          <p className="text-xs text-muted-foreground">Default Rate</p>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card className="glass-light border border-border/50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">Risk Distribution by $Reps$ Score</h3>
            <p className="text-sm text-muted-foreground">Portfolio breakdown across credit tiers</p>
          </div>
          <PieChart className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="space-y-4">
          {riskDistribution.map((tier, idx) => (
            <div key={idx}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${tier.color}`} />
                  <span className="font-medium text-foreground">Score {tier.range}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{tier.count} loans</span>
                  <span className="font-semibold text-foreground">{tier.percentage}%</span>
                </div>
              </div>
              <Progress value={tier.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-light border border-border/50 p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  activity.type === 'approval' ? 'bg-green-600/10' : 'bg-blue-600/10'
                }`}>
                  {activity.type === 'approval' ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium capitalize text-foreground">{activity.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.wallet} • Score: {activity.score}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="mb-1 text-sm font-semibold text-foreground">${activity.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
