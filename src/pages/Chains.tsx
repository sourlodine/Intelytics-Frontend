import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { ChainsTable, ChainsTableMob } from "@/components/ChainsTable";
import ChartChains from "@/components/ChartChains";
import SearchBar from "@/components/Searchbar";
import ChartChainsMob from "@/components/ChartChainsMob";

const Chains = () => {
  const [selected, setSelected] = useState<string>("all");

  const allClicked = () => {
    setSelected("all");
  };

  const ethClicked = () => {
    setSelected("eth");
  };

  const injClicked = () => {
    setSelected("inj");
  };

  const [totalTVL, setTotalTVL] = useState<string>();
  const [stable, setStable] = useState<string>();
  const [volume, setVolume] = useState<string>();
  const [funding, setFunding] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");

        const response4 = await axios.get("https://api.llama.fi/v2/chains");
        const chains = response4.data;

        const injective = chains.find(
          (chain: any) => chain.gecko_id === "injective-protocol"
        );
        const injectiveTvl = injective.tvl;

        const response7 = await axios.get(
          "https://api.llama.fi/v2/historicalChainTvl/Injective"
        );

        const protocols2 = response7.data;
        console.log(protocols2);

        const values: any = [];
        const tvl2 = [];
        tvl2.push(...protocols2.slice(-1));
        tvl2.forEach((data: any) => {
          values.push(data.tvl);
        });
        console.log(values);

        // Protocol (TVL) API Testing.
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

        const value =
          totalTvlAstro + totalTvlDojo + totalTvlHelix + totalTvlHydro;
        const dex = totalTvlAstro + totalTvlDojo;
        const der = totalTvlHelix;
        const liq = totalTvlHydro;

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(values);

        setTotalTVL(formatted);

        const formatted2 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(dex);
        setStable(formatted2);

        const formatted3 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(der);
        setVolume(formatted3);

        const formatted4 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(liq);
        setFunding(formatted4);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
      // setRefetch(!refetch);
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className=" flex gap-4 flex-col">
      {/* <div>DEFI-overview</div> */}

      <SearchBar />

      <div className=" lg:text-lg text-sm  lg:p-3 p-2 border-2 border-yellow-600 rounded-2xl">
        Currently tracking protocols on Injective only, More Chains are coming
        soon!!
      </div>

      {/* button block */}
      {/* <div className=" bg-black p-3 px-5 rounded-xl flex gap-4">
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={allClicked}>
          All
        </button>
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={ethClicked}>
          ETH
        </button>
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={injClicked}>
          INJ
        </button>
      </div> */}

      {/* graph card */}
      <div className="bg-black p-5 px-5 rounded-xl flex flex-col-reverse lg:flex-row  justify-between w-full">
        {/* left */}
        <div className="lg:py-6 lg:px-2  flex gap-2 flex-col lg:w-1/4 w-full">
          <div className=" text-gray-400 hidden lg:inline">
            Injective Total Value Locked
          </div>
          <div className=" text-4xl hidden lg:inline">{totalTVL}</div>
          <div className="flex justify-between pt-4">
            <div>Top Protocols TVL</div>
            <div>{stable}</div>
          </div>
          <div className="flex justify-between  ">
            <div>Volume</div>
            <div>{volume}</div>
          </div>
          <div className="flex justify-between  ">
            <div>Liquid Staking</div>
            <div>{funding}</div>
          </div>
        </div>

        {/* right */}
        {/* <div className=" flex justify-center w-3/4">Graph</div> */}
        <div className="hidden lg:inline px-10">
          <ChartChains />
        </div>
        <div className="px-10 inline lg:hidden">
          <ChartChainsMob />
        </div>

        <div className="lg:hidden flex flex-col ">
          <div className=" text-gray-400 text-sm inline lg:hidden ">
            Injective Total Value Locked
          </div>
          <div className=" text-3xl inline lg:hidden ">{totalTVL}</div>
        </div>
      </div>

      {/* table options */}
      
      <div className="hidden lg:inline">
      <ChainsTable />
      </div>
      <div className="inline lg:hidden">
        <ChainsTableMob/>
      </div>
    </div>
  );
};

export default Chains;
