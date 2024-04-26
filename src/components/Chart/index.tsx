"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import useInterval from "@/hooks/useInterval";
import useDimensions from "@/hooks/useDimensions";

import StockChart from "./stock";
import Spinner from "@/components/Spinner";
import Switch from "@/components/Switch";
import { MARKET_DATASET } from "@/constants/market";
import { getMarketData, getStockData } from "@/services/market";
import { MarketDataset } from "@/services/market/types";

interface ITradingChart {
  token: string;
}

function TradingChart({ token }: ITradingChart) {
  const [updating, setUpdating] = useState(true);
  const [length, setLength] = useState(500);
  const [chartRef, dimension] = useDimensions();
  const { data, isLoading } = useQuery({
    queryKey: ["marketdata", token],
    queryFn: () => getMarketData({ token, range: 5 }),
  });

  useInterval(() => {
    if (data && updating) {
      const newLength = length + 1;
      setLength(newLength > data.length ? 500 : newLength);
    }
  }, 1000);

  return (
    <div className="flex flex-col w-full h-full bg-gray-900">
      {/* <div className="p-1 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center pr-2">
          <Switch
            label="Live"
            checked={updating}
            onChange={(e) => setUpdating(e.target.checked)}
          />
        </div>
      </div> */}
      <div ref={chartRef} className="w-full h-full relative">
        {!isLoading ? (
          <StockChart
            data={data?.slice(0, length + 1)}
            width={dimension.width}
            height={dimension.height}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default TradingChart;
