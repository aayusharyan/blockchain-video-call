import { ACTION_TYPE_SET_ACCOUNT, ACTION_TYPE_SET_PEER_CONNECTON } from "./constants";

const initialState = {
  wallet: undefined,
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
    default:
      break;
  }
  return { ...currentState };
};

export default rootReducer;