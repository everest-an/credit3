'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera, Upload, CheckCircle2, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ReceiptScannerProps {
  walletAddress: string
}

export default function ReceiptScanner({ walletAddress }: ReceiptScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedReceipt, setScannedReceipt] = useState<{
    merchant: string
    amount: number
    date: string
    reward: number
  } | null>(null)
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsScanning(true)
    setTimeout(() => {
      const mockData = {
        merchant: 'Tech Store Plus',
        amount: 149.99,
        date: new Date().toLocaleDateString(),
        reward: 150,
      }
      setScannedReceipt(mockData)
      setIsScanning(false)
    }, 2500)
  }

  const handleClaimReward = () => {
    if (!scannedReceipt) return

    toast({
      title: 'Reward Claimed',
      description: `${scannedReceipt.reward} tokens sent to your wallet.`,
    })

    setTimeout(() => {
      setScannedReceipt(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="glass-light border border-border/50 p-8">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Scan Receipt</h2>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          Upload a receipt to verify your purchase and claim instant rewards.
        </p>

        {!scannedReceipt && !isScanning && (
          <div className="space-y-4">
            <label htmlFor="receipt-upload" className="block">
              <div className="group cursor-pointer rounded-2xl border-2 border-dashed border-border bg-muted/20 p-16 text-center transition-all hover:border-foreground/50 hover:bg-muted/30">
                <Upload className="mx-auto mb-4 h-10 w-10 text-muted-foreground transition-colors group-hover:text-foreground" />
                <p className="mb-2 font-medium text-foreground">Drop file here or click to browse</p>
                <p className="text-sm text-muted-foreground">PNG, JPG, PDF up to 10MB</p>
              </div>
              <input
                id="receipt-upload"
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full gap-2 border-border/50" disabled>
              <Camera className="h-4 w-4" />
              Take Photo (Coming Soon)
            </Button>
          </div>
        )}

        {isScanning && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="mb-4 h-10 w-10 animate-spin text-foreground" />
            <p className="text-lg font-medium text-foreground">Scanning receipt...</p>
            <p className="text-sm text-muted-foreground">Verifying purchase details</p>
          </div>
        )}

        {scannedReceipt && (
          <div className="space-y-6">
            <div className="flex items-center justify-center py-8">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>

            <div className="space-y-3 rounded-2xl border border-border/50 bg-muted/20 p-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Merchant</span>
                <span className="font-medium text-foreground">{scannedReceipt.merchant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium text-foreground">${scannedReceipt.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">{scannedReceipt.date}</span>
              </div>
              <div className="flex justify-between border-t border-border/50 pt-3">
                <span className="font-semibold text-foreground">Reward</span>
                <span className="text-xl font-bold text-foreground">+{scannedReceipt.reward} tokens</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setScannedReceipt(null)} className="flex-1 border-border/50">
                Scan Another
              </Button>
              <Button onClick={handleClaimReward} className="flex-1 gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Claim Reward
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="glass-light border border-border/50 bg-muted/20 p-6">
        <h3 className="mb-3 font-semibold text-foreground">How it works</h3>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>Upload a clear photo or PDF of your receipt</li>
          <li>AI verifies the merchant, amount, and date</li>
          <li>Rewards calculated based on purchase amount</li>
          <li>Tokens instantly minted to your wallet</li>
        </ul>
      </Card>
    </div>
  )
}
