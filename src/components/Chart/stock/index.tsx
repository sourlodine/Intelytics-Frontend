"use client";
import React, { useMemo, useState } from "react";
import {
  BarSeries,
  CandlestickSeries,
  Chart,
  ChartCanvas,
  CrossHairCursor,
  CurrentCoordinate,
  EdgeIndicator,
  LineSeries,
  MouseCoordinateX,
  MouseCoordinateY,
  MovingAverageTooltip,
  OHLCTooltip,
  XAxis,
  YAxis,
  ZoomButtons,
  discontinuousTimeScaleProviderBuilder,
  elderRay,
  ema,
  lastVisibleItemBasedZoomAnchor,
} from "react-financial-charts";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { useTheme } from "next-themes";

import { IOHLCData } from "@/services/market/types";
import { StockChartProps } from "./types";
import { darkChartStyle, lightChartStyle } from "./styles";

function StockChart({
  data: initialData,
  dateTimeFormat = "%d %b '%y \xa0 %H:%M",
  height = 320,
  width = 800,
  ratio = 3,
}: StockChartProps) {
  const {
    axisStyles,
    coordinateStyles,
    zoomButtonStyles,
    crossHairStyles,
    movingAverageStyle,
  } = darkChartStyle;
  const [resetCount, setResetCount] = useState(0);

  const timeDisplayFormat = timeFormat(dateTimeFormat);
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };
  const pricesDisplayFormat = format(".2f");
  const xScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d: IOHLCData) => new Date(d.time)
    );

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: any, c: any) => {
      d.ema12 = c;
    })
    .accessor((d: any) => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d: any, c: any) => {
      d.ema26 = c;
    })
    .accessor((d: any) => d.ema26);

  const elder = elderRay();

  const calculatedData = elder(ema26(ema12(initialData ?? [])));
  const { data, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(calculatedData);

  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  const elderRayHeight = 0;
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_: number, h: number) => [
    0,
    h - barChartHeight - elderRayHeight,
  ];
  const chartHeight = gridHeight - elderRayHeight;

  const barChartExtents = (data: IOHLCData) => {
    return data.volume;
  };

  const candleChartExtents = (data: IOHLCData) => {
    return [data.high, data.low];
  };

  const yEdgeIndicator = (data: IOHLCData) => {
    return data.close;
  };

  const volumeColor = (data: IOHLCData) => {
    return data.close > data.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data: IOHLCData) => {
    return data.volume;
  };

  const openCloseColor = (data: IOHLCData) => {
    // console.log({ data });
    return data.close > data.open ? "#26a69a" : "#ef5350";
  };

  return (
    <ChartCanvas
      height={height}
      ratio={ratio}
      width={width}
      margin={margin}
      data={data}
      displayXAccessor={displayXAccessor}
      seriesName={`Chart ${resetCount}`}
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      zoomAnchor={lastVisibleItemBasedZoomAnchor}
    >
      <Chart
        id={2}
        height={barChartHeight}
        origin={barChartOrigin}
        yExtents={barChartExtents}
      >
        <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
      </Chart>
      <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <XAxis {...axisStyles} showGridLines />
        <YAxis {...axisStyles} showGridLines tickFormat={pricesDisplayFormat} />
        <CandlestickSeries />
        <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
        <CurrentCoordinate
          yAccessor={ema26.accessor()}
          fillStyle={ema26.stroke()}
        />
        <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
        <CurrentCoordinate
          yAccessor={ema12.accessor()}
          fillStyle={ema12.stroke()}
        />
        <MouseCoordinateX
          {...coordinateStyles}
          displayFormat={timeDisplayFormat}
        />
        <MouseCoordinateY
          {...coordinateStyles}
          rectWidth={margin.right}
          displayFormat={pricesDisplayFormat}
        />
        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={openCloseColor}
          lineStroke={openCloseColor}
          displayFormat={pricesDisplayFormat}
          yAccessor={yEdgeIndicator}
        />
        <MovingAverageTooltip
          origin={[8, 24]}
          options={[
            {
              yAccessor: ema26.accessor(),
              type: "EMA",
              stroke: ema26.stroke(),
              windowSize: ema26.options().windowSize,
            },
            {
              yAccessor: ema12.accessor(),
              type: "EMA",
              stroke: ema12.stroke(),
              windowSize: ema12.options().windowSize,
            },
          ]}
          {...movingAverageStyle}
        />
        <ZoomButtons
          onReset={() => setResetCount(resetCount + 1)}
          {...zoomButtonStyles}
        />{" "}
        <OHLCTooltip origin={[8, 16]} textFill={openCloseColor} />
      </Chart>
      <CrossHairCursor {...crossHairStyles} />
    </ChartCanvas>
  );
}

export default StockChart;
