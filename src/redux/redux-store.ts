import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import cartReducer from './cartReducer'
import categoryPageReducer from './categoryPageReducer'


let rootReducers = combineReducers({
  categoryPage: categoryPageReducer,
  cartPage: cartReducer,
  /*productPage: productReducer,*/
})
type RootRedusersType = typeof rootReducers
export type AppStateType = ReturnType<RootRedusersType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
