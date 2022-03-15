import { CategoryType } from '../MainTypes'
import { productAPI } from '../API/api'

const SET_PRODUCTS = 'SET-PRODUCTS'

let initialsState: CategoryType = {
  name: '',
  products: []
}
const categoryPageReducer = (state = initialsState, action:any) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        name: action.category.name,
        products: action.category.products
      }
    default:
      return (state);
  }
}
export const setAllProductsSuccess = (category:any) => ({
  type: SET_PRODUCTS, category })

export const getAllProducts = () => async (dispatch: any) => {
  const category  = await productAPI.getAllProducts()
  dispatch(setAllProductsSuccess(category))
}
export default categoryPageReducer