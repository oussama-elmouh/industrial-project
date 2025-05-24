import { cn } from '@/lib/utils';
import { BatteryFull, BatteryLow, BatteryWarning, PlugZap } from 'lucide-react';
import Navbar from '@/components/Navbar.tsx';

export default function AlarmList() {
  return (
    <div>
      <Navbar />

      <div className="mx-auto mt-16 max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {alarms.map((alarm) => (
            <div
              key={alarm.condition}
              className="relative rounded-lg bg-white p-6 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-inset"
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    alarm.iconBackground,
                    alarm.iconForeground,
                    'inline-flex rounded-lg p-3 ring-4 ring-white',
                  )}
                >
                  <alarm.icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <span className="text-sm text-gray-500">Now</span>
              </div>
              <div className="mt-8">
                <h3 className="text-base leading-6 font-semibold text-gray-900">
                  <a href="#" className="focus:outline-none">
                    {alarm.condition}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">{alarm.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const alarms = [
  {
    condition: 'Battery mode',
    action:
      'The UPS is powering the equipment with battery power. Prepare your equipment for shutdown.',
    icon: BatteryFull,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    date: '2025-05-17T10:00:00Z', // ISO 8601 timestamp
  },
  {
    condition: 'Battery low',
    action:
      "This warning is approximate, and the actual time to shutdown may vary significantly. Depending on the UPS load and number of Extended Battery Modules (EBMs), the 'Battery Low' warning may occur before the batteries reach 20% capacity.",
    icon: BatteryLow,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    date: '2025-05-17T10:05:00Z',
  },
  {
    condition: 'No battery',
    action:
      'Verify that all batteries are properly connected. If the condition persists, contact your service representative.',
    icon: PlugZap,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
    date: '2025-05-17T10:10:00Z',
  },
  {
    condition: 'Battery fault',
    action:
      'Verify that all batteries are properly connected. Start a new battery test: if the condition persists, contact your service representative.',
    icon: BatteryWarning,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
    date: '2025-05-17T10:15:00Z',
  },
  {
    condition: 'The UPS does not provide the expected backup time',
    action:
      'Apply utility power for 48 hours to charge the batteries. If the condition persists, contact your service representative.',
    icon: BatteryWarning,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
    date: '2025-05-17T10:20:00Z',
  },
  {
    condition: 'Bypass mode',
    action:
      'Equipment is powered but not protected by the UPS. Check for one of the following alarms: overtemperature, overload or UPS failure.',
    icon: BatteryWarning,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    date: '2025-05-17T10:25:00Z',
  },
  {
    condition: 'Power overload',
    action:
      'Remove some of the equipment from the UPS. The UPS continues to operate, but may switch to Bypass mode or shut down if the load increases. The alarm resets when the condition becomes inactive.',
    icon: BatteryWarning,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    date: '2025-05-17T10:30:00Z',
  },
  {
    condition: 'Power overload',
    action:
      'Remove some of the equipment from the UPS. The UPS continues to operate, but may switch to Bypass mode or shut down if the load increases. The alarm resets when the condition becomes inactive.',
    icon: BatteryWarning,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    date: '2025-05-17T10:30:00Z',
  },
  {
    condition: 'Power overload',
    action:
      'Remove some of the equipment from the UPS. The UPS continues to operate, but may switch to Bypass mode or shut down if the load increases. The alarm resets when the condition becomes inactive.',
    icon: BatteryWarning,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    date: '2025-05-17T10:30:00Z',
  },
  {
    condition: 'Power overload',
    action:
      'Remove some of the equipment from the UPS. The UPS continues to operate, but may switch to Bypass mode or shut down if the load increases. The alarm resets when the condition becomes inactive.',
    icon: BatteryWarning,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    date: '2025-05-17T10:30:00Z',
  },
  {
    condition: 'Power overload',
    action:
      'Remove some of the equipment from the UPS. The UPS continues to operate, but may switch to Bypass mode or shut down if the load increases. The alarm resets when the condition becomes inactive.',
    icon: BatteryWarning,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    date: '2025-05-17T10:30:00Z',
  },
];
