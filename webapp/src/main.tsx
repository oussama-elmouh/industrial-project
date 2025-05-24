import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import InventorList from './routes/InventorList.tsx';
import InventorItem from '@/routes/InventorItem.tsx';
import AlarmList from '@/routes/AlarmList.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="dashboard" element={<InventorList />} />
        <Route path="inventor-item" element={<InventorItem />} />
        <Route path="alarms" element={<AlarmList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
