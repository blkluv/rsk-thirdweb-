import client from "@/lib/client";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// ✅ Define Rootstock Testnet once
export const rootstockTestnet = defineChain({
  id: 31,
  name: "Rootstock Testnet",
  rpc: "https://rpc.testnet.rootstock.io/Apcce2pZEDUdCVk5AxgmoJW8J5jM0v-T",
  nativeCurrency: {
    name: "rBTC",
    symbol: "rBTC",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "RSK Testnet Explorer",
      url: "https://explorer.testnet.rootstock.io/",
    },
  ],
  testnet: true,
});

// ✅ Point contract to Rootstock Testnet
export const marketplaceContract = getContract({
  client,
  address: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT!,
  chain: rootstockTestnet,   // ⬅️ use the full object here
});
