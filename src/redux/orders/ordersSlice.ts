import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ICity } from "../../api/citiesApi"
import { RootState } from "../store"

export interface IOrder {
  name: string
  from: number
  to: number
  id: number
}

export interface OrdersState {
  data: IOrder[]
  cities: ICity[]
  fetchStatus: "idle" | "loading" | "failed"
  errorMessage?: string
  selectedOrder: number | null
}

export const initialState: OrdersState = {
  data: [],
  cities: [],
  fetchStatus: "idle",
  selectedOrder: null,
}

const { actions, reducer } = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCities(state, { payload: { cities } }) {
      state.cities = cities
    },
    setOrders(state, { payload: { orders } }) {
      state.data = orders
      state.fetchStatus = "idle"
    },
    loadOrders(state) {
      state.fetchStatus = "loading"
    },
    loadOrdersFailed(state, { payload: { error } }) {
      state.fetchStatus = "failed"
      state.errorMessage = error
    },
    setSelectedOrder(state, { payload: value }: PayloadAction<IOrder>) {
      state.selectedOrder = value.id
    },
    changeOrderStart(state, { payload: { from, id } }) {
      const order = state.data.find((o) => o.id === id)
      if (order) {
        order.from = from
      }
    },
    changeOrderFinish(state, { payload: { to, id } }) {
      const order = state.data.find((o) => o.id === id)
      if (order) {
        order.to = to
      }
    },
  },
})

export const ordersSelectors = {
  orders: (state: RootState) => state.orders.data,
  cities: (state: RootState) => state.orders.cities,
  selectedOrder: (state: RootState) => state.orders.selectedOrder,
}

export const selectedOrderSelector = createSelector(
  [ordersSelectors.orders, (_, id: number | null) => id],
  (orders, id) => orders.find((order: IOrder) => order.id === id),
)

export const citySelector = createSelector(
  [ordersSelectors.cities, (_, id: number | undefined) => id],
  (cities, id) => cities.find((city: ICity) => city.id === id),
)

export { actions as ordersActions, reducer as ordersReducer }
