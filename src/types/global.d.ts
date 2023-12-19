import { LatLngTuple } from "leaflet"
import { ReactNode } from "react"

declare interface ScaleData {
  weight: number | null,
  humidity: number | null,
  timestamp: number,
  serial: string
}

declare interface Scale {
  serial: number,
  location: LatLong,
  sc1mcoeffc: number,
  sc2mcoeffc: number,
  sc3mcoeffc: number,
  sc4mcoeffc: number,
  sc1tcoeffc: number,
  sc2tcoeffc: number,
  sc3tcoeffc: number,
  sc4tcoeffc: number,
  sc1tara: number,
  sc2tara: number,
  sc3tara: number,
  sc4tara: number,
}

declare interface LatLong {
  latitude: number,
  longitude: number
}

declare interface ScaleLocation {
  name: string,
  scales: Scale[]
}

declare interface AuthProviderValue {
  login: (email: string, password: string) => Promise<boolean>,
  logout: () => Promise<Boolean>,
  createAccount: (email: string, password: string) => Promise<boolean>,
  user: User | null,
}

declare interface AcceptChildren {
  children: ReactNode
}