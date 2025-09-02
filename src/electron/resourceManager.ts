import osUtils from 'os-utils';
import os from 'os';
import fs from 'fs';
import { BrowserWindow } from 'electron';
const POLLING_INTERVAL = 500;

export function pollResources(mainWindow:BrowserWindow) {
  setInterval(async() => {
    const cpuUsage = await getCPUUsage();
    const ramUsage = await getRAMUsage();
    const storageUsage = await getStorageData();
    mainWindow.webContents.send('statistics', {cpuUsage, ramUsage, storageUsage:storageUsage.usage});
  },POLLING_INTERVAL);
}

export function getStaticData(){
  const totalStorage = getStorageData().total;
  const cpuModel =os.cpus()[0].model;
  const totalMemoryGB=Math.floor(os.totalmem()/(1024*1024*1024));
  return{
    totalStorage,
    cpuModel,
    totalMemoryGB,
  }
}


function getCPUUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage((percentage) => resolve(percentage));
  });
}

function getRAMUsage() {
  return 1-osUtils.freememPercentage();
}


function getStorageData() {
  // requires node 18
  const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}