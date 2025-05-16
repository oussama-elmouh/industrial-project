export interface InvertorCardProps {
  currents: number[];
  voltages: number[];
}

const InvertorCard = ({
  currents,
  voltages,
}: InvertorCardProps) => {
  return (
    <div className="font-poppins rounded bg-white px-8 py-4 shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-700">Titre</h3>
          <span className="text-xl">
            {Math.random() > 0.5 ? '🟢' : '🔴'}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3">
        <div className="space-y-2">
          <div className="text-gray-600">Phase</div>
          {['L1', 'L2', 'L3'].map((phase, idx) => (
            <div key={idx} className="text-xl text-gray-900">
              {phase}
            </div>
          ))}
        </div>

        <div className="space-y-2 justify-self-center">
          <div className="text-gray-600">Courant</div>
          {currents.map((current, idx) => (
            <div key={idx} className="text-xl font-semibold text-gray-900">
              {current} <span className="text-lg text-gray-900">A</span>
            </div>
          ))}
        </div>

        <div className="space-y-2 justify-self-end text-right">
          <div className="text-gray-600">Tension</div>
          {voltages.map((voltage, idx) => (
            <div key={idx} className="text-xl font-semibold text-gray-900">
              {voltage} <span className="text-lg text-gray-900">V</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <Variable title="Puissance active" value={2} unit="kW" />
        <Variable title="Puissance réactive" value={2} unit="kVAR" />
        <Variable title="Puissance apparente" value={2} unit="kVA" />
        <Variable title="Énergie active" value={2} unit="kWh" />
        <Variable title="Énergie réactive" value={2} unit="kVARh" />
      </div>
    </div>
  );
};

const Variable = ({title, value, unit}: {title: string, value: number, unit: string}) =>  (
    <div className="flex justify-between items-center">
      <div className="text-gray-600">{title}</div>
      <div className="text-xl font-semibold text-gray-900">
        {value} <span className="text-lg text-gray-900">{unit}</span>
      </div>
    </div>
)

export default InvertorCard;
