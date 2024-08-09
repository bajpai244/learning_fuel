import { Provider, Wallet } from "fuels";
import { config } from "dotenv";
import {StoreAbi__factory} from "./sway-contracts-api"
import {store as storeContractId} from "./sway-contracts-api/contract-ids.json"

config();

const main = async () => {
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

  // Perform a balance check.
  const { balances } = await wallet.getBalances();

  console.log("balances:", balances);

  // Interact with the contract
  const contractInstance = StoreAbi__factory.connect(storeContractId, wallet);

  const {value} = await contractInstance.functions.get_value().get();
  console.log("value is: ", value);

  const {value: newVal} = await (await contractInstance.functions.set_value(Math.floor(Math.random() * 1000)).call()).waitForResult(); 
  console.log("new value is: ", newVal);
};

main();
