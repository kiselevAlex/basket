import {
    SET_CHECK_ITEM_DEL,
    SET_CHECK_ITEM_DEL_ALL,
    SET_CHECK_ITEM_DELDEL,
    SET_CHECK_ITEM_DELDEL_ALL
} from './../constants/BasketListDel'

export function toogleCheckItemDel(id) {

  return {
    type: SET_CHECK_ITEM_DEL,
    payload: id
  }
}

export function toogleCheckItemDelAll(val) {
  return {
    type: SET_CHECK_ITEM_DEL_ALL,
    payload: val
  }
}

export function toogleCheckItemDelDel(id) {

  return {
    type: SET_CHECK_ITEM_DELDEL,
    payload: id
  }
}

export function toogleCheckItemDelDelAll(val) {
  return {
    type: SET_CHECK_ITEM_DELDEL_ALL,
    payload: val
  }
}