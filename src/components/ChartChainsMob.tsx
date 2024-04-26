import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJs,
  ArcElement,
  Tooltip,
  Legend,
  PieController,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { NextPage } from "next";

ChartJs.register(ArcElement, Tooltip, Legend, PieController);

const ChartChainsMob = () => {
  const [chartData, setChartData] = useState([]);

  const chartValues = async () => {
    try {
      const response = await axios.get("https://api.llama.fi/protocols");

      const protocols = response.data;
      const dojoswapId = "3965";
      const hydroprotocolId = "4084";
      const astroportId = "3117";
      const helixId = "2259";
      const dojoswap = protocols.find(
        (protocol: { id: string }) => protocol.id === dojoswapId
      );
      const totalTvlDojo = dojoswap.tvl;

      const hydro = protocols.find(
        (protocol: { id: string }) => protocol.id === hydroprotocolId
      );
      const totalTvlHydro = hydro.tvl;

      const astro = protocols.find(
        (protocol: { id: string }) => protocol.id === astroportId
      );
      const totalTvlAstro = astro.tvl;

      const helix = protocols.find(
        (protocol: { id: string }) => protocol.id === helixId
      );
      const totalTvlHelix = helix.tvl;

      // const value = totalTvlAstro + totalTvlDojo + totalTvlHelix + totalTvlHydro;

      const values = [
        totalTvlAstro,
        totalTvlDojo,
        totalTvlHelix,
        totalTvlHydro,
      ];

      setChartData(values as []);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: ["Astroport", "Dojo Swaps", "Helix", "Hydro"],
    datasets: [
      {
        label: "Total Volume",
        data: chartData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(230, 253, 255)",
          "rgb(245, 230, 200)",
          "rgb(205, 92, 92)",
          "rgb(128, 128, 128)",
          "rgb(0, 128, 0)",
          "rgb(255, 165, 0)",
          "rgb(139, 69, 19)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true, // Ensure responsiveness
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    chartValues();
  }, []);

  return (
    <div className=" shadow-xl  p-5 rounded-xl">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ChartChainsMob;
