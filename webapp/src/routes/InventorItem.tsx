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
import InventorCard from '@/components/InvertorCard';

interface Inventor {
  title: string;
  phases: [string, string, string];
  currents: number[];
  voltages: number[];
}

interface ChartData {
  hour: number;
  phase1: number;
  phase2: number;
  phase3: number;
}

const randomValue = (min: number, max: number) => {
  return Math.random()
}

const idk = [
  {
    currents: [50, 51, 52],
    voltages: [700, 701, 702],
  },
  {
    currents: [50, 51, 52],
    voltages: [700, 701, 702],
  },
  {
    currents: [50, 51, 52],
    voltages: [700, 701, 702],
  },
];

idk.map()

const chartData: ChartData[] = [];

for (let i = 1; i <= 24; i++) {
  chartData.push({
    hour: i,
    phase1: 54 + Math.floor(Math.random() * 5),
    phase2: 54.2 + Math.floor(Math.random() * 5),
    phase3: 54.4 + Math.floor(Math.random() * 5),
  });
}

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
    <div className="h-screen overflow-auto bg-gray-50">
      <div className="mx-auto max-w-7xl p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <InventorCard {...data[0]} />

          {Array.from({ length: 1 }).map((_, i) => (
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
                      dataKey="hour"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      // tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis domain={[50, 60]} />
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
  );
};

export default InventorItem;

const data: Inventor[] = [
  {
    title: 'SUN2000',
    phases: ['L1', 'L2', 'L3'],
    currents: [21.9, 22.1, 22.5],
    voltages: [230, 229, 231],
  },
];
