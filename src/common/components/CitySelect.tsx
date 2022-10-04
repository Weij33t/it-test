import { Select } from "antd"
import React from "react"

import { useAppSelector } from "../hooks/hooks"

export interface CitySelectProps {
  item: number
  onChange: (cityId: number) => void
}

export const CitySelect: React.FC<CitySelectProps> = ({ item, onChange }) => {
  const store = useAppSelector((state) => state)
  const cities = store.orders.cities

  return (
    <Select value={item} style={{ width: "100%" }} onChange={onChange}>
      {cities.map((city) => (
        <Select.Option key={city.id} value={city.id}>
          {city.name}
        </Select.Option>
      ))}
    </Select>
  )
}
