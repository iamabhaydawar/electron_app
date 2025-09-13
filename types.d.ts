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
type View ='CPU' | 'RAM' | 'Storage';

export type EventPayloadMapping = {
    statistics:Statistics,
    getStaticData:StaticData,
    changeView:View,
}

export type Unsubscribe = () => void;

declare global {
  interface Window {
    electron: {
      subscribeStatistics: (callback: (statistics: Statistics) => void) => Unsubscribe,
      getStaticData: () => Promise<StaticData>
      subscribeChangeView: (callback: (view: View) => void) => Unsubscribe,
    }
  }
}