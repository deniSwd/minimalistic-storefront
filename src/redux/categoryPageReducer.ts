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
        products: action.products
      }
    default:
      return (state);
  }
}
export const setAllProductsSuccess = (products:any) => ({
  type: SET_PRODUCTS, products })

export const getAllProducts = () => async (dispatch: any) => {
  const products  = await productAPI.getProducts()
  dispatch(setAllProductsSuccess(products))
}
export default categoryPageReducer