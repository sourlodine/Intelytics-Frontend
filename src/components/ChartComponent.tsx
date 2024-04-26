import React, { useEffect, useState } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  LineElement,
} from "chart.js";
import axios from "axios";
import { Bar, Line, Scatter, Bubble } from "react-chartjs-2";
import { NextPage } from "next";

ChartJs.register(
  CategoryScale,
  LinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

interface Props {
  height: string | number | undefined;
  width: string | number | undefined;
}

const Charted = ({ height, width }: any) => {
  const [chartData, setChartData] = useState([]);
  const chartValues = async () => {
    try {
      const response = await axios.get(
        "https://api.llama.fi/protocol/hydro-protocol"
      );

      const protocols = response.data;
      console.log(protocols.chainTvls.Injective.tvl);
      const tvl = protocols.chainTvls.Injective.tvl;
      const values: any = [];
      tvl.forEach((data:any) => {
        values.push(data.totalLiquidityUSD);
      });
      console.log(values);
      // console.log(values);

      //   const formatted = new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //     minimumFractionDigits: 2,
      //     maximumFractionDigits: 2,
      //   }).format(value);

      // const values = [onehr, oneday, sevenday];
      setChartData(values as []);
      // console.log(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    datasets: [
      {
        label: "Total Value Locked",
        data: chartData,
        fill: true,
        // fill: 'origin',

        // fillColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(23,34,62)",
        borderColor: "rgb(41,96,250)",
        tension: 0.3,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value: any) {
            return "$" + value / 1000000 + "M";
          },
        },
      },
    },
  };
  useEffect(() => {
    chartValues();
  }, []);
  return (
    <div className=" shadow-xl lg:w-[50vw]  lg:h-[50vh] w-[84vw] lg:p-4 rounded-xl">
      <Line data={data} options={options} width={width} height={height} />
    </div>
  );
};

export default Charted;
