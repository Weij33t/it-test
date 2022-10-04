import React from "react"
import SplitPane, { Pane } from "react-split-pane-next"

import "./App.css"
import { useAppSelector } from "./app/hooks"
import { Map } from "./components/Map/Map"
import { Orders } from "./features/orders/Orders"

function App() {
  const error: string | undefined = useAppSelector(
    (state) => state.orders.errorMessage,
  )

  return (
    <>
      {/* @ts-ignore */}
      <SplitPane split="vertical">
        {/* @ts-ignore */}
        <Pane minSize={"200"}>
          <Orders />
        </Pane>
        {/* @ts-ignore */}
        <Pane>
          <Map />
        </Pane>
      </SplitPane>
      {error && <span className={"error"}>{error}</span>}
    </>
  )
}

export default App
