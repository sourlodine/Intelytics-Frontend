import { useRouter } from "next/router";
import { contents } from "./content";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
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

import { Line } from "react-chartjs-2";
import TradingChart from "@/components/Chart";

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

export default function tokenName() {
  const router = useRouter();
  const slug = String(router.query.slug).toLowerCase();
  const [price, setPrice] = useState();
  const [marketCap, setMarketCap] = useState<any>();
  const [v24, setv24] = useState();
  const [min5, setMin5] = useState<any>();
  const [hour1, setHr1] = useState();
  const [hour24, sethour24] = useState();
  const [cs, setCs] = useState();
  const [ts, setTs] = useState();

  const [pricesel, setPriceSelected] = useState<Boolean>(true);
  const [volsel, setVolSelected] = useState<Boolean>(false);

  const PriceClicked = () => {
    setPriceSelected(true);
    setVolSelected(false);
  };
  const VolumeClicked = () => {
    setVolSelected(true);
    setPriceSelected(false);
  };

  return (
    <>
      {contents[slug] && (
        <>
          <div className="h-screen lg:flex lg:flex-row flex-col  justify-start">
            <div className=" left h-screen lg:px-4 lg:w-1/6 lg:pt-8 pb-4 lg:flex hidden gap-6 flex-col bg-gradient-to-b from-black to-[#0e1734] ">
              <div className="flex items-center justify-between">
                <Link
                  onClick={() => {
                    // setVisible(false);
                  }}
                  href={"/"}
                >
                  <Image
                    className="w-[10rem] h-[1.5rem]"
                    src={"/logo.png"}
                    alt="Intelitics logo"
                    height={100}
                    width={100}
                  />
                </Link>
                <button
                  onClick={() => {
                    // setVisible(false);
                  }}
                  className=" -translate-y-[10%] text-6xl font-light hover:text-gray-400 select-none rotate-45 block lg:hidden  text-white "
                >
                  +
                </button>
              </div>

              <div className=" bg-gray-900 p-4 rounded-xl">
                <div className=" text-gray-400 text-sm">Token Info</div>
                <div className="flex gap-2 pt-3 items-center">
                  <Image
                    alt=""
                    src={`/${contents[slug].name}.jpg`}
                    height={40}
                    width={40}
                    className=" rounded-full"
                  />
                  <div className=" flex flex-col ">
                    <a href=" " className=" flex items-center gap-1">
                      <div className="text-lg font-bold ">
                        {" "}
                        {contents[slug].name}
                      </div>
                      <div>/</div>
                      <div className=" flex items-center gap-1">
                        <Image
                          alt=""
                          src="/inj.png"
                          height={20}
                          width={20}
                          className=" rounded-full"
                        />
                        <div className=" font-bold ">INJ</div>
                      </div>
                    </a>
                    <div className=" text-teal-400  text-sm">
                      {contents[slug].category}
                    </div>
                  </div>
                </div>
                <div className=" pt-4 flex justify-between w-full items-center">
                  <div className=" text-sm">Add to your watchlist</div>
                  <Image src="/star.png" alt="" height={20} width={20} />
                </div>
                <div className=" flex flex-col gap-2 mt-4">
                  {/* <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>5 min Change</div>
                    <div>${min5}</div>
                  </div> */}
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>1 hr Change</div>
                    <div>{hour1}%</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>24 hr Change</div>
                    <div>{hour24}%</div>
                  </div>
                </div>
                <div className=" flex flex-col gap-1 pt-4">
                  <div>Links:</div>
                  <div className=" flex text-xs gap-2">
                    <div className=" p-1 bg-gray-700 rounded">Website</div>
                    <div className=" p-1 bg-gray-700 rounded">Whitepaper</div>
                    <div className=" p-1 bg-gray-700 rounded">GitHub</div>
                  </div>
                </div>
              </div>

              <div className=" bg-gray-900 p-4 rounded-xl">
                <div className=" text-gray-400 text-sm pb-4">Market Info</div>
                <div className=" flex flex-col gap-4">
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Market Cap</div>
                    {marketCap}
                    {/* {price && 
                    (
                      <div>${price * contents[slug].circulatingSupply}</div>
                    )} */}
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Volume (24h)</div>
                    <div>{v24}</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Total Supply</div>
                    <div>{ts}</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300 items-center">
                    <div>Circulating Supply</div>
                    <div>{cs}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" right px-6 lg:pt-16 pt-5 pb-4 text-white lg:w-5/6 w-full overflow-y-scroll no-scrollbar">
              <div className="bg-gray-900 p-4 rounded-xl w-full lg:hidden mobile-card">
                <div className="flex gap-2 pt-3 items-center">
                  <Image
                    alt=""
                    src={`/${contents[slug].name}.jpg`}
                    height={40}
                    width={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col ">
                    <a href=" " className=" flex items-center gap-1">
                      <div className="text-lg font-bold ">
                        {" "}
                        {contents[slug].name}
                      </div>
                      <div>/</div>
                      <div className=" flex items-center gap-1">
                        <Image
                          alt=""
                          src="/inj.png"
                          height={20}
                          width={20}
                          className=" rounded-full"
                        />
                        <div className=" font-bold ">INJ</div>
                      </div>
                    </a>
                    <div className=" text-teal-400  text-sm">
                      {contents[slug].category}
                    </div>
                  </div>
                </div>
                <div className="pl-10">${price}</div>
                <div className="pt-8">
                  {/* <TradingChart token={contents[slug].symbol} /> */}
                  <div className=" flex gap-3 w-full items-center justify-center pt-3">
                    <div
                      className={` rounded p-1 pl-3 pr-3 ${
                        pricesel ? "bg-gray-500  " : " bg-gray-800"
                      }`}
                      onClick={PriceClicked}
                    >
                      Price
                    </div>
                    <div
                      className={`  rounded p-1 pl-3 pr-3  ${
                        volsel ? "bg-gray-500 " : "bg-gray-800"
                      }`}
                      onClick={VolumeClicked}
                    >
                      Volume
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col gap-4 mt-4">
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>1 hr Change</div>
                    <div>{hour1}%</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>24 hr Change</div>
                    <div>{hour24}%</div>
                  </div>
                  {/* <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>7 Day Change</div>
                    <div>${contents[slug].totalSupply}</div>
                  </div> */}
                </div>
              </div>
              <div className=" bg-gray-900 p-4 rounded-xl w-full lg:hidden mobile-card mt-5">
                <div className=" text-gray-400 text-sm">Token Info</div>
                <div className="flex gap-2 pt-3">
                  <Image
                    alt=""
                    src={`/${contents[slug].name}.jpg`}
                    height={30}
                    width={30}
                    className=" rounded-full"
                  />
                  <a href=" " className=" flex items-center gap-1">
                    <div className="text-lg font-bold ">
                      {" "}
                      {contents[slug].name}
                    </div>
                    <div>/</div>
                    <div className=" text-teal-400 ">
                      {contents[slug].category}
                    </div>
                  </a>
                </div>

                <div className=" flex flex-col gap-1 pt-4 w-full ">
                  <div className="text-sm">Links:</div>
                  <div className=" flex text-xs gap-2 w-full justify-between">
                    <div className=" p-1 bg-gray-700 rounded pl-4 pr-4">
                      Website
                    </div>
                    <div className=" p-1 bg-gray-700 rounded pl-4 pr-4">
                      Whitepaper
                    </div>
                    <div className=" p-1 bg-gray-700 rounded pl-4 pr-4">
                      GitHub
                    </div>
                  </div>
                </div>
                <div className=" text-gray-400  pb-4 pt-4">Market Info</div>
                <div className=" flex flex-col gap-4">
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Market Cap</div>
                    {marketCap}
                    {/* {price && (
                      <div>${price * contents[slug].circulatingSupply}</div>
                    )} */}
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Volume (24h)</div>
                    <div>{v24}</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Total Supply</div>
                    <div>{ts}</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300 items-center">
                    <div>Circulating Supply</div>
                    <div>{cs}</div>
                  </div>
                </div>
              </div>
              <div className="w-full hidden lg:flex lg:flex-row flex-col gap-3 mt-5 bg-white dark:bg-gray-900 flex-1 rounded h-[500px]">
                {/* <div className=" lg:w-1/2 w-full bg-gray-900 rounded-xl p-6">
                  <div className=" w-full flex justify-between">
                    <div className="font-bold lg:text-xl">Price Chart</div>

                    <div className="">Price : {price}</div>
                  </div>
                  <div className=" lg:translate-y-6 lg:pl-2 text-left text-gray-500">
                    {contents[slug].name} . Price . Intelytics
                  </div>
                  <PriceChart />
                </div>
                <div className=" lg:w-1/2 w-full bg-gray-900 rounded-xl p-6">
                  <div className="font-bold lg:text-xl">Volume Chart</div>
                  <div className=" w-full">
                    <div className=" lg:translate-y-6 lg:pl-2 text-left  text-gray-500">
                      {contents[slug].name} . Volume . Intelytics
                    </div>
                    <VolumeChart />
                  </div>
                </div> */}
                <TradingChart token={contents[slug].symbol} />
              </div>
              <div className="pt-4 lg:pt-8 w-1/4">
                <div className="flex gap-2 pt-3 items-center bg-gray-900 rounded-xl p-3">
                  <Image
                    alt=""
                    src={`/${contents[slug].name}.jpg`}
                    height={40}
                    width={40}
                    className=" rounded-full"
                  />
                  <div className=" flex flex-col ">
                    <a href=" " className=" flex items-center gap-1">
                      <div className="text-lg font-bold ">
                        {" "}
                        {contents[slug].name}
                      </div>
                      <div>/</div>
                      <div className=" flex items-center gap-1">
                        <Image
                          alt=""
                          src="/inj.png"
                          height={20}
                          width={20}
                          className=" rounded-full"
                        />
                        <div className=" font-bold ">INJ</div>
                      </div>
                    </a>
                    <div className=" text-teal-400  text-sm">
                      {contents[slug].category}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 lg:pt-6">
                <div className=" text-3xl font-bold pb-4">Description</div>
                <div className="bg-gray-900 rounded-xl pt-6 pb-6 pl-4 pr-4 w-full">
                  <div className=" font-bold lg:text-xl pb-2">About</div>
                  <div className=" lg:text-sm text-xs text-gray-400">
                    {contents[slug].description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!contents[slug] && <>ERROR 404</>}
    </>
  );
}
