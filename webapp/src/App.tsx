import FeatureCard from './components/FeatureCard.tsx';
import { Link } from 'react-router';

function App() {
  return (
    <div className="h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="grid h-screen place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link to="solar-energy">
            <FeatureCard
              title="Énérgie solaire"
              image="/svgs/solar-energy.svg"
            />
          </Link>

          <FeatureCard
            title="Station météo"
            image="/svgs/weather-station.svg"
          />

          <FeatureCard title="Rapports" image="/svgs/report.svg" />

          <FeatureCard title="Alarmes" image="/svgs/alert.svg" />
        </div>
      </div>
    </div>
  );
}

export default App;
