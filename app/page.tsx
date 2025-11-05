"use client"

import dynamic from "next/dynamic"

const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false },
)

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#181825] text-white px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-balance">Universal Solana Wallet Connect</h1>

      <div className="mb-8">
        <WalletMultiButton />
      </div>

      <div className="max-w-md mx-auto text-center leading-relaxed space-y-3 text-sm md:text-base">
        <p>
          <strong className="text-primary-foreground">Desktop:</strong> Works with Phantom, Solflare, and more.
        </p>
        <p>
          <strong className="text-primary-foreground">Mobile:</strong> Tap WalletConnect in Phantom app, Chrome, or
          Safari.
        </p>
        <p className="text-muted-foreground">
          <strong>Pro Tip:</strong> Try connecting from Chrome, Safari, and inside the Phantom app browser!
        </p>
      </div>
    </div>
  )
}
