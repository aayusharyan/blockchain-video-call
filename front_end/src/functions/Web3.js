import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { INFURA_PROJECT_ID, ROPSTEN_CHAIN_ID, ETHERSCAN_API_KEY } from '../constants';
import { ethers } from 'ethers';


export const MetaMaskObj = new InjectedConnector({
  supportedChainIds: [ROPSTEN_CHAIN_ID]
});

export const WalletConnectObj = new WalletConnectConnector({
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const WalletLinkObj = new WalletLinkConnector({
  url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
  appName: "Talkie",
  supportedChainIds: [ROPSTEN_CHAIN_ID],
});

export const LedgerObj = new LedgerConnector({
  url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
  chainId: ROPSTEN_CHAIN_ID,
});

export const provider = ethers.getDefaultProvider("ropsten", { infura: INFURA_PROJECT_ID, etherscan: ETHERSCAN_API_KEY });