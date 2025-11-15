'use client'

import { useState } from 'react'
import { Shield, FileCheck, Database, Link2, Lock, TrendingUp, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DIDManagement from '@/components/did-management'
import DataConnector from '@/components/data-connector'
import LoanBrowser from '@/components/loan-browser'
import LoanManager from '@/components/loan-manager'

interface BorrowerPortalProps {
  walletAddress: string
}

export default function BorrowerPortal({ walletAddress }: BorrowerPortalProps) {
  const [activeTab, setActiveTab] = useState('identity')

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Borrower Portal</h1>
        <p className="text-muted-foreground">Manage your identity, data sources, and loans</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="glass inline-flex w-full justify-start gap-1 overflow-x-auto border border-border/50 p-1 md:w-auto">
          <TabsTrigger value="identity" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Identity & DID</span>
            <span className="sm:hidden">Identity</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Data Sources</span>
            <span className="sm:hidden">Data</span>
          </TabsTrigger>
          <TabsTrigger value="browse" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Browse Loans</span>
            <span className="sm:hidden">Browse</span>
          </TabsTrigger>
          <TabsTrigger value="loans" className="gap-2">
            <Coins className="h-4 w-4" />
            <span className="hidden sm:inline">My Loans</span>
            <span className="sm:hidden">Loans</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="identity">
          <DIDManagement walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="data">
          <DataConnector walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="browse">
          <LoanBrowser walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="loans">
          <LoanManager walletAddress={walletAddress} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
