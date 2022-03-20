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
const categoryPageReducer = (state:CategoryType = initialsState, action: any) => {
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

type setAllProductsSuccessActionType = {
type: typeof SET_PRODUCTS
category: CategoryType
}
export const setAllProductsSuccess = (category:CategoryType ): setAllProductsSuccessActionType => ({
  type: SET_PRODUCTS, category })

type setSelectedCurrencyActionType = {
  type: typeof SET_SELECTED_CURRENCY
  currency: CurrencyType
}
export const setSelectedCurrency = (currency: CurrencyType): setSelectedCurrencyActionType  => ({
  type: SET_SELECTED_CURRENCY, currency })

export const getAllProducts = () => async (dispatch: any) => {
  const category = await productAPI.getAllProducts()
  dispatch(setAllProductsSuccess(category))
}

export const getCurrency = (currency: CurrencyType) => (dispatch: any) => {
  dispatch(setSelectedCurrency(currency))
}


export default categoryPageReducer