import { CategoryType, CurrencyType } from '../MainTypes'
import { productAPI } from '../API/api'

const ADD_PRODUCTS_IN_CART = 'ADD-PRODUCTS-IN-CART'
const SET_CURRENT_AMOUNT_DOWN = 'SET-CURRENT-AMOUNT-DOWN'
const SET_CURRENT_AMOUNT_UP = 'SET-CURRENT-AMOUNT-UP'


let initialsState = {
  currentCart: [],
  currentAmount: 1,
  totalPrice: 0
}
const cartReducer = (state = initialsState, action: any) => {
  switch (action.type) {
    case ADD_PRODUCTS_IN_CART:
      return {
        ...state,
        currentCart: [...state.currentCart, action.selectedProduct]
      }
    case SET_CURRENT_AMOUNT_DOWN:
      return {
        ...state,  currentAmount: state.currentAmount > 0 ?  action.amountOfProduct - 1 : 0
      }
    case SET_CURRENT_AMOUNT_UP:
      return {
        ...state,
        currentAmount: action.amountOfProduct + 1
      }
    default:
      return (state)
  }
}

type addProductInCartActionType = {
  type: typeof ADD_PRODUCTS_IN_CART
  selectedProduct: any
}
export const addProductInCart = (selectedProduct: any): addProductInCartActionType => ({
  type: ADD_PRODUCTS_IN_CART, selectedProduct
})

type setCurrentAmountDownActionType = {
  type: typeof SET_CURRENT_AMOUNT_DOWN
  amountOfProduct: number
}
export const setCurrentAmountDown = (amountOfProduct: number): setCurrentAmountDownActionType => ({
  type: SET_CURRENT_AMOUNT_DOWN, amountOfProduct
})

type setCurrentAmountUpActionType = {
  type: typeof SET_CURRENT_AMOUNT_UP
  amountOfProduct: number
}
export const setCurrentAmountUp = (amountOfProduct: number): setCurrentAmountUpActionType => ({
  type: SET_CURRENT_AMOUNT_UP, amountOfProduct
})


export const getCurrentProduct = (selectedProduct: any) => (dispatch: any) => {
  dispatch(addProductInCart(selectedProduct))
}

export const currentAmountDown = (amountOfProduct: number) => (dispatch: any) => {
  dispatch(setCurrentAmountDown(amountOfProduct))
}

export const currentAmountUp = (amountOfProduct: number) => (dispatch: any) => {
  dispatch(setCurrentAmountUp(amountOfProduct))
}
export default cartReducer