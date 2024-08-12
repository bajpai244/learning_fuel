import { Provider, Wallet } from "fuels";
import { config } from "dotenv";
import { StoreAbi__factory } from "./sway-contracts-api";
import { store as storeContractId } from "./sway-contracts-api/contract-ids.json";
import { getWalletAndProvider } from "./lib";

config();

const main = async () => {
  const { wallet, provider } = await getWalletAndProvider();

  // Perform a balance check.
  const { balances } = await wallet.getBalances();

  console.log("balances:", balances);

  // Interact with the contract
  const contractInstance = StoreAbi__factory.connect(storeContractId, wallet);

  const { value } = await contractInstance.functions.get_value().get();
  console.log("value is: ", value);

  const { value: newVal } = await (
    await contractInstance.functions
      .set_value(Math.floor(Math.random() * 1000))
      .call()
  ).waitForResult();
  console.log("new value is: ", newVal);
};

main();
