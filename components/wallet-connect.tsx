'use client'

import { useState } from 'react'
import { Wallet, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface WalletConnectProps {
  connectedWallet: string | null
  onConnect: (address: string | null) => void
  variant?: 'default' | 'hero'
}

export default function WalletConnect({ connectedWallet, onConnect, variant = 'default' }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    // Simulate wallet connection (In production, use Web3 library like ethers.js or wagmi)
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(16).substring(2, 42)
      onConnect(mockAddress)
      setIsConnecting(false)
    }, 1500)
  }

  const disconnectWallet = () => {
    onConnect(null)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  if (connectedWallet) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 border-border/50">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{formatAddress(connectedWallet)}</span>
            <span className="sm:hidden">Wallet</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass border-border/50">
          <DropdownMenuItem onClick={disconnectWallet}>
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === 'hero') {
    return (
      <Button
        size="lg"
        onClick={connectWallet}
        disabled={isConnecting}
        className="gap-2 rounded-xl px-8 py-6 text-base font-medium"
      >
        <Wallet className="h-5 w-5" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    )
  }

  return (
    <Button onClick={connectWallet} disabled={isConnecting} className="gap-2">
      <Wallet className="h-4 w-4" />
      {isConnecting ? 'Connecting...' : 'Connect'}
    </Button>
  )
}
