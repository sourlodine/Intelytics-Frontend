import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import HelixChart from "@/components/HelixChart";

const helix = () => {
  const [tvl, settvl] = useState<string>();
  const [oned, setoned] = useState<number>();
  const [oneh, setoneh] = useState<number>();
  const [sevd, setsevd] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");
        // const response2 = await axios.get(
        //   "https://api.llama.fi/summary/dexs/astroport?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
        // );
        // // Volume API Testing.
        // const astroportVolume = response2.data;

        // console.log(astroportVolume);
        // const astroport24hVolume = astroportVolume.total24h;

        // console.log(astroport24hVolume);

        // Protocol (TVL) API Testing.
        const protocols = response.data;
        const helixId = "2259";

        const coin = protocols.find(
          (protocol: { id: string }) => protocol.id === helixId
        );
        const formatted2 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(coin.tvl);

        settvl(formatted2);
        setoned(Math.round(coin.change_1d * 100) / 100);
        setoneh(Math.round(coin.change_1h * 100) / 100);
        setsevd(Math.round(coin.change_7d * 100) / 100);
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
    <div className="pt-4 lg:pt-0">
      <div className="lg:flex lg:gap-2   flex items-center  bg-gray-900 rounded-xl p-2">
        <Image
          alt=""
          src={"/Helix.jpg"}
          height={50}
          width={50}
          className=" rounded"
        />
        <a href="https://www.helix.com/" className="lg:p-2">
          <div className=" font-bold lg:text-4xl text-base px-2 "> Helix</div>
          <div className=" text-teal-400 text-sm  px-2">Derivative</div>
        </a>
      </div>

      <div className=" flex flex-col gap-5">
        <div className="flex flex-col-reverse lg:flex-row lg:gap-8 gap-2 lg:mt-10 mt-5 justify-between  bg-gray-900 rounded-xl">
          <div className="px-3 lg:p-7">
            <div className="lg:flex lg:gap-2 lg:pt-5 lg:flex-col hidden">
              <div className="text-xl ">Total Value Locked:</div>
              <div className=" text-3xl pt-1">{tvl}</div>
            </div>
            <div className="flex gap-4 pt-5 justify-between">
              <div className="lg:text-xl text-sm ">1 Hour Change:</div>
              <div
                className={`lg:text-xl text-sm pt-1 ${
                  oneh! < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {oneh}%
              </div>
            </div>
            <div className="flex gap-4 pt-2 justify-between">
              <div className="lg:text-xl text-sm ">24 Hour Change:</div>
              <div
                className={`lg:text-xl text-sm pt-1 ${
                  oned! < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {oned}%
              </div>
            </div>
            <div className="flex gap-4 pt-2 justify-between">
              <div className="lg:text-xl text-sm ">7 Day Change:</div>
              <div
                className={`lg:text-xl text-sm pt-1 ${
                  sevd! < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {sevd}%
              </div>
            </div>

            <div className=" flex flex-col pt-10 pb-5">
              <div className="text-lg">Socials</div>
              <div className=" flex flex-row gap-5 items-center">
                <a href="https://twitter.com/helixapp_">
                  <Image
                    src={"/twitter.png"}
                    alt=""
                    height={20}
                    width={20}
                    className=" pt-5"
                  />
                </a>
                <a href="https://t.me/helixapp">
                  <Image
                    src={"/telegram.png"}
                    alt=""
                    height={30}
                    width={30}
                    className=" pt-5"
                  />
                </a>

                <a href="https://discord.com/invite/injective">
                  <Image
                    src={"/discord.jpg"}
                    alt=""
                    height={25}
                    width={25}
                    className=" pt-5"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className="lg:text-right lg:px-24 px-2 pb-2 pt-6 lg:pt-5 text-sm ">
              Helix Total Value Locked
            </div>
            <HelixChart />
          </div>
          <div className="flex   px-3 pt-5 flex-col lg:hidden ">
            <div className="lg:text-xl text-gray-400 text-sm  ">
              Total Value Locked:
            </div>
            <div className="lg:text-3xl text-2xl pt-1">{tvl}</div>
          </div>
        </div>

        <div className=" px-3 text-xl">Description</div>

        <div className=" p-5 lg:text-xl text-base bg-gray-900 rounded-xl">
          Explore limitless financial possibilities. Helix provides unmatched
          access to global financial primitives, endless on-chain gateways, and
          true institutional liquidity
        </div>
      </div>
    </div>
  );
};

export default helix;
