export type Statistics = {
    CPUUsage:number,
    RAMUsage: number,
    StorageUsage:number,
    cpuModel:string,
    totalMemoryGB:number,
}
export type StaticData = {
    totalStorage:number,
    cpuModel:string,
    totalMemoryGB:number,
}
export type EventPayloadMapping = {
    statistics:Statistics,
    getStaticData:StaticData,
}

export type Unsubscribe = () => void;

declare global {
  interface Window {
    electron: {
      subscribeStatistics: (callback: (statistics: Statistics) => void) => Unsubscribe,
      getStaticData: () => Promise<StaticData>
    }
  }
}