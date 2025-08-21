import { defineChain, getContract, sendTransaction } from "thirdweb";
import { createThirdwebClient } from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";

const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT!;
const NFT_COLLECTION_ADDRESS = "0x280CE180981aE4A49b4E2ED18569b4F48bD8091f"; // Your NFT contract
const TOKEN_ID = 1; // The NFT you minted
const PRICE = "0.0001"; // RBTC

if (!PRIVATE_KEY || !MARKETPLACE_ADDRESS) throw new Error("Check .env variables");

// 1️⃣ Create client and account
const client = createThirdwebClient({ secretKey: process.env.THIRDWEB_SECRET_KEY || "" });
const account = privateKeyToAccount({ client, privateKey: PRIVATE_KEY });

// 2️⃣ Define Rootstock Testnet
const rootstockTestnet = defineChain(31);

// 3️⃣ Connect to your marketplace contract
const marketplaceContract = getContract({
  client,
  chain: rootstockTestnet,
  address: MARKETPLACE_ADDRESS.toLowerCase(),
});

// 4️⃣ Optional: Approve marketplace to transfer your NFT
const nftContract = getContract({
  client,
  chain: rootstockTestnet,
  address: NFT_COLLECTION_ADDRESS.toLowerCase(),
});

await nftContract.erc721.setApprovalForAll(marketplaceContract.getAddress(), true);
console.log("Marketplace approved to transfer NFT");

// 5️⃣ Create the listing
const listingTx = await marketplaceContract.direct.createListing({
  assetContractAddress: NFT_COLLECTION_ADDRESS,
  tokenId: TOKEN_ID,
  pricePerToken: PRICE,
  currencyContractAddress: "0x0000000000000000000000000000000000000000", // Native rBTC
  quantity: 1,
});

console.log("Listing created!", listingTx);
