import { Action, ThunkAction } from '@reduxjs/toolkit'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import cartReducer from './cartReducer'
import categoryPageReducer from './categoryPageReducer'

let rootReducers = combineReducers({
  categoryPage: categoryPageReducer,
  cartPage: cartReducer
  /*productPage: productReducer,*/
})
type RootReducersType = typeof rootReducers
export type AppStateType = ReturnType<RootReducersType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
