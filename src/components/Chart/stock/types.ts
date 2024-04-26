import { IOHLCData } from "@/services/market/types";

export interface StockChartProps {
  data?: IOHLCData[];
  dateTimeFormat?: string;
  height?: number;
  width?: number;
  ratio?: number;
}
