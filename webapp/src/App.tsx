import FeatureCard from './components/FeatureCard.tsx';
import { Link } from 'react-router';
import Navbar from '@/components/Navbar.tsx';

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl">
        <div className="grid h-screen place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link to="/dashboard">
            <FeatureCard
              title="Surveillance des onduleurs"
              image="/images/inventor.png"
            />
          </Link>

          <FeatureCard
            title="Service d'environnement"
            image="/svgs/weather-station.svg"
          />

          <FeatureCard title="Diagnosics" image="/svgs/report.svg" />

          <FeatureCard title="Alarms" image="/svgs/alert.svg" />
        </div>
      </div>
    </>
  );
}

export default App;
