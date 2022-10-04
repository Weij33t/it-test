import cities from "cities.json"

interface ICityRaw {
  country: string
  name: string
  lat: string
  lng: string
}

export interface ICity extends Omit<ICityRaw, "lat" | "lng"> {
  lat: number
  lng: number
  id: number
}

export const fetchCities = (): Promise<ICity[]> => {
  return Promise.resolve(
    (cities as Array<ICityRaw>)
      .slice(0, 15)
      .map((c, index) => ({ ...c, id: index, lat: +c.lat, lng: +c.lng })),
  )
}
