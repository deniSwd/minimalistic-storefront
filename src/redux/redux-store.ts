import { Action, ThunkAction } from '@reduxjs/toolkit'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import cartReducer from './cartReducer'
import categoryReducer from './categoryReducer'

const rootReducers = combineReducers({
  categoryPage: categoryReducer,
  cartPage: cartReducer
})
type RootReducersType = typeof rootReducers
export type AppStateType = ReturnType<RootReducersType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: never[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const composeEnhancers = compose

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
