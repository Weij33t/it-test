import { put, takeEvery } from "redux-saga/effects"

import { ICity, fetchCities } from "../api/citiesApi"
import { fetchOrders } from "../api/ordersApi"
import { IOrder, ordersActions } from "../features/orders/ordersSlice"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

function* loadData() {
  try {
    const orders: IOrder[] = yield fetchOrders()
    const cities: ICity[] = yield fetchCities()
    yield put(ordersActions.setOrders({ orders }))
    yield put(ordersActions.setCities({ cities }))
  } catch ({ message }) {
    yield put(ordersActions.loadOrdersFailed({ error: message }))
    yield delay(1000)
    yield put(ordersActions.loadOrdersFailed({ error: undefined }))
  }
}

export function* ordersSaga() {
  yield takeEvery(ordersActions.loadOrders, loadData)
}
