import {
  Action,
  AnyAction,
  ThunkAction,
  configureStore,
} from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import { ordersReducer } from "../features/orders/ordersSlice"
import { ordersSaga } from "./ordersSaga"

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
