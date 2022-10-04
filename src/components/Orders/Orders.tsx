import { Table } from "antd"
import { TableRowSelection } from "antd/lib/table/interface"
import React from "react"
import { useEffect } from "react"

import { CitySelect } from "../../common/components/CitySelect"
import { useAppDispatch, useAppSelector } from "../../common/hooks/hooks"
import {
  IOrder,
  ordersActions,
  ordersSelectors,
} from "../../redux/orders/ordersSlice"

export function Orders() {
  const status = useAppSelector((state) => state.orders.fetchStatus)
  const orders = useAppSelector(ordersSelectors.orders)
  const selectedOrder = useAppSelector(ordersSelectors.selectedOrder)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(ordersActions.loadOrders())
  }, [])

  const onRowSelectionChange = (_: React.Key[], value: IOrder[]) =>
    dispatch(ordersActions.setSelectedOrder(value[0]))

  const rowSelection: TableRowSelection<IOrder> = {
    type: "radio",
    selectedRowKeys: selectedOrder != null ? [selectedOrder] : [],
    onChange: onRowSelectionChange,
  }

  const onFromChange = (from: number, order: IOrder) =>
    dispatch(
      ordersActions.changeOrderStart({
        from,
        id: order.id,
      }),
    )

  const onToChange = (to: number, order: IOrder) =>
    dispatch(
      ordersActions.changeOrderFinish({
        to,
        id: order.id,
      }),
    )

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
          onChange={(from) => onFromChange(from, order)}
        />
      ),
    },
    {
      key: "to",
      title: "Куда",
      dataIndex: "to",
      render: (item: number, order: IOrder) => (
        <CitySelect item={item} onChange={(to) => onToChange(to, order)} />
      ),
    },
  ]

  return (
    <Table
      bordered
      loading={status === "loading"}
      dataSource={orders}
      columns={columns}
      rowKey="id"
      style={{ height: "100vh", overflowX: "auto" }}
      rowSelection={rowSelection}
    />
  )
}
