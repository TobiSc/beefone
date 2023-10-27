import { ReactNode } from "react"

declare interface ScaleData {
  weight: number | null,
  humidity: number | null,
  timestamp: number
}

declare interface Scale {
  name: string,
  location: string,
  id: string,
  data: ScaleData[]
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