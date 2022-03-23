import { ACTION_TYPE_SET_ACCOUNT } from "./constants";

const initialState = {
  wallet: undefined,
  localStream: undefined,
  remoteStream: undefined,
};

const rootReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case ACTION_TYPE_SET_ACCOUNT:
      currentState.wallet = action.payload;
      break;
    default:
      break;
  }
  return { ...currentState };
};

export default rootReducer;