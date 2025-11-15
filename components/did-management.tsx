'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Award, TrendingUp, Check, ExternalLink, FileText } from 'lucide-react'

interface DIDManagementProps {
  walletAddress: string
}

export default function DIDManagement({ walletAddress }: DIDManagementProps) {
  const [hasDID, setHasDID] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [repsScore, setRepsScore] = useState(0)

  // Mock verifiable credentials
  const [credentials, setCredentials] = useState<Array<{
    type: string
    issuer: string
    issuedAt: string
    expiresAt: string
    verified: boolean
  }>>([])

  const mintDID = () => {
    setIsMinting(true)
    setTimeout(() => {
      setHasDID(true)
      setRepsScore(650)
      setCredentials([
        {
          type: 'IncomeStability',
          issuer: 'PlaidOracle',
          issuedAt: '2024-01-15',
          expiresAt: '2024-07-15',
          verified: true
        },
        {
          type: 'PaymentDiscipline',
          issuer: 'CreditOracle',
          issuedAt: '2024-01-15',
          expiresAt: '2025-01-15',
          verified: true
        }
      ])
      setIsMinting(false)
    }, 2000)
  }

  const calculateScoreBreakdown = () => {
    return [
      { label: 'Payment Discipline', weight: 40, score: 260 },
      { label: 'Income Stability', weight: 30, score: 195 },
      { label: 'Credit History', weight: 20, score: 130 },
      { label: 'Account Age', weight: 10, score: 65 }
    ]
  }

  return (
    <div className="space-y-6">
      {!hasDID ? (
        <Card className="glass-light border border-border/50 p-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground">
              <Shield className="h-8 w-8 text-background" />
            </div>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">Initialize Your DID</h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Create your Decentralized Identity to start building your anonymous reputation score and access lending opportunities
            </p>
            <Button onClick={mintDID} disabled={isMinting} size="lg" className="px-8">
              {isMinting ? 'Minting DID...' : 'Mint DID (0.001 ETH)'}
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Reps Score Dashboard */}
          <Card className="glass-light border border-border/50 p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="mb-2 text-sm text-muted-foreground">Anonymous Reputation Score</p>
                <h2 className="text-5xl font-bold tracking-tight text-foreground">${repsScore}</h2>
                <Badge variant="secondary" className="mt-3 rounded-lg bg-foreground px-3 py-1 text-background">
                  <Shield className="mr-1.5 h-3 w-3" />
                  DID Verified
                </Badge>
              </div>
              <div className="text-right">
                <p className="mb-1 text-xs text-muted-foreground">Your DID</p>
                <p className="font-mono text-xs text-foreground">
                  {walletAddress.substring(0, 10)}...{walletAddress.substring(walletAddress.length - 8)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall score: 0-1000</span>
                <span className="font-medium text-foreground">{((repsScore / 1000) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(repsScore / 1000) * 100} className="h-2" />

              <div className="mt-6 space-y-3">
                <p className="text-sm font-medium text-foreground">Score Composition</p>
                {calculateScoreBreakdown().map((item, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.label} ({item.weight}%)</span>
                      <span className="font-medium text-foreground">{item.score}</span>
                    </div>
                    <Progress value={item.weight} className="h-1" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Verifiable Credentials */}
          <Card className="glass-light border border-border/50 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">Verifiable Credentials</h3>
                <p className="text-sm text-muted-foreground">Your minted and verified credentials</p>
              </div>
              <Badge variant="secondary" className="rounded-lg">
                {credentials.length} Active
              </Badge>
            </div>

            <div className="space-y-3">
              {credentials.map((cred, index) => (
                <div key={index} className="glass-light rounded-xl border border-border/50 p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <FileText className="h-5 w-5 text-foreground" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{cred.type}</h4>
                          {cred.verified && (
                            <Badge variant="secondary" className="rounded bg-green-600/10 px-2 py-0.5 text-xs text-green-600">
                              <Check className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Issued by {cred.issuer}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Issued</p>
                      <p className="font-medium text-foreground">{cred.issuedAt}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expires</p>
                      <p className="font-medium text-foreground">{cred.expiresAt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
