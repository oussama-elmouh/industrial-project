import { calculateRealPower, cn, random } from '@/lib/utils.ts';
import CurrentChart from '@/components/charts/CurrentChart.tsx';
import VoltageChart from '@/components/charts/VoltageChart.tsx';
import RealPower from '@/components/charts/RealPower.tsx';
import { alarms } from '@/routes/AlarmList.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar.tsx';

const data = Array.from({ length: 24 }).map(() => ({
  phases: ['L1', 'L2', 'L3'],
  currents: random(50, 60),
  voltages: random(700, 800),
}));

const currents = data.map((i) => i.currents);
const voltages = data.map((i) => i.voltages);
const realPowerValues = data.map((i) =>
  calculateRealPower(i.voltages[0], i.currents[0]),
);

const InventorItem = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto mt-8 max-w-7xl">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="space-y-4">
              <StackedListAlarms />
            </div>
          </div>

          <div className="col-span-2">
            <Tabs defaultValue="current">
              <TabsList className="w-full">
                <TabsTrigger className="cursor-pointer" value="current">
                  Courant
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="voltage">
                  Tension
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="realPower">
                  Puissance active
                </TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                <CurrentChart currents={currents} />
              </TabsContent>

              <TabsContent value="voltage">
                <VoltageChart voltages={voltages} />
              </TabsContent>

              <TabsContent value="realPower">
                <RealPower realPowerValues={realPowerValues} />
              </TabsContent>
            </Tabs>

            {/*<InventorCard {...data[data.length - 1]} />*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventorItem;

export const StackedListAlarms = () => {
  return (
    <div className="h-full rounded bg-white py-6 shadow">
      <ScrollArea className="h-full px-8">
        <h3 className="mb-6 text-2xl font-bold text-gray-700">Alarmes</h3>
        <ul role="list" className="divide-y divide-gray-100">
          {[...alarms].map((alarm) => (
            <li
              key={alarm.condition}
              className="flex justify-between gap-x-4 py-5 first:pt-0"
            >
              <div>
                <h3 className="font-medium">{alarm.condition}</h3>
                <time dateTime={alarm.date} className="text-sm text-gray-500">
                  {formatDate(new Date(alarm.date))}
                </time>
              </div>
              <div>
                <span
                  className={cn(
                    alarm.iconBackground,
                    alarm.iconForeground,
                    'inline-flex rounded-lg p-3 ring-4 ring-white',
                  )}
                >
                  <alarm.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

const formatDate = (date: Date) => {
  return date.toLocaleString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
