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