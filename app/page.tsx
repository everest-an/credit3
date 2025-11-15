'use client'

import { useState } from 'react'
import { Shield } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import WalletConnect from '@/components/wallet-connect'
import ReputationDashboard from '@/components/reputation-dashboard'
import ReceiptScanner from '@/components/receipt-scanner'
import FeedbackRewards from '@/components/feedback-rewards'
import CreditAssessment from '@/components/credit-assessment'

export default function Home() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)

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
              <Shield className="h-3.5 w-3.5" />
              <span>Privacy-First Credit Information</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl">
              <span className="text-balance">Build Your On-Chain Credit Profile</span>
            </h1>
            
            <p className="mb-12 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Connect your financial data sources. Build verifiable reputation. Provide trusted credit information to partner banks.
            </p>

            <WalletConnect 
              connectedWallet={connectedWallet}
              onConnect={setConnectedWallet}
              variant="hero"
            />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="reputation" className="mx-auto max-w-6xl">
            <TabsList className="glass-light mb-8 grid w-full grid-cols-4 rounded-xl border border-border/50 p-1">
              <TabsTrigger value="reputation" className="rounded-lg data-[state=active]:bg-foreground data-[state=active]:text-background">
                Reputation
              </TabsTrigger>
              <TabsTrigger value="credit" className="rounded-lg data-[state=active]:bg-foreground data-[state=active]:text-background">
                Credit Data
              </TabsTrigger>
              <TabsTrigger value="receipts" className="rounded-lg data-[state=active]:bg-foreground data-[state=active]:text-background">
                Receipts
              </TabsTrigger>
              <TabsTrigger value="rewards" className="rounded-lg data-[state=active]:bg-foreground data-[state=active]:text-background">
                Rewards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reputation" className="mt-0">
              <ReputationDashboard walletAddress={connectedWallet} />
            </TabsContent>

            <TabsContent value="credit" className="mt-0">
              <CreditAssessment walletAddress={connectedWallet} />
            </TabsContent>

            <TabsContent value="receipts" className="mt-0">
              <ReceiptScanner walletAddress={connectedWallet} />
            </TabsContent>

            <TabsContent value="rewards" className="mt-0">
              <FeedbackRewards walletAddress={connectedWallet} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </main>
  )
}
