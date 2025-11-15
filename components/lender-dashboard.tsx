'use client'

import { useState } from 'react'
import { Settings, CheckCircle, BarChart3, Vote } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProductConfig from '@/components/product-config'
import ApplicationVerifier from '@/components/application-verifier'
import PortfolioMonitor from '@/components/portfolio-monitor'

interface LenderDashboardProps {
  walletAddress: string
}

export default function LenderDashboard({ walletAddress }: LenderDashboardProps) {
  const [activeTab, setActiveTab] = useState('products')

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Lender Dashboard</h1>
        <p className="text-muted-foreground">Configure products, verify applications, and monitor portfolio</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="glass inline-flex w-full justify-start gap-1 overflow-x-auto border border-border/50 p-1 md:w-auto">
          <TabsTrigger value="products" className="gap-2">
            <Settings className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductConfig walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="applications">
          <ApplicationVerifier walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioMonitor walletAddress={walletAddress} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
