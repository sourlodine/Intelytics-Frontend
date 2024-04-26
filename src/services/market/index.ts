import { tsvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

import { GetMarketDataParam, IOHLCData, MarketDataset } from "./types";
import api from "@/utils/api";

const parseDate = timeParse("%Y-%m-%d");

const parseData =
  () =>
  (d: any): IOHLCData => {
    const date = parseDate(d.date);
    date ? (d.date = new Date(date)) : (d.date = new Date(Number(d.date)));

    for (const key in d) {
      if (key !== "date" && Object.prototype.hasOwnProperty.call(d, key)) {
        d[key] = +d[key];
      }
    }

    return d;
  };

export async function getStockData(dataSet: MarketDataset) {
  const response = await api(
    `https://raw.githubusercontent.com/reactivemarkets/react-financial-charts/master/packages/stories/src/data/${dataSet}.tsv`
  );
  return tsvParse(response.data, parseData());
}

export async function getMarketData(params: GetMarketDataParam) {
  const response = await api("/getTokenData", {
    params,
  });
  return response.data;
}
