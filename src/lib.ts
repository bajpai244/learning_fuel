import { Provider, Wallet } from "fuels";

export const getWalletAndProvider = async () => {
  const TESTNET_NETWORK_URL = process.env.TESTNET_NETWORK_URL;
  if (!TESTNET_NETWORK_URL) {
    throw new Error("TESTNET_NETWORK_URL is not set in .env file");
  }
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set in .env file");
  }

  const provider = await Provider.create(TESTNET_NETWORK_URL);
  const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);

  return {
    wallet,
    provider,
  };
};
