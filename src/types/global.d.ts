declare interface ScaleData {
    weight: number | null,
    humidity: number | null,
    timestamp: number
  }

declare interface Scale {
    name: string,
    position: string,
    id: string,
    data: ScaleData[]
  }