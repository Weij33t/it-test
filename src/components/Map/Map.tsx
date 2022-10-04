import React from "react"
import { MapContainer, TileLayer } from "react-leaflet"

import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import {
  citySelector,
  selectedOrderSelector,
} from "../../features/orders/ordersSlice"
import { RoutingMachine } from "./RoutingControl"

export const Map = () => {
  const state: RootState = useAppSelector((state) => state)
  const selectedOrder = selectedOrderSelector(state, state.orders.selectedOrder)
  const cityStart = citySelector(state, selectedOrder?.from)
  const cityEnd = citySelector(state, selectedOrder?.to)

  const center: [number, number] = cityStart
    ? [cityStart.lat, cityStart.lng]
    : [51, 51]

  return (
    <MapContainer style={{ height: "100vh" }} zoom={8} center={center}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cityEnd && cityStart && (
        <RoutingMachine
          start={[cityStart.lat, cityStart.lng]}
          end={[cityEnd.lat, cityEnd.lng]}
        />
      )}
    </MapContainer>
  )
}
