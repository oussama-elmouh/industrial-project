import { BatteryFull } from 'lucide-react';
import { InvertorCardProps } from './InvertorCard';

interface Overview extends InvertorCardProps {
  loadConsumption: number[];
  MVGridMetering: number[];
  MVCompensation: number[];
}

const Overview = ({
  title,
  phases,
  currents,
  voltages,
  loadConsumption,
  MVGridMetering,
  MVCompensation,
}: Overview) => {
  return (
    <div className="font-poppins rounded bg-white px-8 py-4 shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-700">{title}</h3>
        <BatteryFull className="size-12 text-green-600" />
      </div>

      <div className="mt-6 grid grid-cols-3">
        <div className="space-y-2">
          <div className="text-gray-600">Phase</div>
          {phases.map((phase, idx) => (
            <div key={idx} className="text-xl text-gray-900">
              {phase}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-gray-600">Courant</div>
          {currents.map((current, idx) => (
            <div key={idx} className="text-xl font-semibold text-gray-900">
              {current} <span className="text-lg text-gray-900">A</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-gray-600">Tension</div>
          {voltages.map((voltage, idx) => (
            <div key={idx} className="text-xl font-semibold text-gray-900">
              {voltage} <span className="text-lg text-gray-900">V</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-y-4">
        <div>
          <div className="text-gray-600">Puissance active</div>
          <div className="text-xl font-semibold text-gray-900">
            {2} <span className="text-lg text-gray-900">kW</span>
          </div>
        </div>

        <div>
          <div className="text-gray-600">Puissance réactive</div>
          <div className="text-xl font-semibold text-gray-900">
            {2} <span className="text-lg text-gray-900">kVAR</span>
          </div>
        </div>

        <div>
          <div className="text-gray-600">Puissance apparente</div>
          <div className="text-xl font-semibold text-gray-900">
            {2} <span className="text-lg text-gray-900">kVA</span>
          </div>
        </div>

        <div>
          <div className="text-gray-600">Énergie active</div>
          <div className="text-xl font-semibold text-gray-900">
            {2} <span className="text-lg text-gray-900">kWh</span>
          </div>
        </div>

        <div>
          <div className="text-gray-600">Énergie réactive</div>
          <div className="text-xl font-semibold text-gray-900">
            {2} <span className="text-lg text-gray-900">kVARh</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-y-4">
        <div>
          <div className="text-gray-600">Compensation charge</div>
          <div className="text-xl font-semibold text-gray-900">
            {2} <span className="text-lg text-gray-900">kVARh</span>
          </div>
        </div>

        <div>
          <div className="text-gray-600">Réseau MT comptage</div>
          <div className="text-xl font-semibold text-gray-900">
            {2} <span className="text-lg text-gray-900">kVARh</span>
          </div>
        </div>

        <div>
          <div className="text-gray-600">Compensation MT</div>
          <div className="text-xl font-semibold text-gray-900">
            {2} <span className="text-lg text-gray-900">kVARh</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
