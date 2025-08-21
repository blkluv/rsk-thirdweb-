import client from "@/lib/client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { defineChain } from "thirdweb/chains";

export const rootstockTestnet = defineChain({
  id: 31,
  rpc: "https://rootstock-testnet.g.alchemy.com/v2/DAfFtjudU6WUxNJuJ5RnM3gdKcx5hEHY",
  nativeCurrency: {
    name: "rBTC",
    symbol: "rBTC",
    decimals: 18,
  },
});

export const marketplaceContract = getContract({
  client,
  address: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT!,
  chain: defineChain(31),
});