import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

interface ChartProps {
  data: { time: string; value: number }[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}

const ChartComponent: React.FC<ChartProps> = ({ data, colors = {} }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chart) {
        chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current!, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: colors.backgroundColor || "black",
        },
        textColor: colors.textColor || "white",
      },
      width: chartContainerRef.current!.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor || "#2962FF",
      topColor: colors.areaTopColor || "#2962FF",
      bottomColor: colors.areaBottomColor || "rgba(41, 98, 255, 0.28)",
    });

    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, colors]);

  return <div ref={chartContainerRef} />;
};

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

export function App(props: any) {
  return (
    <ChartComponent data={initialData} colors={{ backgroundColor: "green" }} />
  );
}

export default App;
