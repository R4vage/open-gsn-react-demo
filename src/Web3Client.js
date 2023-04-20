import Web3 from "web3";
import { RelayProvider } from "@opengsn/provider";
import ERC20ContractABI from "./contracts/ERC20GSNabi.json";
import RelayHubABI from "./contracts/RelayHubAbi.json";

const CONTRACT_ADDRESS = "0xbf2185A1445D49AA299B07A3E21197de0f557B64";
const PAYMASTER_ADDRESS = "0x086c11bd5A61ac480b326916656a33c474d1E4d8";
const RELAY_HUB_ADDRESS = "0x3232f21A6E08312654270c78A773f00dd61d60f5";
const ALTERNATIVE_ACCOUNT = "0x37F76dd37dbAA04559f7d22f890bb205B992AeE3";

let selectedAccount;

export const init = async () => {
  const provider = window.ethereum;

  if (typeof provider !== "undefined") {
    await provider.request({ method: "eth_requestAccounts" });

    const accounts = await provider.request({ method: "eth_accounts" });
    selectedAccount = accounts[0];

    const gsnConfig = {
      paymasterAddress: PAYMASTER_ADDRESS,
    };

    const gsnProvider = RelayProvider.newProvider({
      provider,
      config: gsnConfig,
    });
    await gsnProvider.init();

    const web3 = new Web3(gsnProvider);
    const contract = new web3.eth.Contract(ERC20ContractABI, CONTRACT_ADDRESS);

    console.log(gsnProvider);
    window.web3 = web3;
    window.contract = contract;
  }
};

export const mint = async (amount) => {
  try {
    const gasPrice = window.web3.utils.toWei("1", "gwei");
    const gasLimit = 100000;
    const mintTx = await window.contract.methods
      .mint(amount)
      .send({ from: selectedAccount, gasPrice, gasLimit });
    console.log(`Mint transaction:`, mintTx);
  } catch (error) {
    console.error("Error minting tokens:", error);
    if (error.relayedCallStautusInfo) {
      console.error("Relayed call status info:", error.relayedCallStautusInfo);
    }
  }
};

export const transfer = async (amount) => {
  try {
    const transferTx = await window.contract.methods
      .transferFrom(selectedAccount, ALTERNATIVE_ACCOUNT, amount)
      .send({ from: selectedAccount });
    console.log(transferTx);
  } catch (error) {
    console.error("Error transfering:", error);
  }
};

export const getPaymasterBalance = async () => {
  const relayHub = new window.web3.eth.Contract(RelayHubABI, RELAY_HUB_ADDRESS);
  const balance = await relayHub.methods.balanceOf(PAYMASTER_ADDRESS).call();
  console.log(
    `Paymaster balance: ${window.web3.utils.fromWei(balance, "ether")} MATIC`
  );
};
