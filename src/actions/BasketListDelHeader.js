import { SET_CODE_HEADER_DEL } from './../constants/BasketListDelHeader'

export function setCode(code) {
  return {
    type: SET_CODE_HEADER_DEL,
    payload: code
  }

}