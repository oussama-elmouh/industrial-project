import { BatteryFull, BatteryLow, BatteryWarning } from 'lucide-react';
import { PlugZap } from 'lucide';
import Navbar from '@/components/Navbar.tsx';

const AlarmList = () => {
  return (
    <div className="h-screen bg-gray-50">
      <Navbar />

      <div className="mt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8">
            {alarms.map((alarm) => (
              <div
                key={alarm.condition}
                className="rounded-lg border bg-white px-6 py-4 shadow-sm"
              >
                <div className="flex h-full flex-col justify-between gap-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-3">
                        <img
                          className="size-12"
                          src="/icons/charging.png"
                          alt="charing"
                        />

                        <div>
                          <h3 className="font-bold text-gray-700">
                            {alarm.condition}
                          </h3>
                          <div className="text-gray-500">Eaton</div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-500">Now</div>
                    </div>

                    <p className="text-sm">{alarm.action}</p>
                  </div>

                  <div>
                    <button className="w-1/2 cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmList;

const alarms = [
  {
    condition: 'Battery mode',
    action:
      'The UPS is powering the equipment with battery power. Prepare your equipment for shutdown.',
    icon: BatteryFull,
  },
  {
    condition: 'Battery low',
    action:
      "This warning is approximate, and the actual time to shutdown may vary significantly. Depending on the UPS load and number of Extended Battery Modules (EBMs), the 'Battery Low' warning may occur before the batteries reach 20% capacity.",
    icon: BatteryLow,
  },
  {
    condition: 'No battery',
    action:
      'Verify that all batteries are properly connected. If the condition persists, contact your service representative.',
    icon: PlugZap,
  },
  {
    condition: 'Battery fault',
    action:
      'Verify that all batteries are properly connected. Start a new battery test: if the condition persists, contact your service representative.',
    icon: BatteryWarning,
  },
  {
    condition: 'The UPS does not provide the expected backup time',
    action:
      'Apply utility power for 48 hours to charge the batteries. If the condition persists, contact your service representative.',
    icon: BatteryWarning,
  },
  {
    condition: 'Bypass mode',
    action:
      'Equipment is powered but not protected by the UPS. Check for one of the following alarms: overtemperature, overload or UPS failure.',
    icon: BatteryWarning,
  },
  {
    condition: 'Power overload',
    action:
      'Remove some of the equipment from the UPS. The UPS continues to operate, but may switch to Bypass mode or shut down if the load increases. The alarm resets when the condition becomes inactive.',
    icon: BatteryWarning,
  },
];
