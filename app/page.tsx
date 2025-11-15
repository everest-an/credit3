'use client'

import { useState } from 'react'
import { Shield, Camera, Gift, Award, Sparkles, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import WalletConnect from '@/components/wallet-connect'
import ReputationDashboard from '@/components/reputation-dashboard'
import ReceiptScanner from '@/components/receipt-scanner'
import FeedbackRewards from '@/components/feedback-rewards'
import CreditAssessment from '@/components/credit-assessment'

export default function Home() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scanner' | 'feedback' | 'credit'>('dashboard')

  return (
    <main className="min-h-screen bg-background">
      <header className="glass sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground">
                <Shield className="h-5 w-5 text-background" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">credit3</span>
            </div>
            <WalletConnect 
              connectedWallet={connectedWallet}
              onConnect={setConnectedWallet}
            />
          </div>
        </div>
      </header>

      {!connectedWallet ? (
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Anonymous. Secure. Rewarding.</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl">
              <span className="text-balance">Privacy-First Loyalty Rewards</span>
            </h1>
            
            <p className="mb-12 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Build your reputation anonymously. Earn rewards for every purchase and feedback—all secured on the blockchain.
            </p>
            
            <div className="mb-12 grid gap-4 md:grid-cols-3">
              <Card className="glass-light border border-border/50 p-6 text-left transition-all hover:scale-[1.02]">
                <Award className="mb-3 h-8 w-8 text-foreground" />
                <h3 className="mb-2 font-semibold text-foreground">Anonymous Reputation</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Build your score without revealing identity</p>
              </Card>
              
              <Card className="glass-light border border-border/50 p-6 text-left transition-all hover:scale-[1.02]">
                <Camera className="mb-3 h-8 w-8 text-foreground" />
                <h3 className="mb-2 font-semibold text-foreground">Scan & Earn</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Upload receipts to claim instant rewards</p>
              </Card>
              
              <Card className="glass-light border border-border/50 p-6 text-left transition-all hover:scale-[1.02]">
                <Gift className="mb-3 h-8 w-8 text-foreground" />
                <h3 className="mb-2 font-semibold text-foreground">Token Rewards</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Get paid for your feedback and loyalty</p>
              </Card>
            </div>

            <WalletConnect 
              connectedWallet={connectedWallet}
              onConnect={setConnectedWallet}
              variant="hero"
            />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-8 flex gap-2">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('dashboard')}
              className="min-w-fit"
            >
              <Award className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'scanner' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('scanner')}
              className="min-w-fit"
            >
              <Camera className="mr-2 h-4 w-4" />
              Scan Receipt
            </Button>
            <Button
              variant={activeTab === 'feedback' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('feedback')}
              className="min-w-fit"
            >
              <Gift className="mr-2 h-4 w-4" />
              Earn Rewards
            </Button>
            <Button
              variant={activeTab === 'credit' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('credit')}
              className="min-w-fit"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Credit Score
            </Button>
          </div>

          <div className="mx-auto max-w-5xl">
            {activeTab === 'dashboard' && <ReputationDashboard walletAddress={connectedWallet} />}
            {activeTab === 'scanner' && <ReceiptScanner walletAddress={connectedWallet} />}
            {activeTab === 'feedback' && <FeedbackRewards walletAddress={connectedWallet} />}
            {activeTab === 'credit' && <CreditAssessment walletAddress={connectedWallet} />}
          </div>
        </div>
      )}
    </main>
  )
}
