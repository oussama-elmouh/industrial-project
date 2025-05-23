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
  realPower: {
    label: 'Puissance active',
    color: '#ff0000',
  },
} satisfies ChartConfig;

const RealPower = ({
  realPowerValues: values,
}: {
  realPowerValues: number[];
}) => {
  const realPower = values.map((realPower, index) => ({
    hour: new Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
    }).format(index + 1),
    realPower: Math.round(realPower),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Puissance active</CardTitle>
        <CardDescription>Aujourd'hui</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config}>
          <LineChart accessibilityLayer data={realPower}>
            <CartesianGrid vertical={false} />
            <XAxis
              unit="h"
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis domain={['auto', 'auto']} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="w-48" />}
            />
            <Line
              dataKey="realPower"
              type="natural"
              stroke={`#2563eb`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RealPower;
