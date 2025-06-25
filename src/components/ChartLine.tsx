"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", commission: 186 },
  { month: "Feb", commission: 305 },
  { month: "Mar", commission: 237 },
  { month: "Apr", commission: 73 },
  { month: "May", commission: 209 },
  { month: "Jun", commission: 214 },
];

const chartConfig = {
  commission: {
    label: "Commission",
    color: "var(--color-cblue)",
  },
} satisfies ChartConfig;

export function ChartLine() {
  return (
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
        />
        <ChartTooltip
          cursor={false}
          animationDuration={200}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          isAnimationActive={false}
          dataKey="commission"
          type="linear"
          stroke="var(--color-commission)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
