import { CategoryType, CurrencyType } from '../MainTypes'
import { productAPI } from '../API/api'

const SET_PRODUCTS = 'SET-PRODUCTS'
const SET_SELECTED_CURRENCY = 'SET-SELECTED-CURRENCY'


let initialsState: CategoryType = {
  name: '',
  products: [],
  selectedCurrency: {
    label: 'USD',
    symbol: '$'
  }
}
const categoryPageReducer = (state = initialsState, action: any) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        name: action.category.name,
        products: action.category.products,
      }
    case SET_SELECTED_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.currency
      }
    default:
      return (state)
  }
}
export const setAllProductsSuccess = (category: any) => ({
  type: SET_PRODUCTS, category })

export const setSelectedCurrency = (currency: CurrencyType) => ({
  type: SET_SELECTED_CURRENCY, currency })

export const getAllProducts = () => async (dispatch: any) => {
  const category = await productAPI.getAllProducts()
  dispatch(setAllProductsSuccess(category))
}

export const getCurrency = (currency: CurrencyType) => (dispatch: any) => {
  dispatch(setSelectedCurrency(currency))
}


export default categoryPageReducer