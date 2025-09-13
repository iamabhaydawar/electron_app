import { useMemo, useState, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import './App.css'
import { useStatistics } from './useStatistics';
import { Chart } from './Chart';


function App() {
  const [count, setCount] = useState(0)
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<'CPU' | 'RAM' | 'Storage'>('CPU');
  const cpuUsages = useMemo(() => statistics.map((stat) => stat.CPUUsage), [statistics]);
  const ramUsages = useMemo(() => statistics.map((stat) => stat.RAMUsage), [statistics]);
  const storageUsages = useMemo(() => statistics.map((stat) => stat.StorageUsage), [statistics]);
  const activeUsages = useMemo(() => {
    switch (activeView) {
      case 'CPU':
        return cpuUsages;
      case 'RAM':
        return ramUsages;
      case 'Storage':
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);
  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);
  
  return (
    
    <div className='App'>
      <div style={{height:120}}> 
          <Chart data={
            activeUsages
          } maxDataPoints={10}/>
      </div>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the React logo to learn more
      </p>
    </div>
  )
}

export default App
