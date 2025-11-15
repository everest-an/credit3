'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Coins, Calendar, TrendingUp, CheckCircle, Clock } from 'lucide-react'

interface LoanManagerProps {
  walletAddress: string
}

export default function LoanManager({ walletAddress }: LoanManagerProps) {
  const [activeLoans] = useState([
    {
      id: '1',
      product: 'Personal Loan - Standard',
      lender: 'Protocol Bank',
      principal: 15000,
      remaining: 12450,
      interestRate: 8.5,
      term: 36,
      monthlyPayment: 472,
      nextPayment: '2024-02-15',
      startDate: '2023-10-15',
      paymentsHistory: Array(4).fill({ date: '2024-01-15', amount: 472, status: 'paid' })
    }
  ])

  const [repaying, setRepaying] = useState<string | null>(null)

  const makePayment = (loanId: string) => {
    setRepaying(loanId)
    setTimeout(() => {
      setRepaying(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {activeLoans.length === 0 ? (
        <Card className="glass-light border border-border/50 p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Coins className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">No Active Loans</h3>
          <p className="text-sm text-muted-foreground">Browse available loan products to get started</p>
        </Card>
      ) : (
        activeLoans.map((loan) => {
          const progressPercent = ((loan.principal - loan.remaining) / loan.principal) * 100

          return (
            <Card key={loan.id} className="glass-light border border-border/50 p-6">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{loan.product}</h3>
                  <p className="text-sm text-muted-foreground">{loan.lender}</p>
                </div>
                <Badge variant="secondary" className="rounded-lg bg-green-600/10 px-3 py-1.5 text-green-600">
                  <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                  Active
                </Badge>
              </div>

              {/* Loan Details Grid */}
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Original Amount</p>
                  <p className="text-lg font-semibold text-foreground">${loan.principal.toLocaleString()}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Remaining</p>
                  <p className="text-lg font-semibold text-foreground">${loan.remaining.toLocaleString()}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Interest Rate</p>
                  <p className="text-lg font-semibold text-foreground">{loan.interestRate}% APR</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Monthly Payment</p>
                  <p className="text-lg font-semibold text-foreground">${loan.monthlyPayment}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Loan Progress</span>
                  <span className="font-medium text-foreground">{progressPercent.toFixed(1)}% paid</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>

              {/* Next Payment */}
              <div className="mb-4 rounded-lg border border-border/50 bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-foreground" />
                    <span className="text-sm font-medium text-foreground">Next Payment</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">${loan.monthlyPayment} USDC</span>
                </div>
                <p className="mb-3 text-xs text-muted-foreground">Due: {loan.nextPayment}</p>
                <Button
                  onClick={() => makePayment(loan.id)}
                  disabled={repaying === loan.id}
                  className="w-full"
                  size="sm"
                >
                  {repaying === loan.id ? 'Processing...' : 'Pay via Smart Contract'}
                </Button>
              </div>

              {/* Payment History */}
              <div>
                <p className="mb-3 text-sm font-medium text-foreground">Recent Payments</p>
                <div className="space-y-2">
                  {loan.paymentsHistory.slice(0, 3).map((payment, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 px-3 py-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        <span className="text-muted-foreground">{payment.date}</span>
                      </div>
                      <span className="font-medium text-foreground">${payment.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )
        })
      )}
    </div>
  )
}
