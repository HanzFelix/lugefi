"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radar chart";

const chartData = [
  { stat: "STR", value: 186 },
  { stat: "DEX", value: 305 },
  { stat: "AGI", value: 237 },
  { stat: "INT", value: 273 },
  { stat: "VIT", value: 209 },
  { stat: "DEF", value: 214 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--color-cblue)",
  },
} satisfies ChartConfig;

export function ChartRadar() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadarChart data={chartData}>
        <ChartTooltip
          animationDuration={200}
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarAngleAxis dataKey="stat" />
        <PolarGrid />
        <Radar
          dataKey="value"
          fill="var(--color-value)"
          isAnimationActive={false}
        />
      </RadarChart>
    </ChartContainer>
  );
}
