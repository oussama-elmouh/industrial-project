import InventorCard from '@/components/InvertorCardPortrait.tsx';
import { cn, random } from '@/lib/utils.ts';
import CurrentChart from '@/components/charts/CurrentChart.tsx';
import VoltageChart from '@/components/charts/VoltageChart.tsx';
import ActivePower from '@/components/charts/ActivePower.tsx';
import { alarms } from '@/routes/AlarmList.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

const data = Array.from({ length: 24 }).map(() => ({
  current: random(50, 60),
  voltage: random(700, 800),
}));

const currents = data.map((i) => i.current);
const voltages = data.map((i) => i.voltage);

const InventorItem = () => {
  return (
    <div className="h-screen bg-gray-50">
      <div className="p-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <div className="space-y-4">
              <InventorCard {...data[data.length - 1]} />
              <StackedListAlarms />
            </div>
          </div>

          <div className="col-span-9">
            <div className="grid grid-cols-2 gap-4">
              <CurrentChart currents={currents} />
              <VoltageChart voltages={voltages} />
              <ActivePower />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorItem;

const StackedListAlarms = () => {
  return (
    <ScrollArea className="h-96 rounded bg-white px-8 py-4 shadow">
      <ul role="list" className="divide-y divide-gray-100">
        {alarms.map((alarm) => (
          <li
            key={alarm.condition}
            className="flex justify-between gap-x-4 py-5"
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
