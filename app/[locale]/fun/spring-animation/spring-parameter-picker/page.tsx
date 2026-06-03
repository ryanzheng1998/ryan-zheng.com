"use client";

import { LineChart } from "@mui/x-charts";
import { Inputs } from "./Inputs";
import { generateCruve } from "./generateCruve";
import { useStore } from "./useStore";

export default function Home() {
  const state = useStore();
  const cruve = generateCruve(state);

  return (
    <div className="grid place-items-center gap-5 p-10">
      <h1 className="text-4xl font-bold">Spring Parameter Picker</h1>
      <Inputs />
      <LineChart
        xAxis={[{ data: cruve.map((_, i) => i * 16), label: "Time (ms)" }]}
        yAxis={[{ label: "Value" }]}
        series={[
          {
            data: cruve,
            connectNulls: true,
            showMark: false,
          },
        ]}
        width={800}
        height={400}
      />
    </div>
  );
}
