"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export function CryptoTicker() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const animationDuration = 30; // Speed increased by 25% (was 40, now 30)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // BTC, ETH, LINK, AAVE, UNI, SOL, AERO, ZCASH, MONERO, DOGE, HYPE, SUI, PUMP
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,chainlink,aave,uniswap,solana,aerodrome-finance,zcash,monero,dogecoin,hyperliquid,sui,turbo&sparkline=false"
        );
        const data = await response.json();
        // Preserve order: BTC, ETH, LINK, AAVE, UNI, SOL, AERO, ZCASH, MONERO, DOGE, HYPE, SUI, PUMP
        const orderedIds = ["bitcoin", "ethereum", "chainlink", "aave", "uniswap", "solana", "aerodrome-finance", "zcash", "monero", "dogecoin", "hyperliquid", "sui", "turbo"];
        const orderedData = orderedIds.map(id => data.find((c: CryptoData) => c.id === id)).filter(Boolean);
        setCryptos(orderedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setIsLoading(false);
      }
    };

    fetchCryptoData();
    
    // Refresh data every animation cycle (30 seconds)
    const interval = setInterval(fetchCryptoData, animationDuration * 1000);
    return () => clearInterval(interval);
  }, [animationDuration]);

  if (isLoading || cryptos.length === 0) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20 h-14 flex items-center justify-center">
        <div className="animate-pulse text-sm">Loading crypto prices...</div>
      </div>
    );
  }

  // Triple the array for seamless infinite scroll
  const duplicatedCryptos = [...cryptos, ...cryptos, ...cryptos];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20 overflow-hidden h-14">
      <motion.div
        className="flex items-center h-full"
        animate={{
          x: [0, "-33.33%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: animationDuration,
            ease: "linear",
          },
        }}
        style={{ 
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {duplicatedCryptos.map((crypto, index) => {
          const isPositive = crypto.price_change_percentage_24h >= 0;
          const percentChange = crypto.price_change_percentage_24h.toFixed(2);

          return (
            <a
              key={`${crypto.id}-${index}`}
              href={`https://www.coingecko.com/en/coins/${crypto.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 whitespace-nowrap border-r border-base-content/10 hover:bg-base-200/50 transition-colors"
              style={{
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {/* Crypto Icon */}
              <img
                src={crypto.image}
                alt={crypto.name}
                className="w-6 h-6 rounded-full"
                style={{ imageRendering: "crisp-edges" }}
              />

              {/* Symbol */}
              <span className="font-extrabold text-sm uppercase tracking-wider">
                {crypto.symbol}
              </span>

              {/* Price */}
              <span className="font-mono text-sm font-semibold">
                ${crypto.current_price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>

              {/* Percentage Change */}
              <span
                className={`flex items-center gap-1 font-mono text-sm font-extrabold ${
                  isPositive ? "text-crypto-green" : "text-crypto-red"
                }`}
              >
                {isPositive ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6 2L10 8H2L6 2Z" />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6 10L2 4H10L6 10Z" />
                  </svg>
                )}
                {isPositive ? "+" : ""}
                {percentChange}%
              </span>
            </a>
          );
        })}
      </motion.div>
    </div>
  );
}

