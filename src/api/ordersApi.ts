import { IOrder } from "../features/orders/ordersSlice"
import { orders } from "./orders"

export const fetchOrders = async (): Promise<IOrder[]> => {
  // throw new Error("Ошибка")
  return Promise.resolve(orders)
}
