import "./App.css"

import React from "react"
import SplitPane, { Pane } from "react-split-pane-next"

import { useAppSelector } from "./common/hooks/hooks"
import { Map } from "./components/Map/Map"
import { Orders } from "./components/Orders/Orders"
import { OrdersState } from "./redux/orders/ordersSlice"

function App() {
  const { errorMessage, fetchStatus }: OrdersState = useAppSelector(
    (state) => state.orders,
  )

  return (
    <>
      {/* @ts-ignore */}
      <SplitPane split="vertical">
        {/* @ts-ignore */}
        <Pane minSize={"300px"}>
          <Orders />
        </Pane>
        {/* @ts-ignore */}
        <Pane minSize={"300px"}>
          <Map />
        </Pane>
      </SplitPane>
      {fetchStatus === "failed" && (
        <span className={"error"}>{errorMessage}</span>
      )}
    </>
  )
}

export default App
