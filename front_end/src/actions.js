import { ACTION_TYPE_SET_PEER_CONNECTON, ACTION_TYPE_SET_PEER_STATE } from "./constants"


export const setPeerConnection = (peerConnection) => {
  return {
    type: ACTION_TYPE_SET_PEER_CONNECTON,
    payload: peerConnection
  }
};

export const setPeerState = (peerState) => {
  return {
    type: ACTION_TYPE_SET_PEER_STATE,
    payload: peerState
  }
};