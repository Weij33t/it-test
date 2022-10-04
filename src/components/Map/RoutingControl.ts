import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

import L, { ControlOptions } from "leaflet"
import { useEffect } from "react"
import { useMap } from "react-leaflet"

interface RoutingControlProps extends ControlOptions {
  start: [number, number]
  end: [number, number]
}

export const RoutingMachine = ({ start, end }: RoutingControlProps) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return () => {}
    // @ts-ignore
    const routingControl = L.Routing.control({
      waypoints: [start, end],
      lineOptions: {
        styles: [
          {
            color: "#757de8",
          },
        ],
      },
      fitSelectedRoutes: true,
    }).addTo(map)
    return () => {
      map.removeControl(routingControl)
    }
  }, [map, start, end])

  return null
}
