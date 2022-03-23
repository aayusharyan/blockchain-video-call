import { ACTION_TYPE_SET_ACCOUNT } from "./constants"

export const setWallet = (walletObj) => {
  return {
    type: ACTION_TYPE_SET_ACCOUNT,
    payload: walletObj
  }
};