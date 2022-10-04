import { delay, put, takeEvery } from "redux-saga/effects"

import { fetchCities, ICity } from "../../api/citiesApi"
import { fetchOrders } from "../../api/ordersApi"
import { IOrder, ordersActions } from "./ordersSlice"
function* loadData() {
  try {
    const orders: IOrder[] = yield fetchOrders()
    const cities: ICity[] = yield fetchCities()
    yield delay(1000)
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
