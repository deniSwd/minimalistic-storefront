import { CategoryType, CurrencyType, ProductType } from '../MainTypes'
import { productAPI } from '../API/api'

const ADD_PRODUCTS_IN_CART = 'ADD-PRODUCTS-IN-CART'
const SET_CURRENT_AMOUNT_DOWN = 'SET-CURRENT-AMOUNT-DOWN'
const SET_CURRENT_AMOUNT_UP = 'SET-CURRENT-AMOUNT-UP'


let initialsState = {
  currentCart: {
    selectedProducts: [],
  },
  totalPrice: 0
}
const cartReducer = (state = initialsState, action: any) => {
  switch (action.type) {
    case ADD_PRODUCTS_IN_CART:
      return {
        ...state,
        currentCart: { ...state.currentCart,
          selectedProducts: [...state.currentCart.selectedProducts, {...action.selectedProduct, amount: 1}]
        }
      }
    case SET_CURRENT_AMOUNT_DOWN:
      const currentCartProducts:any = [...state.currentCart.selectedProducts]
      const currentProduct = currentCartProducts.find((v:any ) => v.product.id === action.productId)
      currentProduct.amount > 0 ? currentProduct.amount = action.amountOfProduct - 1 :
        currentProduct.amount = 0
      return {
        ...state,
        currentCart: { ...state.currentCart,
          selectedProducts: [...currentCartProducts]
        }
      }
    case SET_CURRENT_AMOUNT_UP:
      const currentCartProductsInUp:any = [...state.currentCart.selectedProducts]
      const currentProductInUp = currentCartProductsInUp.find((v:any ) => v.product.id === action.productId)
      currentProductInUp.amount = action.amountOfProduct + 1
      return {
        ...state,
        currentCart: { ...state.currentCart,
          selectedProducts: [...currentCartProductsInUp]
        }
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
  productId:number
}
export const setCurrentAmountDown = (amountOfProduct: number,productId:number): setCurrentAmountDownActionType => ({
  type: SET_CURRENT_AMOUNT_DOWN, amountOfProduct,productId
})

type setCurrentAmountUpActionType = {
  type: typeof SET_CURRENT_AMOUNT_UP
  amountOfProduct: number
  productId:number
}
export const setCurrentAmountUp = (amountOfProduct: number,productId:number): setCurrentAmountUpActionType => ({
  type: SET_CURRENT_AMOUNT_UP, amountOfProduct,productId
})


export const getCurrentProduct = (selectedProduct: any) => (dispatch: any) => {
  dispatch(addProductInCart(selectedProduct))
}

export const currentAmountDown = (amountOfProduct: number,productId:number) => (dispatch: any) => {
  dispatch(setCurrentAmountDown(amountOfProduct,productId))
}

export const currentAmountUp = (amountOfProduct: number,productId:number) => (dispatch: any) => {
  dispatch(setCurrentAmountUp(amountOfProduct,productId))
}
export default cartReducer