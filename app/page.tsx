'use client'

import { useState } from 'react'
import { Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import WalletConnect from '@/components/wallet-connect'
import BorrowerPortal from '@/components/borrower-portal'
import LenderDashboard from '@/components/lender-dashboard'

export default function Home() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<'borrower' | 'lender' | null>(null)

  const handleRoleSelect = (role: 'borrower' | 'lender') => {
    setUserRole(role)
  }

  const handleBack = () => {
    setUserRole(null)
  }

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
            <div className="flex items-center gap-3">
              {connectedWallet && userRole && (
                <Button variant="ghost" onClick={handleBack} size="sm">
                  Switch Role
                </Button>
              )}
              <WalletConnect 
                connectedWallet={connectedWallet}
                onConnect={setConnectedWallet}
              />
            </div>
          </div>
        </div>
      </header>

      {!connectedWallet ? (
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span>Privacy-Preserving DeFi Lending</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl">
              <span className="text-balance">Anonymous Credit, Automated Lending</span>
            </h1>
            
            <p className="mb-12 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Build your on-chain reputation with zero-knowledge proofs. Access instant loans through smart contracts.
            </p>

            <WalletConnect 
              connectedWallet={connectedWallet}
              onConnect={setConnectedWallet}
              variant="hero"
            />
          </div>
        </div>
      ) : !userRole ? (
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground">
              Select Your Role
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <button
                onClick={() => handleRoleSelect('borrower')}
                className="glass-light group rounded-2xl border border-border/50 p-8 text-left transition-all hover:scale-[1.02] hover:border-foreground/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground transition-transform group-hover:scale-110">
                  <Shield className="h-6 w-6 text-background" />
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-foreground">Borrower</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Build your reputation, generate ZK proofs, and access instant loans through smart contracts
                </p>
              </button>

              <button
                onClick={() => handleRoleSelect('lender')}
                className="glass-light group rounded-2xl border border-border/50 p-8 text-left transition-all hover:scale-[1.02] hover:border-foreground/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground transition-transform group-hover:scale-110">
                  <Shield className="h-6 w-6 text-background" />
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-foreground">Lender</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Configure loan products, verify ZK proofs, and manage your lending portfolio automatically
                </p>
              </button>
            </div>
          </div>
        </div>
      ) : userRole === 'borrower' ? (
        <BorrowerPortal walletAddress={connectedWallet} />
      ) : (
        <LenderDashboard walletAddress={connectedWallet} />
      )}
    </main>
  )
}
