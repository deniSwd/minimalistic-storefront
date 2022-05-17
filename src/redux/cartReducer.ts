import { BaseThunkType, InferActionsTypes } from './redux-store'
import { CurrentItemType, SelectedProductType } from '../MainTypes'
import { isEqual } from '../utilities/isEqual'

type ThunkType = BaseThunkType<ActionsType>
export type ActionsType = InferActionsTypes<typeof actions>
export type InitialsStateType = typeof initialsState

let initialsState = {
  currentCart: {
    selectedProducts: [] as Array<SelectedProductType>,
    counterProductsValue: 0
  }
}

const cartReducer = (state = initialsState, action: ActionsType): InitialsStateType => {
  switch (action.type) {
    case 'ADD_PRODUCTS_IN_CART':
      const currentCartProductsForAdd = [
        ...state.currentCart.selectedProducts
      ]
      const copyOfProduct = currentCartProductsForAdd.find(
        v => v.product != null && action.selectedProduct.product != null
          && v.product.id === action.selectedProduct.product.id &&
          isEqual(v.currentItem, action.selectedProduct.currentItem)
      )
      if (copyOfProduct) ++copyOfProduct.amount
      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          selectedProducts: copyOfProduct
            ? [...state.currentCart.selectedProducts]
            : [
              ...state.currentCart.selectedProducts,
              { ...action.selectedProduct, amount: 1 }
            ]
        }
      }
    case 'SET_CURRENT_AMOUNT_DOWN':
      const currentCartProducts = [...state.currentCart.selectedProducts]
      const currentProduct = currentCartProducts.find(
        v => v.product != null && v.product.id === action.productId &&
          JSON.stringify(v.currentItem) ===
          JSON.stringify(action.currentItemProduct))
      if (currentProduct) {
        currentProduct.amount > 0
          ? (currentProduct.amount = action.amountOfProduct - 1)
          : (currentProduct.amount = 0)
      }
      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          selectedProducts: [...currentCartProducts]
        }
      }
    case 'SET_CURRENT_AMOUNT_UP':
      const currentCartProductsInUp = [
        ...state.currentCart.selectedProducts
      ]
      const currentProductInUp = currentCartProductsInUp.find(
        v => v.product != null && v.product.id === action.productId &&
          JSON.stringify(v.currentItem) ===
          JSON.stringify(action.currentItemProduct)
      )
      if (currentProductInUp) {
        currentProductInUp.amount = action.amountOfProduct + 1
      }

      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          selectedProducts: [...currentCartProductsInUp]
        }
      }
    case 'DELETE_PRODUCTS_IN_CART':
      const newSelectedProducts = state.currentCart.selectedProducts.filter(
        v => !isEqual(v, action.deletedProduct))
      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          selectedProducts: [...newSelectedProducts]
        }
      }
    case 'GET_CURRENT_LOCAL_CART':
      return { ...state, ...action.localCart }
    case 'SET_COUNTER_PRODUCTS_VALUE':
      const calculate = () => {
        let counterProductsValue = 0
        for (let i = 0; i < state.currentCart.selectedProducts.length; i++) {
          counterProductsValue += state.currentCart.selectedProducts[i]?.amount ?? 0
        }
        return counterProductsValue
      }
      if (state.currentCart.counterProductsValue === calculate()) return state
      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          counterProductsValue: calculate()
        }
      }
    default:
      return state
  }
}

export const actions = {
  addProductInCart: (selectedProduct: SelectedProductType) =>
    ({ type: 'ADD_PRODUCTS_IN_CART', selectedProduct } as const),
  deletedProductInCart: (deletedProduct: SelectedProductType) =>
    ({ type: 'DELETE_PRODUCTS_IN_CART', deletedProduct } as const),
  setCurrentAmountDown: (amountOfProduct: number, productId: string, currentItemProduct: CurrentItemType) =>
    ({ type: 'SET_CURRENT_AMOUNT_DOWN', amountOfProduct, productId, currentItemProduct } as const),
  setCurrentAmountUp: (amountOfProduct: number, productId: string, currentItemProduct: CurrentItemType) =>
    ({ type: 'SET_CURRENT_AMOUNT_UP', amountOfProduct, productId, currentItemProduct } as const),
  getCurrentLocalCart: (localCart: InitialsStateType) =>
    ({ type: 'GET_CURRENT_LOCAL_CART', localCart } as const),
  setCounter: () =>
    ({ type: 'SET_COUNTER_PRODUCTS_VALUE' } as const)
}

export const setLocalCart = (): ThunkType => async (dispatch, getState) => {
  localStorage.setItem('cart', JSON.stringify(getState().cartPage))
}

export const getLocalCart = (): ThunkType => async (dispatch) => {
  const cart = localStorage.getItem('cart') ?? '{}'
  const localCart = cart != null && JSON.parse(cart)
  dispatch(actions.getCurrentLocalCart(localCart))
}

export default cartReducer