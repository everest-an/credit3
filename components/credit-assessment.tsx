'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CreditCard, FileText, Link2, Database, Check, AlertCircle, TrendingUp, Building, Shield, Smartphone, Globe } from 'lucide-react'

interface CreditAssessmentProps {
  walletAddress: string
}

export default function CreditAssessment({ walletAddress }: CreditAssessmentProps) {
  const [linkedAccounts, setLinkedAccounts] = useState({
    bankCard: false,
    socialSecurity: false,
    thirdPartyApps: [] as string[],
    publicRecords: false
  })

  const [creditScore, setCreditScore] = useState(0)
  const [isAssessing, setIsAssessing] = useState(false)

  const calculateCreditScore = () => {
    setIsAssessing(true)
    setTimeout(() => {
      let score = 300
      if (linkedAccounts.bankCard) score += 200
      if (linkedAccounts.socialSecurity) score += 150
      if (linkedAccounts.thirdPartyApps.length > 0) score += linkedAccounts.thirdPartyApps.length * 50
      if (linkedAccounts.publicRecords) score += 100
      
      score += Math.floor(Math.random() * 50)
      
      setCreditScore(Math.min(score, 850))
      setIsAssessing(false)
    }, 2000)
  }

  const linkBankCard = () => {
    setLinkedAccounts(prev => ({ ...prev, bankCard: true }))
  }

  const linkSocialSecurity = () => {
    setLinkedAccounts(prev => ({ ...prev, socialSecurity: true }))
  }

  const linkThirdPartyApp = (appName: string) => {
    setLinkedAccounts(prev => ({
      ...prev,
      thirdPartyApps: [...prev.thirdPartyApps, appName]
    }))
  }

  const linkPublicRecords = () => {
    setLinkedAccounts(prev => ({ ...prev, publicRecords: true }))
  }

  const getCreditRating = (score: number) => {
    if (score >= 800) return { label: 'Excellent', color: 'text-green-600' }
    if (score >= 740) return { label: 'Very Good', color: 'text-green-500' }
    if (score >= 670) return { label: 'Good', color: 'text-blue-600' }
    if (score >= 580) return { label: 'Fair', color: 'text-yellow-600' }
    return { label: 'Poor', color: 'text-red-600' }
  }

  const rating = getCreditRating(creditScore)

  return (
    <div className="space-y-6">
      {creditScore > 0 && (
        <Card className="glass-light overflow-hidden border border-border/50 p-8">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="mb-2 text-sm text-muted-foreground">On-Chain Credit Score</p>
              <h2 className="text-5xl font-bold tracking-tight text-foreground">{creditScore}</h2>
              <p className={`mt-2 text-lg font-medium ${rating.color}`}>{rating.label}</p>
            </div>
            <Badge variant="secondary" className="rounded-lg bg-foreground px-3 py-1.5 text-sm text-background">
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              Verified
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Score range: 300-850</span>
              <span className="font-medium text-foreground">{((creditScore / 850) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={(creditScore / 850) * 100} className="h-1.5" />
          </div>

          <div className="mt-6 rounded-lg border border-border/50 bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <Building className="mt-0.5 h-5 w-5 text-foreground" />
              <div>
                <p className="mb-1 text-sm font-medium text-foreground">Shared with Partner Banks</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Your verified credit information is available to Protocol Bank and other partner institutions for automated lending decisions
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="glass-light border border-border/50 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Globe className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Connected Data Sources</h3>
            <p className="text-xs text-muted-foreground">Link your financial accounts for comprehensive credit assessment</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Bank Card Linking */}
          <div className="glass-light rounded-lg border border-border/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-foreground" />
                <h4 className="text-sm font-medium text-foreground">Bank Account API</h4>
              </div>
              {linkedAccounts.bankCard && <Check className="h-4 w-4 text-green-600" />}
            </div>
            
            {!linkedAccounts.bankCard ? (
              <>
                <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                  Connect to your bank to verify income statements, transaction history, and account age
                </p>
                <Button 
                  onClick={linkBankCard}
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  Connect Bank
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Monthly income</span>
                  <span className="font-medium text-foreground">$5,240</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Account age</span>
                  <span className="font-medium text-foreground">3.2 years</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Transaction health</span>
                  <span className="font-medium text-green-600">Good</span>
                </div>
              </div>
            )}
          </div>

          {/* Social Security */}
          <div className="glass-light rounded-lg border border-border/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-foreground" />
                <h4 className="text-sm font-medium text-foreground">Social Security Records</h4>
              </div>
              {linkedAccounts.socialSecurity && <Check className="h-4 w-4 text-green-600" />}
            </div>
            
            {!linkedAccounts.socialSecurity ? (
              <>
                <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                  Link employment history, benefits records, and contribution data
                </p>
                <Button 
                  onClick={linkSocialSecurity}
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  Connect SSN
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Employment</span>
                  <span className="font-medium text-foreground">Full-time</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Work history</span>
                  <span className="font-medium text-foreground">5+ years</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Contributions</span>
                  <span className="font-medium text-green-600">Regular</span>
                </div>
              </div>
            )}
          </div>

          <div className="glass-light rounded-lg border border-border/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-foreground" />
                <h4 className="text-sm font-medium text-foreground">Payment Apps API</h4>
              </div>
              {linkedAccounts.thirdPartyApps.length > 0 && (
                <Badge variant="secondary" className="rounded-lg px-2 py-0.5 text-xs">
                  {linkedAccounts.thirdPartyApps.length}
                </Badge>
              )}
            </div>
            
            {linkedAccounts.thirdPartyApps.length === 0 ? (
              <>
                <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                  Connect payment platforms to verify transaction patterns and payment reliability
                </p>
                <div className="space-y-1.5">
                  <Button 
                    onClick={() => linkThirdPartyApp('PayPal')}
                    variant="outline" 
                    size="sm"
                    className="w-full text-xs"
                  >
                    Connect PayPal
                  </Button>
                  <Button 
                    onClick={() => linkThirdPartyApp('Venmo')}
                    variant="outline" 
                    size="sm"
                    className="w-full text-xs"
                  >
                    Connect Venmo
                  </Button>
                  <Button 
                    onClick={() => linkThirdPartyApp('Cash App')}
                    variant="outline" 
                    size="sm"
                    className="w-full text-xs"
                  >
                    Connect Cash App
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                {linkedAccounts.thirdPartyApps.map((app, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border border-border/30 px-2.5 py-1.5">
                    <span className="text-xs text-foreground">{app}</span>
                    <Check className="h-3.5 w-3.5 text-green-600" />
                  </div>
                ))}
                {linkedAccounts.thirdPartyApps.length < 3 && (
                  <Button 
                    onClick={() => {
                      const apps = ['PayPal', 'Venmo', 'Cash App', 'Stripe']
                      const available = apps.filter(app => !linkedAccounts.thirdPartyApps.includes(app))
                      if (available.length > 0) linkThirdPartyApp(available[0])
                    }}
                    variant="ghost" 
                    size="sm"
                    className="w-full text-xs"
                  >
                    Add More
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Public Records */}
          <div className="glass-light rounded-lg border border-border/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-foreground" />
                <h4 className="text-sm font-medium text-foreground">Public Credit Records</h4>
              </div>
              {linkedAccounts.publicRecords && <Check className="h-4 w-4 text-green-600" />}
            </div>
            
            {!linkedAccounts.publicRecords ? (
              <>
                <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                  Access credit history, public records, and credit bureau data
                </p>
                <Button 
                  onClick={linkPublicRecords}
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  Authorize Access
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Credit inquiries</span>
                  <span className="font-medium text-foreground">2 (12mo)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Derogatory marks</span>
                  <span className="font-medium text-green-600">None</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Public records</span>
                  <span className="font-medium text-green-600">Clean</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="glass-light border border-border/50 p-6">
        <div className="flex items-start gap-3">
          <TrendingUp className="mt-1 h-5 w-5 text-foreground" />
          <div className="flex-1">
            <h3 className="mb-2 font-semibold text-foreground">Generate Credit Profile</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              credit3 aggregates your financial data from multiple sources to create a comprehensive, verified credit profile. This information is shared with partner banks like Protocol Bank to enable automated lending decisions through smart contracts.
            </p>
            
            <div className="mb-4 grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
              <div className={`rounded-lg border px-3 py-2 ${linkedAccounts.bankCard ? 'border-green-600/30 bg-green-600/10' : 'border-border/30'}`}>
                <span className={linkedAccounts.bankCard ? 'text-green-600' : 'text-muted-foreground'}>
                  Bank: {linkedAccounts.bankCard ? '✓' : '○'}
                </span>
              </div>
              <div className={`rounded-lg border px-3 py-2 ${linkedAccounts.socialSecurity ? 'border-green-600/30 bg-green-600/10' : 'border-border/30'}`}>
                <span className={linkedAccounts.socialSecurity ? 'text-green-600' : 'text-muted-foreground'}>
                  SSN: {linkedAccounts.socialSecurity ? '✓' : '○'}
                </span>
              </div>
              <div className={`rounded-lg border px-3 py-2 ${linkedAccounts.thirdPartyApps.length > 0 ? 'border-green-600/30 bg-green-600/10' : 'border-border/30'}`}>
                <span className={linkedAccounts.thirdPartyApps.length > 0 ? 'text-green-600' : 'text-muted-foreground'}>
                  Apps: {linkedAccounts.thirdPartyApps.length > 0 ? '✓' : '○'}
                </span>
              </div>
              <div className={`rounded-lg border px-3 py-2 ${linkedAccounts.publicRecords ? 'border-green-600/30 bg-green-600/10' : 'border-border/30'}`}>
                <span className={linkedAccounts.publicRecords ? 'text-green-600' : 'text-muted-foreground'}>
                  Records: {linkedAccounts.publicRecords ? '✓' : '○'}
                </span>
              </div>
            </div>

            <Button 
              onClick={calculateCreditScore}
              disabled={isAssessing}
              className="w-full"
            >
              {isAssessing ? 'Generating Profile...' : 'Generate Credit Profile'}
            </Button>

            {Object.values(linkedAccounts).every(v => !v || (Array.isArray(v) && v.length === 0)) && (
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-yellow-600/30 bg-yellow-600/10 p-3">
                <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-600" />
                <p className="text-xs text-yellow-600">
                  Connect at least one data source to generate your credit profile
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
