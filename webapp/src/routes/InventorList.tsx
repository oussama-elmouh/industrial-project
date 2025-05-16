import useWebSocket from 'react-use-websocket';
import InvertorCard from '../components/InvertorCardLandscape.tsx';

interface Inventor {
  title: string;
  currents: [number, number, number];
  voltages: [number, number, number];
}

const InventorList = () => {
  const socketUrl = 'ws://localhost:8080';

  const { lastJsonMessage } = useWebSocket<Inventor>(socketUrl, {
    onOpen: (e) => console.log(e),
  });

  console.log(lastJsonMessage);

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      <div className="mx-auto max-w-7xl p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {inverterData.map((data, index) => (
            <InvertorCard key={index} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventorList;

const inverterData = [
  {
    title: 'SUN2000',
    phases: ['L1', 'L2', 'L3'],
    currents: [21.9, 22.1, 22.5],
    voltages: [230, 229, 231],
    activePower: 6.2,
    reactivePower: 1.1,
    apparentPower: 6.3,
    activeEnergy: 15.8,
    reactiveEnergy: 2.3,
  },
  {
    title: 'EATON 2',
    phases: ['L1', 'L2', 'L3'],
    currents: [19.5, 20.0, 20.3],
    voltages: [228, 227, 229],
    activePower: 5.7,
    reactivePower: 0.9,
    apparentPower: 5.9,
    activeEnergy: 13.2,
    reactiveEnergy: 1.8,
  },
  {
    title: 'EATON 3',
    phases: ['L1', 'L2', 'L3'],
    currents: [23.1, 23.4, 23.7],
    voltages: [231, 230, 232],
    activePower: 6.8,
    reactivePower: 1.3,
    apparentPower: 7.0,
    activeEnergy: 17.4,
    reactiveEnergy: 2.7,
  },
  {
    title: 'EATON 4',
    phases: ['L1', 'L2', 'L3'],
    currents: [18.0, 18.5, 18.9],
    voltages: [226, 225, 227],
    activePower: 5.1,
    reactivePower: 0.8,
    apparentPower: 5.3,
    activeEnergy: 12.1,
    reactiveEnergy: 1.5,
  },
];
