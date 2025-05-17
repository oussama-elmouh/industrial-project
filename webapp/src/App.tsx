import FeatureCard from './components/FeatureCard.tsx';
import { Link } from 'react-router';
import Navbar from '@/components/Navbar.tsx';

function App() {
  return (
    <div className="h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="grid grid-cols-3 gap-16">
          <Link to="inventor-list">
            <FeatureCard
              title="Surveillance des onduleurs"
              image="/svgs/solar-energy.svg"
            />
          </Link>

          <FeatureCard
            title="Station météo"
            image="/svgs/weather-station.svg"
          />

          <FeatureCard
            title="Compensation moyenne tension"
            image="/svgs/weather-station.svg"
          />

          <FeatureCard title="Rapports" image="/svgs/report.svg" />

          <FeatureCard
            title="Système de gestion global"
            image="/svgs/alert.svg"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
