import InventorCard from '@/components/InvertorCardPortrait.tsx';
import { calculateRealPower, cn, random } from '@/lib/utils.ts';
import CurrentChart from '@/components/charts/CurrentChart.tsx';
import VoltageChart from '@/components/charts/VoltageChart.tsx';
import RealPower from '@/components/charts/RealPower.tsx';
import { alarms } from '@/routes/AlarmList.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
      <div className="h-screen bg-gray-50">
        <div className="p-16">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <div className="space-y-4">
                <InventorCard {...data[data.length - 1]} />
              </div>
            </div>

            <div className="col-span-6">
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
            </div>

            <div className="col-span-3">
              <StackedListAlarms />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventorItem;

const StackedListAlarms = () => {
  return (
    <div className="rounded bg-white py-4 shadow">
      <h3 className="mb-6 px-8 text-2xl font-bold text-gray-700">Alarmes</h3>
      <ScrollArea className="h-[576px] px-8">
        <ul role="list" className="divide-y divide-gray-100">
          {[...alarms, ...alarms].map((alarm) => (
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
