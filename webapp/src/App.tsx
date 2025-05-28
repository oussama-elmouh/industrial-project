import { BrowserRouter, Route, Routes } from 'react-router';
import Dashboard from './routes/Dashboard.tsx';
import InventorItem from '@/routes/InventorItem.tsx';
import AlarmList from '@/routes/AlarmList.tsx';
import Login from '@/routes/Login.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventor-item" element={<InventorItem />} />
          <Route path="alarms" element={<AlarmList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
