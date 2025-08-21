import { VercelRequest, VercelResponse } from '@vercel/node';

// Mock machine data for demo
const mockMachines = [
  {
    id: "M001",
    name: "CNC Machine A1",
    status: "online",
    temperature: 68.5,
    vibration: 0.3,
    humidity: 45.2,
    powerUsage: 12.5,
    uptime: "14d 6h 23m",
    lastMaintenance: "2024-01-15",
  },
  {
    id: "M002",
    name: "Assembly Line 1",
    status: "online",
    temperature: 72.1,
    vibration: 0.8,
    humidity: 48.1,
    powerUsage: 28.3,
    uptime: "12d 14h 45m",
    lastMaintenance: "2024-01-12",
  },
  {
    id: "M003",
    name: "Welding Station B",
    status: "warning",
    temperature: 85.2,
    vibration: 1.2,
    humidity: 52.8,
    powerUsage: 15.8,
    uptime: "8d 2h 17m",
    lastMaintenance: "2024-01-18",
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Return mock machine data
  res.status(200).json({ machines: mockMachines });
}