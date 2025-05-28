import InvertorCard from '../components/InvertorCardLandscape.tsx';
import { calculate } from '@/lib/utils.ts';
import { StackedListAlarms } from '@/routes/InventorItem.tsx';
import Navbar from '@/components/Navbar.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import useWebsocket from 'react-use-websocket';

interface Response {
  title: string;
  currents: number[];
  voltages: number[];
  timestamp: string;
}

interface Inventor {
  title: string;
  currents: number[];
  voltages: number[];
  timestamp: string;
  phases: string[];
  activePower: number;
  reactivePower: number;
  apparentPower: number;
  activeEnergy: number;
  reactiveEnergy: number;
}

const socketUrl = 'ws://localhost:8000/ws/data';

const Dashboard = () => {
  const { lastJsonMessage } = useWebsocket<Response[]>(socketUrl);
  let inventors: Inventor[] = [];

  if (lastJsonMessage) {
    inventors = lastJsonMessage.map((message) => {
      return {
        ...message,
        ...calculate(message.voltages[0], message.currents[0]),
        phases: ['L1', 'L2', 'L3'],
      };
    });
  }

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
                  {inventors.map((data, index) => (
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

export default Dashboard;
