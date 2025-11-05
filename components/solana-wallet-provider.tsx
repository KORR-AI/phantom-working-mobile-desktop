"use client"

import { useMemo, type ReactNode } from "react"
import { clusterApiUrl } from "@solana/web3.js"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect"
import "@solana/wallet-adapter-react-ui/styles.css"

export function SolanaWalletProvider({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), [])

  const wallets = useMemo(() => {
    const isMobile = typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const walletConnectAdapter = new WalletConnectWalletAdapter({
      network: "mainnet-beta",
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "3314f39613059cb687432d249f1658d2",
        metadata: {
          name: "Phantom Wallet dApp",
          description: "Connect your Phantom wallet",
          url: typeof window !== "undefined" ? window.location.origin : "https://phantom.app",
          icons: ["https://phantom.app/img/logo.png"],
        },
      },
    })

    if (isMobile) {
      return [walletConnectAdapter]
    }

    return [new PhantomWalletAdapter(), walletConnectAdapter]
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
