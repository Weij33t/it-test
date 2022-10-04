import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import { ordersSaga } from "./orders/ordersSaga"
import { ordersReducer } from "./orders/ordersSlice"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(ordersSaga)

export const action = (type: AnyAction) => store.dispatch({ type })

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
