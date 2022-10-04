import { Table } from "antd"
import { TableRowSelection } from "antd/lib/table/interface"
import React from "react"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { CitySelect } from "./CitySelect"
import { IOrder, ordersActions, ordersSelectors } from "./ordersSlice"

export function Orders() {
  const orders = useAppSelector(ordersSelectors.orders)
  const selectedOrder = useAppSelector(ordersSelectors.selectedOrder)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(ordersActions.loadOrders())
  }, [])

  const rowSelection: TableRowSelection<IOrder> = {
    type: "radio",
    selectedRowKeys: selectedOrder != null ? [selectedOrder] : [],
    onChange: (_: React.Key[], value: IOrder[]) =>
      dispatch(ordersActions.setSelectedOrder(value[0])),
  }
  const columns = [
    {
      key: "name",
      title: "Название заказа",
      dataIndex: "name",
    },
    {
      key: "from",
      title: "Откуда",
      dataIndex: "from",
      render: (item: number, order: IOrder) => (
        <CitySelect
          item={item}
          onChange={(from) =>
            dispatch(
              ordersActions.changeOrderStart({
                from,
                id: order.id,
              }),
            )
          }
        />
      ),
    },
    {
      key: "to",
      title: "Куда",
      dataIndex: "to",
      render: (item: number, order: IOrder) => (
        <CitySelect
          item={item}
          onChange={(to) =>
            dispatch(
              ordersActions.changeOrderFinish({
                to,
                id: order.id,
              }),
            )
          }
        />
      ),
    },
  ]

  return (
    <Table
      bordered
      dataSource={orders}
      columns={columns}
      rowKey="id"
      style={{ height: "100vh", overflowX: "auto" }}
      rowSelection={rowSelection}
    />
  )
}
