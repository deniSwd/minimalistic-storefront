import { CategoryType, CurrencyType } from '../MainTypes'
import { productAPI } from '../API/api'
import { BaseThunkType, InferActionsTypes } from './redux-store'

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

let initialsState: CategoryType = {
  name: '',
  products: [],
  selectedCurrency: {
    label: 'USD',
    symbol: '$'
  }
}
const categoryReducer = (state = initialsState, action: ActionsType): CategoryType => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        name: action.category.name,
        products: action.category.products
      }
    case 'SET_SELECTED_CURRENCY':
      return {
        ...state,
        selectedCurrency: action.currency
      }
    default:
      return state
  }
}

export const actions = {
  setAllProductsSuccess: (category: CategoryType) =>
    ({ type: 'SET_PRODUCTS', category } as const),
  setSelectedCurrency: (currency: CurrencyType) =>
    ({ type: 'SET_SELECTED_CURRENCY', currency } as const)
}

export const getAllProducts = (): ThunkType => async (dispatch) => {
  const category = await productAPI.getAllProducts()
  dispatch(actions.setAllProductsSuccess(category))
}

export default categoryReducer
