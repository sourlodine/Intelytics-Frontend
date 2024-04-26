import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { OverviewTable, OverviewTableMobile } from "@/components/OverviewTable";
import Charted from "@/components/ChartComponent";
import App from "@/components/TestChart";
import SearchBar from "@/components/Searchbar";
import InjectiveChart from "@/components/InjectiveChart";

const overview = () => {
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
  const [injprice, setInjPrice] = useState<string>();
  const [injcap, setInjCap] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");

        const response4 = await axios.get("https://api.llama.fi/v2/chains");
        const chains = response4.data;
        // const response5 = await axios.get(
        //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
        // );
        // const coingeckoAPI = response5.data;
        // const injectiveCoin = coingeckoAPI.find(
        //   (coin) => coin.id === "injective-protocol"
        // );
        // const injectivePrice = injectiveCoin.current_price;
        // const injectiveMarketCap = injectiveCoin.market_cap;
        // console.log(injectivePrice);
        // console.log(injectiveMarketCap);

        const response6 = await axios.get(
          "https://coins.llama.fi/prices/current/ethereum:0xe28b3b32b6c345a34ff64674606124dd5aceca30,secret:secret14706vxakdzkz9a36872cs62vpl5qd84kpwvpew,binance-smart-chain:0xa2b726b1145a4773f68593cf171187d8ebe4d495,cosmos:ibc%2F64BA6E31FE887D66C6F8F31C7B1A80C7CA179239677B4088BB55F5EA07DBE273?searchWidth=4h"
        );

        const price =
          response6.data.coins[
            "ethereum:0xe28b3b32b6c345a34ff64674606124dd5aceca30"
          ].price;
        console.log(price);

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
        const formatted10 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(values);
        setTotalTVL(formatted10);

        const injective = chains.find(
          (chain: any) => chain.gecko_id === "injective-protocol"
        );
        const injectiveTvl = injective.tvl;

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
        }).format(injectiveTvl);

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

        const formatted5 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(price);
        setInjPrice(formatted5);

        // const formatted6 = new Intl.NumberFormat("en-US", {
        //   style: "currency",
        //   currency: "USD",
        //   minimumFractionDigits: 2,
        //   maximumFractionDigits: 2,
        // }).format(injectiveMarketCap);
        // setInjCap(formatted6);
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

      {/* button block
      <div className=" bg-black p-3 px-5 rounded-xl flex gap-4">
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
      <div className="bg-black p-5 px-5 rounded-xl flex flex-col-reverse lg:flex-row gap-5 justify-between">
        {/* left */}
        <div className="lg:py-6 lg:px-2  flex gap-2 flex-col lg:w-1/3 w-full">
          <div className=" lg:text-gray-400 hidden lg:inline">
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
          <div className="flex justify-between">
            <div>INJ Price</div>
            <div>{injprice}</div>
          </div>
          <div className="flex justify-between ">
            {/* <div>INJ Market Cap</div> */}
            {/* <div>{injcap}</div> */}
          </div>
        </div>

        {/* right */}
        <div className=" flex flex-col">
          {/* <Charted height={200} width={600} /> */}
          <div className="lg:px-3 lg:text-xl lg:inline hidden">
            Injective Total Value Locked
          </div>
          <InjectiveChart />
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
        <OverviewTable />
      </div>
      <div className="inline lg:hidden">
        <OverviewTableMobile />
      </div>
    </div>
  );
};

export default overview;
