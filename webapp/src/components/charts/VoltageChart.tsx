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

const chartConfig = {
  phase: {
    label: 'Tension',
    color: '#2563eb',
  },
} satisfies ChartConfig;

const VoltageChart = ({ voltages }: { voltages: number[] }) => {
  const voltageData = voltages.map((i, index) => ({
    hour: new Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
    }).format(index + 1),
    phase: i,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tension</CardTitle>
        <CardDescription>Aujourd'hui</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={voltageData}>
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
  );
};

export default VoltageChart;
