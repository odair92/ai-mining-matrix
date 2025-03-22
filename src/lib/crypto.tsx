
import { Database, Barcode, Coins, Bitcoin, Landmark } from "lucide-react";
import React from "react";

export type CryptoCurrency = {
  id: string;
  name: string;
  symbol: string;
  icon: React.ReactNode;
  color: string;
};

export const cryptocurrencies: CryptoCurrency[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: <Bitcoin className="h-5 w-5" />,
    color: "text-[#F7931A]",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: <Coins className="h-5 w-5" />,
    color: "text-[#627EEA]",
  },
  {
    id: "trx",
    name: "Tron",
    symbol: "TRX",
    icon: <Database className="h-5 w-5" />,
    color: "text-[#EF0027]",
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    icon: <Landmark className="h-5 w-5" />,
    color: "text-[#26A17B]",
  }
];

export const getCryptoCurrency = (id: string): CryptoCurrency | undefined => {
  return cryptocurrencies.find(crypto => crypto.id === id);
};
