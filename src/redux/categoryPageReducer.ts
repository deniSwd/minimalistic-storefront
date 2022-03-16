import { CategoryType } from '../MainTypes'
import { productAPI } from '../API/api'

const SET_PRODUCTS = 'SET-PRODUCTS'
/*const SET_SHOW_CURRENCY = 'SET-SHOW-CURRENCY'
const SET_HIDE_CURRENCY = 'SET-HIDE-CURRENCY'*/

let initialsState: CategoryType = {
  name: '',
  products: [],
/*  showCurrency: false,
  showCart: false*/
}
const categoryPageReducer = (state = initialsState, action: any) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        name: action.category.name,
        products: action.category.products
      }
  /*  case SET_SHOW_CURRENCY:
      return {
        ...state,
        showCurrency: true
      }
    case SET_HIDE_CURRENCY:
      return {
        ...state,
        showCurrency: false
      }*/
    default:
      return (state)
  }
}
export const setAllProductsSuccess = (category: any) => ({
  type: SET_PRODUCTS, category
})
/*export const setShowCurrency = () => ({
  type: SET_SHOW_CURRENCY
})
export const setHideCurrency = () => ({
  type: SET_HIDE_CURRENCY
})*/

export const getAllProducts = () => async (dispatch: any) => {
  const category = await productAPI.getAllProducts()
  dispatch(setAllProductsSuccess(category))
}

/*export const getShowCurrency = () => (dispatch: any) => {
  dispatch(setShowCurrency())
}

export const getHideCurrency = () => (dispatch: any) => {
  dispatch(setHideCurrency())
}*/


export default categoryPageReducer