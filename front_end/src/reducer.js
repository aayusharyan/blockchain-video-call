import { ACTION_TYPE_SET_PEER_CONNECTON, ACTION_TYPE_SET_PEER_STATE } from "./constants";

const initialState = {
  peerState: undefined,
  peerConnection: undefined,
  localStream: undefined,
  remoteStream: undefined,
};

const rootReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case ACTION_TYPE_SET_PEER_CONNECTON:
      currentState.peerConnection = action.payload;
      break;
    case ACTION_TYPE_SET_PEER_STATE:
      currentState.peerState = action.payload;
    default:
      break;
  }
  return { ...currentState };
};

export default rootReducer;