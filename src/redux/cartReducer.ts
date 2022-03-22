import { CategoryType, CurrencyType } from '../MainTypes'
import { productAPI } from '../API/api'

const ADD_PRODUCTS_IN_CART = 'ADD-PRODUCTS-IN-CART'



let initialsState = {
  currentCart: []
}
const cartReducer = (state = initialsState, action: any) => {
  switch (action.type) {
    case ADD_PRODUCTS_IN_CART:
      return {
        ...state,
        currentCart: [...state.currentCart, action.selectedProduct]
      }
    default:
      return (state)
  }
}

type addProductInCartActionType = {
  type: typeof ADD_PRODUCTS_IN_CART
  selectedProduct: any
}
export const addProductInCart = (selectedProduct:any): addProductInCartActionType => ({
  type: ADD_PRODUCTS_IN_CART, selectedProduct })


export const getCurrentProduct = (selectedProduct:any) => (dispatch: any) => {
  dispatch(addProductInCart(selectedProduct))
}
export default cartReducer;