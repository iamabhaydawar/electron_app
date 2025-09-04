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
declare global {
  interface Window {
    electron: {
      subscribeStatistics: (callback: (statistics: Statistics) => void) => void,
      getStaticData: () => Promise<StaticData>
    }
  }
}