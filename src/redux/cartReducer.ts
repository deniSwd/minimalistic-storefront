import { BaseThunkType, InferActionsTypes } from './redux-store'

type ActionsType = InferActionsTypes<typeof actions>
export type InitialsStateType = typeof initialsState

let initialsState = {
  currentCart: {
    selectedProducts: []
  }
}

const cartReducer = (state = initialsState, action: ActionsType): any => {
  switch (action.type) {
    case 'ADD_PRODUCTS_IN_CART':
      const currentCartProductsForAdd: any = [
        ...state.currentCart.selectedProducts
      ]
      const copyOfProduct = currentCartProductsForAdd.find(
        (v: any) =>
          v.product.id === action.selectedProduct.product.id &&
          JSON.stringify(v.currentItem) ===
          JSON.stringify(action.selectedProduct.currentItem)
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
      const currentCartProducts: any = [...state.currentCart.selectedProducts]
      const currentProduct = currentCartProducts.find(
        (v: any) => v.product.id === action.productId
      )
      currentProduct.amount > 0
        ? (currentProduct.amount = action.amountOfProduct - 1)
        : (currentProduct.amount = 0)
      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          selectedProducts: [...currentCartProducts]
        }
      }
    case 'SET_CURRENT_AMOUNT_UP':
      const currentCartProductsInUp: any = [
        ...state.currentCart.selectedProducts
      ]
      const currentProductInUp = currentCartProductsInUp.find(
        (v: any) => v.product.id === action.productId
      )
      currentProductInUp.amount = action.amountOfProduct + 1
      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          selectedProducts: [...currentCartProductsInUp]
        }
      }
    default:
      return state
  }
}
export const actions = {
  addProductInCart: (selectedProduct: any) =>
    ({ type: 'ADD_PRODUCTS_IN_CART', selectedProduct } as const),
  setCurrentAmountDown: (amountOfProduct: number, productId: number) =>
    ({ type: 'SET_CURRENT_AMOUNT_DOWN', amountOfProduct, productId } as const),
  setCurrentAmountUp: (amountOfProduct: number, productId: number) =>
    ({ type: 'SET_CURRENT_AMOUNT_UP', amountOfProduct, productId } as const)
}


export default cartReducer


