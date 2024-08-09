import { createConfig } from "fuels";
import { config } from "dotenv";

config();

const TESTNET_NETWORK_URL = process.env.TESTNET_NETWORK_URL;
if (!TESTNET_NETWORK_URL) {
  throw new Error("TESTNET_NETWORK_URL is not set in .env file");
}

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set in .env file");
}

export default createConfig({
  contracts: ["./store"],
  output: "./src/sway-contracts-api",
  providerUrl: TESTNET_NETWORK_URL,
  privateKey: PRIVATE_KEY,
});

/**
 * Check the docs:
 * https://docs.fuel.network/docs/fuels-ts/fuels-cli/config-file/
 */
