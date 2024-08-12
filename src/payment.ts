import { Wallet, type AssetId } from "fuels";
import { config } from "dotenv";
import { getWalletAndProvider } from "./lib";
import { PaymentAbi__factory } from "./sway-contracts-api";
import { payment as paymentContractId } from "./sway-contracts-api/contract-ids.json";

config();

const main = async () => {
  const { wallet, provider } = await getWalletAndProvider();

  const amountToForward = 40;
  const amountToTransfer = 10;
  const baseAssetId = provider.getBaseAssetId();

  const recipient = Wallet.generate({
    provider,
  });

  const asset: AssetId = {
    bits: baseAssetId,
  };

  const contract = PaymentAbi__factory.connect(paymentContractId, wallet);

  const { waitForResult, transactionId } = await contract.functions
    .transfer(amountToTransfer, asset, recipient.address.toB256())
    .callParams({
      forward: [amountToForward, baseAssetId],
    })
    .call();

  console.log("transactionId:", transactionId);

  await waitForResult();

  const contractBalance = await contract.getBalance(baseAssetId);

  const expectedBalance = amountToForward - amountToTransfer;

  console.log("contractBalance:", contractBalance);
  console.log("expectedBalance:", expectedBalance);
};

main();
