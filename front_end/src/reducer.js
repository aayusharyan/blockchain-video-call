import { ACTION_TYPE_SET_ACCOUNT, ACTION_TYPE_SET_PEER_CONNECTON, ACTION_TYPE_SET_WALLET_PROVIDER } from "./constants";

const initialState = {
  wallet: undefined,
  walletProvider: "",
  peerConnection: undefined,
  localStream: undefined,
  remoteStream: undefined,
};

const rootReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case ACTION_TYPE_SET_ACCOUNT:
      currentState.wallet = action.payload;
      break;
    case ACTION_TYPE_SET_PEER_CONNECTON:
      currentState.peerConnection = action.payload;
      break;
    case ACTION_TYPE_SET_WALLET_PROVIDER:
      currentState.walletProvider = action.payload;
      break;
    default:
      break;
  }
  return { ...currentState };
};

export default rootReducer;