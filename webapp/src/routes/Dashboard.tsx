import Overview from '../components/Overview.tsx';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
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

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

const Dashboard = () => {
  return (
    <>
      <div className="h-screen overflow-auto bg-gray-50">
        <div className="mx-auto max-w-7xl py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="col-span-2">
              <Overview
                title="fuck"
                phases={['L1', 'L2', 'L3']}
                currents={[1, 2, 3]}
                voltages={[4, 5, 6]}
                loadConsumption={[1, 2, 3]}
                MVGridMetering={[1, 2, 3]}
                MVCompensation={[1, 2, 3]}
              />
            </div>

            <div className="col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Puissance active</CardTitle>
                  <CardDescription>Last 24 hours</CardDescription>
                </CardHeader>

                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <LineChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Line
                        dataKey="desktop"
                        type="natural"
                        stroke="var(--color-desktop)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
