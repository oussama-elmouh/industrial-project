import InventorCard from '@/components/InvertorCardPortrait.tsx';
import {random} from "@/lib/utils.ts";
import CurrentChart from "@/components/charts/CurrentChart.tsx";
import VoltageChart from "@/components/charts/VoltageChart.tsx";
import ActivePower from "@/components/charts/ActivePower.tsx";
import ReactivePower from "@/components/charts/ReactivePower.tsx";

const data = Array.from({length: 24}).map(() => ({
    currents: [random(50, 60), random(50, 60), random(50, 60)],
    voltages: [random(700, 800), random(700, 800), random(700, 800)],
}));

const currents = data.map(i => i.currents);
const voltages = data.map(i => i.voltages);

const InventorItem = () => {
    return (
        <div className="h-screen bg-gray-50">
            <div className="p-16">
                <div className="grid gap-8 grid-cols-12">
                    <div className="col-span-3">
                        <InventorCard {...data[data.length - 1]} />
                    </div>

                    <div className="col-span-9">
                        <div className="grid grid-cols-2 gap-4">
                            <CurrentChart currents={currents} />
                            <VoltageChart voltages={voltages} />
                            <ActivePower />
                            <ReactivePower />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventorItem;
