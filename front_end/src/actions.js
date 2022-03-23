import { ACTION_TYPE_SET_ACCOUNT, ACTION_TYPE_SET_PEER_CONNECTON, ACTION_TYPE_SET_WALLET_PROVIDER } from "./constants"

export const setWallet = (walletObj) => {
  return {
    type: ACTION_TYPE_SET_ACCOUNT,
    payload: walletObj
  }
};

export const setPeerConnection = (peerConnection) => {
  return {
    type: ACTION_TYPE_SET_PEER_CONNECTON,
    payload: peerConnection
  }
};

export const setWalletProvider = (walletProvider) => {
  return {
    type: ACTION_TYPE_SET_WALLET_PROVIDER,
    payload: walletProvider
  }
};