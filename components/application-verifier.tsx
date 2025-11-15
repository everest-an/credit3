'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Shield, ExternalLink } from 'lucide-react'

interface ApplicationVerifierProps {
  walletAddress: string
}

export default function ApplicationVerifier({ walletAddress }: ApplicationVerifierProps) {
  const [applications] = useState([
    {
      id: '1',
      walletAddress: '0x742d...9f3a',
      product: 'Personal Loan - Standard',
      amount: 15000,
      repsScore: 672,
      zkpStatus: 'verified',
      zkpProofs: ['Score > 600: TRUE', 'DTI < 40%: TRUE', 'Income verified: TRUE'],
      timestamp: '2024-01-15 14:32:08',
      autoApproved: true
    },
    {
      id: '2',
      walletAddress: '0x8b1c...4e2d',
      product: 'Premium Credit Line',
      amount: 75000,
      repsScore: 782,
      zkpStatus: 'verified',
      zkpProofs: ['Score > 750: TRUE', 'DTI < 30%: TRUE', 'High income verified: TRUE'],
      timestamp: '2024-01-15 15:18:42',
      autoApproved: true
    },
    {
      id: '3',
      walletAddress: '0x3f9a...7c6b',
      product: 'Business Growth Loan',
      amount: 45000,
      repsScore: 685,
      zkpStatus: 'pending',
      zkpProofs: [],
      timestamp: '2024-01-15 16:05:21',
      autoApproved: false
    }
  ])

  const getStatusBadge = (status: string, autoApproved: boolean) => {
    if (autoApproved) {
      return (
        <Badge variant="secondary" className="rounded bg-green-600/10 text-green-600">
          <CheckCircle className="mr-1 h-3 w-3" />
          Auto-Approved
        </Badge>
      )
    }
    if (status === 'verified') {
      return (
        <Badge variant="secondary" className="rounded bg-blue-600/10 text-blue-600">
          <CheckCircle className="mr-1 h-3 w-3" />
          ZKP Verified
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="rounded bg-yellow-600/10 text-yellow-600">
        <Clock className="mr-1 h-3 w-3" />
        Pending
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-light border border-border/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">Loan Applications</h3>
            <p className="text-sm text-muted-foreground">ZKP verification and automated approval status</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{applications.length}</p>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </div>
        </div>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} className="glass-light border border-border/50 p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h4 className="font-semibold text-foreground">{app.product}</h4>
                  {getStatusBadge(app.zkpStatus, app.autoApproved)}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono">{app.walletAddress}</span>
                  <span>•</span>
                  <span>{app.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Requested Amount</p>
                <p className="text-lg font-semibold text-foreground">${app.amount.toLocaleString()} USDC</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">$Reps$ Score</p>
                <p className="text-lg font-semibold text-foreground">{app.repsScore}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">ZKP Status</p>
                <p className="text-lg font-semibold capitalize text-foreground">{app.zkpStatus}</p>
              </div>
            </div>

            {app.zkpStatus === 'verified' && app.zkpProofs.length > 0 && (
              <div className="mb-4 rounded-lg border border-border/30 bg-muted/20 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-foreground" />
                  <p className="text-sm font-medium text-foreground">Smart Contract Verification Results</p>
                </div>
                <div className="space-y-2">
                  {app.zkpProofs.map((proof, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-foreground">{proof}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {app.autoApproved ? (
              <div className="rounded-lg border border-green-600/30 bg-green-600/5 p-3 text-center text-sm text-green-600">
                Loan automatically approved and deployed via smart contract
              </div>
            ) : app.zkpStatus === 'verified' ? (
              <div className="flex gap-3">
                <Button className="flex-1">Approve Loan</Button>
                <Button variant="outline" className="flex-1">Reject</Button>
              </div>
            ) : (
              <div className="rounded-lg border border-yellow-600/30 bg-yellow-600/5 p-3 text-center text-sm text-yellow-600">
                Waiting for ZKP verification from smart contract...
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
