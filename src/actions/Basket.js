import {
    GET_BASKET_REQUEST,
    GET_BASKET_SUCCESS,
    GET_BASKET_SUCCESS_ERR
} from './../constants/Basket'

export function updateItemDelStart() {

  return {
    type: GET_BASKET_REQUEST
  }
}

export function updateItemDel(dataDel) {

  return {
    type: GET_BASKET_SUCCESS,
    payload: dataDel
  }
}

export function updateErrore(er) {

  return {
    type: GET_BASKET_SUCCESS_ERR,
    payload: er
  }
}