import {
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
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from 'recharts';
import {random} from "@/lib/utils.ts";

const activePower = Array.from({length: 24}).map((_, index) => (
    {
        hour: new Intl.NumberFormat('en-US', {
            minimumIntegerDigits: 2
        }).format(index + 1),
        value: random(500, 1000)
    }
));

const ActivePower = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Puissance active</CardTitle>
                <CardDescription>Aujourd'hui</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={{
                    activePower: {
                        label: 'Puissance active',
                        color: '#ff0000'
                    }
                }}>
                    <LineChart accessibilityLayer data={activePower}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            unit="h"
                            dataKey="hour"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis domain={['auto', 'auto']}/>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent/>}
                        />
                        <Line
                            dataKey="value"
                            type="natural"
                            stroke={`var(--color-black)`}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default ActivePower;