'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CreditCard, FileText, Link2, Database, Check, Loader2, ExternalLink } from 'lucide-react'

interface DataConnectorProps {
  walletAddress: string
}

export default function DataConnector({ walletAddress }: DataConnectorProps) {
  const [connectedSources, setConnectedSources] = useState<{
    [key: string]: {
      connected: boolean
      verifying: boolean
      verified: boolean
      data?: any
    }
  }>({
    bankAPI: { connected: false, verifying: false, verified: false },
    socialSecurity: { connected: false, verifying: false, verified: false },
    thirdPartyApps: { connected: false, verifying: false, verified: false },
    publicRecords: { connected: false, verifying: false, verified: false }
  })

  const connectSource = (source: string) => {
    setConnectedSources(prev => ({
      ...prev,
      [source]: { ...prev[source], connected: true, verifying: true }
    }))

    // Simulate Oracle verification
    setTimeout(() => {
      const mockData = {
        bankAPI: { avgIncome: 5240, accountAge: 3.2, txHistory: 'Good' },
        socialSecurity: { employmentStatus: 'Full-time', workHistory: '5+ years' },
        thirdPartyApps: { apps: ['PayPal', 'Venmo'], txVolume: 'High' },
        publicRecords: { inquiries: 2, derogatoryMarks: 0 }
      }

      setConnectedSources(prev => ({
        ...prev,
        [source]: {
          ...prev[source],
          verifying: false,
          verified: true,
          data: mockData[source as keyof typeof mockData]
        }
      }))
    }, 2500)
  }

  const dataSource = [
    {
      id: 'bankAPI',
      name: 'Bank Account (via Plaid)',
      description: 'Income statements & transaction history',
      icon: CreditCard,
      details: connectedSources.bankAPI.data
    },
    {
      id: 'socialSecurity',
      name: 'Social Security Records',
      description: 'Employment history & benefits verification',
      icon: FileText,
      details: connectedSources.socialSecurity.data
    },
    {
      id: 'thirdPartyApps',
      name: 'Third-Party Payment Apps',
      description: 'Utility bills, rent payments, digital wallets',
      icon: Link2,
      details: connectedSources.thirdPartyApps.data
    },
    {
      id: 'publicRecords',
      name: 'Public Credit Records',
      description: 'Credit history & public data verification',
      icon: Database,
      details: connectedSources.publicRecords.data
    }
  ]

  const totalConnected = Object.values(connectedSources).filter(s => s.verified).length
  const verificationProgress = (totalConnected / dataSource.length) * 100

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="glass-light border border-border/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">Data Sources Connected</h3>
            <p className="text-sm text-muted-foreground">Connect and verify your TradFi data sources</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{totalConnected}/{dataSource.length}</p>
            <p className="text-xs text-muted-foreground">Sources</p>
          </div>
        </div>
        <Progress value={verificationProgress} className="h-2" />
      </Card>

      {/* Data Sources */}
      <div className="grid gap-4 md:grid-cols-2">
        {dataSources.map((source) => {
          const status = connectedSources[source.id]
          const Icon = source.icon

          return (
            <Card key={source.id} className="glass-light border border-border/50 p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-foreground">{source.name}</h4>
                    <p className="text-xs leading-relaxed text-muted-foreground">{source.description}</p>
                  </div>
                </div>
                {status.verified && <Check className="h-5 w-5 text-green-600" />}
              </div>

              {!status.connected ? (
                <Button onClick={() => connectSource(source.id)} variant="outline" className="w-full" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Connect & Authorize
                </Button>
              ) : status.verifying ? (
                <div className="flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-muted/30 py-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Oracle verifying...
                </div>
              ) : status.verified && source.details ? (
                <div className="space-y-2 rounded-lg border border-green-600/30 bg-green-600/5 p-3">
                  {Object.entries(source.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium text-foreground">{String(value)}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </Card>
          )
        })}
      </div>

      {/* Oracle Status */}
      {totalConnected > 0 && (
        <Card className="glass-light border border-border/50 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
              <Shield className="h-5 w-5 text-background" />
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-foreground">Oracle Verification Complete</h4>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                Your data has been verified by decentralized oracles and is ready for ZK proof generation
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(connectedSources)
                  .filter(([_, status]) => status.verified)
                  .map(([source]) => (
                    <Badge key={source} variant="secondary" className="rounded-lg bg-green-600/10 text-green-600">
                      <Check className="mr-1 h-3 w-3" />
                      {source.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
