'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, TrendingUp, Clock, Coins, Shield, Check } from 'lucide-react'

interface LoanBrowserProps {
  walletAddress: string
}

export default function LoanBrowser({ walletAddress }: LoanBrowserProps) {
  const [repsScore] = useState(650)
  const [generatingProof, setGeneratingProof] = useState<string | null>(null)
  const [appliedLoans, setAppliedLoans] = useState<string[]>([])

  const loanProducts = [
    {
      id: '1',
      name: 'Personal Loan - Standard',
      lender: 'Protocol Bank',
      amount: '5,000 - 25,000 USDC',
      interestRate: '8.5% APR',
      term: '12-36 months',
      minRepsScore: 600,
      requirements: ['Score > 600', 'DTI < 40%', 'Income verified']
    },
    {
      id: '2',
      name: 'Business Growth Loan',
      lender: 'Protocol Bank',
      amount: '10,000 - 100,000 USDC',
      interestRate: '10.2% APR',
      term: '24-60 months',
      minRepsScore: 700,
      requirements: ['Score > 700', 'DTI < 35%', 'Business verified']
    },
    {
      id: '3',
      name: 'Quick Cash Advance',
      lender: 'DeFi Lender Pool',
      amount: '1,000 - 5,000 USDC',
      interestRate: '12.5% APR',
      term: '3-12 months',
      minRepsScore: 550,
      requirements: ['Score > 550', 'Active wallet > 6mo']
    },
    {
      id: '4',
      name: 'Premium Credit Line',
      lender: 'Protocol Bank Elite',
      amount: '50,000 - 250,000 USDC',
      interestRate: '6.8% APR',
      term: '12-84 months',
      minRepsScore: 750,
      requirements: ['Score > 750', 'DTI < 30%', 'High income verified']
    }
  ]

  const generateZKProof = (loanId: string) => {
    setGeneratingProof(loanId)
    setTimeout(() => {
      setGeneratingProof(null)
      setAppliedLoans(prev => [...prev, loanId])
    }, 2500)
  }

  const isEligible = (minScore: number) => repsScore >= minScore

  return (
    <div className="space-y-6">
      {/* Eligibility Overview */}
      <Card className="glass-light border border-border/50 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">Your Loan Eligibility</h3>
            <p className="text-sm text-muted-foreground">Based on your $Reps$ Score: {repsScore}</p>
          </div>
          <Badge variant="secondary" className="rounded-lg bg-foreground px-3 py-1.5 text-background">
            <Shield className="mr-1.5 h-3.5 w-3.5" />
            ${repsScore}
          </Badge>
        </div>
      </Card>

      {/* Loan Products */}
      <div className="grid gap-4">
        {loanProducts.map((product) => {
          const eligible = isEligible(product.minRepsScore)
          const applied = appliedLoans.includes(product.id)
          const isGenerating = generatingProof === product.id

          return (
            <Card
              key={product.id}
              className={`glass-light border p-6 transition-all ${
                eligible ? 'border-border/50 hover:border-foreground/20' : 'border-border/30 opacity-60'
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                    {applied && (
                      <Badge variant="secondary" className="rounded bg-green-600/10 text-xs text-green-600">
                        <Check className="mr-1 h-3 w-3" />
                        Applied
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{product.lender}</p>
                </div>
                {!eligible && (
                  <Badge variant="secondary" className="rounded-lg bg-muted px-2 py-1 text-xs">
                    <Lock className="mr-1 h-3 w-3" />
                    Locked
                  </Badge>
                )}
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Coins className="h-3.5 w-3.5" />
                    Amount
                  </div>
                  <p className="text-sm font-medium text-foreground">{product.amount}</p>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Interest
                  </div>
                  <p className="text-sm font-medium text-foreground">{product.interestRate}</p>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Term
                  </div>
                  <p className="text-sm font-medium text-foreground">{product.term}</p>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Shield className="h-3.5 w-3.5" />
                    Min Score
                  </div>
                  <p className="text-sm font-medium text-foreground">{product.minRepsScore}</p>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-border/30 bg-muted/20 p-3">
                <p className="mb-2 text-xs font-medium text-foreground">ZKP Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {product.requirements.map((req, idx) => (
                    <Badge key={idx} variant="secondary" className="rounded text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              {eligible && !applied && (
                <Button
                  onClick={() => generateZKProof(product.id)}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Lock className="mr-2 h-4 w-4 animate-pulse" />
                      Generating ZK Proof...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Generate Proof & Apply
                    </>
                  )}
                </Button>
              )}

              {applied && (
                <div className="rounded-lg border border-green-600/30 bg-green-600/5 p-3 text-center text-sm text-green-600">
                  Application submitted with ZK Proof. Awaiting smart contract verification.
                </div>
              )}

              {!eligible && (
                <div className="rounded-lg border border-border/30 bg-muted/20 p-3 text-center text-sm text-muted-foreground">
                  Build your $Reps$ Score to {product.minRepsScore}+ to unlock this loan
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
