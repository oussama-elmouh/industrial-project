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

const config = {
  l1: {
    label: 'L1',
    color: '#2563eb',
  },
  l2: {
    label: 'L2',
    color: '#2563eb',
  },
  l3: {
    label: 'L3',
    color: '#2563eb',
  },
} satisfies ChartConfig;

const CurrentChart = ({ currents }: { currents: number[][] }) => {
  const data = currents.map((current, index) => ({
    hour: new Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
    }).format(index + 1),
    l1: current[0],
    l2: current[1],
    l3: current[2],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courant</CardTitle>
        <CardDescription>Aujourd'hui</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config}>
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              unit="h"
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis domain={['auto', 'auto']} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.keys(config).map((i) => (
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
  );
};

export default CurrentChart;
