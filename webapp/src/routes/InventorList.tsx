import InvertorCard from '../components/InvertorCardLandscape.tsx';
import { random } from '@/lib/utils.ts';
import { StackedListAlarms } from '@/routes/InventorItem.tsx';
import Navbar from '@/components/Navbar.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

const InventorList = () => {
  return (
    <>
      <Navbar />

      <div className="mx-auto mt-8 max-w-7xl">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="h-[768px]">
              <StackedListAlarms />
            </div>
          </div>

          <div className="col-span-2">
            <div className="h-[768px]">
              <ScrollArea className="h-full">
                <div className="grid grid-cols-1 gap-8">
                  {inverterData.map((data, index) => (
                    <InvertorCard
                      key={index}
                      phases={data.phases}
                      currents={data.currents}
                      voltages={data.voltages}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventorList;

const inverterData = [
  {
    title: 'SUN2000',
    phases: ['L1', 'L2', 'L3'],
    currents: random(50, 60),
    voltages: random(700, 800),
    activePower: 6.2,
    reactivePower: 1.1,
    apparentPower: 6.3,
    activeEnergy: 15.8,
    reactiveEnergy: 2.3,
  },
  {
    title: 'EATON 2',
    phases: ['L1', 'L2', 'L3'],
    currents: random(50, 60),
    voltages: random(700, 800),
    activePower: 5.7,
    reactivePower: 0.9,
    apparentPower: 5.9,
    activeEnergy: 13.2,
    reactiveEnergy: 1.8,
  },
  {
    title: 'EATON 3',
    phases: ['L1', 'L2', 'L3'],
    currents: random(50, 60),
    voltages: random(700, 800),
    activePower: 6.8,
    reactivePower: 1.3,
    apparentPower: 7.0,
    activeEnergy: 17.4,
    reactiveEnergy: 2.7,
  },
  {
    title: 'EATON 4',
    phases: ['L1', 'L2', 'L3'],
    currents: random(50, 60),
    voltages: random(700, 800),
    activePower: 5.1,
    reactivePower: 0.8,
    apparentPower: 5.3,
    activeEnergy: 12.1,
    reactiveEnergy: 1.5,
  },
];
