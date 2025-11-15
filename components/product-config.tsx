'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit2, Archive, Shield } from 'lucide-react'

interface ProductConfigProps {
  walletAddress: string
}

export default function ProductConfig({ walletAddress }: ProductConfigProps) {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Personal Loan - Standard',
      minAmount: 5000,
      maxAmount: 25000,
      interestRate: 8.5,
      minTerm: 12,
      maxTerm: 36,
      minRepsScore: 600,
      zkpRequirements: ['Score > 600', 'DTI < 40%', 'Income verified'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Premium Credit Line',
      minAmount: 50000,
      maxAmount: 250000,
      interestRate: 6.8,
      minTerm: 12,
      maxTerm: 84,
      minRepsScore: 750,
      zkpRequirements: ['Score > 750', 'DTI < 30%', 'High income verified'],
      status: 'active'
    }
  ])

  const [showNewProduct, setShowNewProduct] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-light border border-border/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">Loan Products</h3>
            <p className="text-sm text-muted-foreground">Configure your lending products and risk parameters</p>
          </div>
          <Button onClick={() => setShowNewProduct(!showNewProduct)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Product
          </Button>
        </div>
      </Card>

      {/* New Product Form */}
      {showNewProduct && (
        <Card className="glass-light border border-border/50 p-6">
          <h4 className="mb-6 text-lg font-semibold text-foreground">Create New Loan Product</h4>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="productName" className="text-foreground">Product Name</Label>
              <Input id="productName" placeholder="e.g., Business Growth Loan" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="minRepsScore" className="text-foreground">Minimum $Reps$ Score</Label>
              <Input id="minRepsScore" type="number" placeholder="650" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="minAmount" className="text-foreground">Min Amount (USDC)</Label>
              <Input id="minAmount" type="number" placeholder="10000" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="maxAmount" className="text-foreground">Max Amount (USDC)</Label>
              <Input id="maxAmount" type="number" placeholder="100000" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="interestRate" className="text-foreground">Interest Rate (APR %)</Label>
              <Input id="interestRate" type="number" step="0.1" placeholder="9.5" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="term" className="text-foreground">Term Range (months)</Label>
              <div className="mt-1.5 flex gap-2">
                <Input type="number" placeholder="Min" />
                <Input type="number" placeholder="Max" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Label className="mb-3 text-foreground">ZKP Assertions (comma-separated)</Label>
            <Input placeholder="Score > 650, DTI < 35%, Monthly income > 3000" />
          </div>

          <div className="mt-6 flex gap-3">
            <Button className="flex-1">Create Product</Button>
            <Button variant="outline" onClick={() => setShowNewProduct(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {/* Existing Products */}
      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="glass-light border border-border/50 p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h4 className="text-lg font-semibold text-foreground">{product.name}</h4>
                  <Badge variant="secondary" className="rounded bg-green-600/10 text-xs text-green-600">
                    {product.status}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Archive className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Amount Range</p>
                <p className="text-sm font-medium text-foreground">
                  ${product.minAmount.toLocaleString()} - ${product.maxAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Interest Rate</p>
                <p className="text-sm font-medium text-foreground">{product.interestRate}% APR</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Term Range</p>
                <p className="text-sm font-medium text-foreground">
                  {product.minTerm}-{product.maxTerm} months
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Min $Reps$</p>
                <p className="text-sm font-medium text-foreground">{product.minRepsScore}</p>
              </div>
            </div>

            <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-foreground" />
                <p className="text-xs font-medium text-foreground">ZKP Requirements</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.zkpRequirements.map((req, idx) => (
                  <Badge key={idx} variant="secondary" className="rounded text-xs">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
