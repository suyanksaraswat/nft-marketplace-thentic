import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { alchemyRpcUrls, createClient } from "wagmi";

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

type RPC_URL_MAP = {
  [key: number]: string;
};

const RPC_URL: RPC_URL_MAP = {
  1: alchemyRpcUrls.mainnet,
  3: alchemyRpcUrls.ropsten,
  4: alchemyRpcUrls.rinkeby,
  420: alchemyRpcUrls.goerli,
  42: alchemyRpcUrls.kovan,
  10: alchemyRpcUrls.optimism,
  69: alchemyRpcUrls.optimismKovan,
  137: alchemyRpcUrls.polygon,
  80001: alchemyRpcUrls.polygonMumbai,
  42161: alchemyRpcUrls.arbitrum,
  421611: alchemyRpcUrls.arbitrumRinkeby,
};

const clientOptions = {
  autoConnect: true,
  connectors: [
    new CoinbaseWalletConnector({
      options: {
        appName: "NFT Minting Starter Kit",
        jsonRpcUrl: RPC_URL[CHAIN_ID] || alchemyRpcUrls.rinkeby,
      },
    }),
    new MetaMaskConnector(),
    new WalletConnectConnector({
      options: {
        qrcode: true,
      },
    }),
  ],
};

export const WagmiClient = createClient(clientOptions);
