import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { ROPSTEN_CHAIN_ID } from '../constants';

export const MetaMaskObj = new InjectedConnector({
  supportedChainIds: [ROPSTEN_CHAIN_ID]
});

export const WalletConnectObj = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/kjsdjkfhsjkfdhjskjfh`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const WalletLinkObj = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/kjjdfgjhsgdfhj`,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const LedgerObj = new LedgerConnector({
  url: `https://mainnet.infura.io/v3/kjjdfgjhsgdfhj`,
  supportedChainIds: [1, 3, 4, 5, 42],
});