import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import InventorCard from '@/components/InvertorCardPortrait.tsx';
import {random} from "@/lib/utils.ts";

interface Inventor {
  currents: number[];
  voltages: number[];
}

interface ChartData {
  hour: string;
  phase1: number;
  phase2: number;
  phase3: number;
}

const min = 50;
const max = 60;

const data: Inventor[] = Array.from({length: 24}).map(() => ({
  currents: [random(min, max), random(min, max), random(min, max)],
  voltages: [random(min, max), random(min, max), random(min, max)],
}));

const chartData: ChartData[] = data.map((inventor, index) => (
    {
      hour: new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 2
      }).format(index + 1),
      phase1: inventor.currents[0],
      phase2: inventor.currents[1],
      phase3: inventor.currents[2]
    }
));

const chartConfig = {
  phase1: {
    label: 'Phase 1',
    color: '#2563eb',
  },
  phase2: {
    label: 'Phase 2',
    color: '#60a5fa',
  },
  phase3: {
    label: 'Phase 3',
    color: '#ff0000',
  },
} satisfies ChartConfig;

console.log(chartData);

const InventorItem = () => {
  return (
    <div className="h-screen bg-gray-50">
      <div className="p-16">
        <div className="grid gap-8 grid-cols-12">
          <div className="col-span-3">
            <InventorCard {...data[0]} />
          </div>

          <div className="col-span-9">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>Puissance active</CardTitle>
                      <CardDescription>Last 24 hours</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <LineChart accessibilityLayer data={chartData}>
                          <CartesianGrid vertical={false} />
                          <XAxis
                              unit="h"
                              dataKey="hour"
                              tickLine={false}
                              axisLine={false}
                              tickMargin={8}
                              // tickFormatter={(value) => value < 10 ? `0${value}` : value}
                          />
                          <YAxis domain={['auto', 'auto']} />
                          <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent />}
                          />
                          {Object.keys(chartConfig).map((i) => (
                              <Line
                                  dataKey={i}
                                  type="natural"
                                  stroke={`var(--color-${i})`}
                                  strokeWidth={2}
                                  dot={false}
                              />
                          ))}
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorItem;

