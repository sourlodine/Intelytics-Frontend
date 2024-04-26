"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Coin = {
  name: string;
  category: string;
  tvl: number | string;
  "1 Hour Change": number;
  "24 Hours Change": number;
  "7 Days Change": number;
  volume: number | string;
};

export function OverviewTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // const data: Coin[] = [
  //   {
  //     name: "Dojo Swap",
  //     category: "Dex",
  //     tvl: 23.4,
  //     "1 Hour Change": 23.4,
  //     "24 Hours Change": 66.4,
  //     "7 Days Change": 29.1,
  //     volume: 25.2,
  //   },
  //   {
  //     name: "Astroport",
  //     category: "Dex",
  //     tvl: 21.4,
  //     "1 Hour Change": 23.4,
  //     "24 Hours Change": 77.4,
  //     "7 Days Change": 30.1,
  //     volume: 22.1,
  //   },
  //   {
  //     name: "Helix",
  //     category: "Deriviative",
  //     tvl: 21.4,
  //     "1 Hour Change": 23.4,
  //     "24 Hours Change": 77.4,
  //     "7 Days Change": 30.1,
  //     volume: 22.1,
  //   },
  //   {
  //     name: "Hydro",
  //     category: "Liquid Stacking",
  //     tvl: 21.4,
  //     "1 Hour Change": 23.4,
  //     "24 Hours Change": 77.4,
  //     "7 Days Change": 30.1,
  //     volume: 22.1,
  //   },
  //   // ...
  // ];

  const columns: ColumnDef<Coin>[] = [
    //   {
    //     id: "select",
    //     header: ({ table }) => (
    //       <Checkbox
    //         checked={
    //           table.getIsAllPageRowsSelected() ||
    //           (table.getIsSomePageRowsSelected() && "indeterminate")
    //         }
    //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //         aria-label="Select all"
    //       />
    //     ),
    //     cell: ({ row }) => (
    //       <Checkbox
    //         checked={row.getIsSelected()}
    //         onCheckedChange={(value) => row.toggleSelected(!!value)}
    //         aria-label="Select row"
    //       />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    //   },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className=" flex gap-2 items-center">
          <Image
            alt=""
            src={`/${row.getValue("name")}.jpg`}
            width={30}
            height={30}
            className=" rounded"
          />

          <Link href={`/${row.getValue("name")}`}>
            {" "}
            <div className="capitalize text-white">{row.getValue("name")}</div>
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize text-teal-300">
          {row.getValue("category")}
        </div>
      ),
    },
    {
      accessorKey: "tvl",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            TVL
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("tvl"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);

        return <div className=" text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "1 Hour Change",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            1 Hour Change
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("1 Hour Change"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return (
          <div
            className={`text-center font-medium  ${
              amount < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {row.getValue("1 Hour Change")} %
          </div>
        );
      },
    },
    {
      accessorKey: "24 Hours Change",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            24 Hours Change
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("24 Hours Change"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return (
          <div
            className={`text-center font-medium  ${
              amount < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {row.getValue("24 Hours Change")} %
          </div>
        );
      },
    },
    {
      accessorKey: "7 Days Change",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            7 Days Change
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("7 Days Change"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return (
          <div
            className={`text-center font-medium  ${
              amount < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {row.getValue("7 Days Change")} %
          </div>
        );
      },
    },
    {
      accessorKey: "volume",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Volume
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("volume"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        if (row.getValue("volume") == "-")
          return <div className=" text-center font-medium">-</div>;

        return <div className=" text-center font-medium">{formatted}</div>;
      },
    },
    //   {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //       const payment = row.original;

    //       return (
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button variant="ghost" className="h-8 w-8 p-0">
    //               <span className="sr-only">Open menu</span>
    //               <DotsHorizontalIcon className="h-4 w-4" />
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end">
    //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //             <DropdownMenuItem
    //               onClick={() => navigator.clipboard.writeText(payment.id)}
    //             >
    //               Copy payment ID
    //             </DropdownMenuItem>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem>View customer</DropdownMenuItem>
    //             <DropdownMenuItem>View payment details</DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       );
    //     },
    //   },
  ];

  const [data, setdata] = useState<Coin[]>([]);

  // const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");
        const response2 = await axios.get(
          "https://api.llama.fi/summary/dexs/astroport?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
        );
        const response3 = await axios.get(
          "https://api.llama.fi/summary/dexs/helix?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
        );
        // Volume API Testing.
        const astroportVolume = response2.data;
        const astroport24hVolume = astroportVolume.total24h;
        const helixVolume = response3.data;
        const helix24hVolume = helixVolume.total24h;

        // console.log(astroport24hVolume);

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
        const oneDayDojo = dojoswap.change_1d;
        const oneHourDojo = dojoswap.change_1h;
        const sevenDayDojo = dojoswap.change_7d;

        const hydro = protocols.find(
          (protocol: { id: string }) => protocol.id === hydroprotocolId
        );
        const totalTvlHydro = hydro.tvl;
        const oneDayHydro = hydro.change_1d;
        const oneHourHydro = hydro.change_1h;
        const sevenDayHydro = hydro.change_7d;

        const astro = protocols.find(
          (protocol: { id: string }) => protocol.id === astroportId
        );
        const totalTvlAstro = astro.tvl;
        const oneDayAstro = astro.change_1d;
        const oneHourAstro = astro.change_1h;
        const sevenDayAstro = astro.change_7d;

        const helix = protocols.find(
          (protocol: { id: string }) => protocol.id === helixId
        );
        const totalTvlHelix = helix.tvl;
        const oneDayHelix = helix.change_1d;
        const oneHourHelix = helix.change_1h;
        const sevenDayHelix = helix.change_7d;

        const data: Coin[] = [
          {
            name: "Dojo-Swap",
            category: "Dex",
            tvl: Math.round(totalTvlDojo * 100) / 100,
            "1 Hour Change": Math.round(oneDayDojo * 100) / 100,
            "24 Hours Change": Math.round(oneHourDojo * 100) / 100,
            "7 Days Change": Math.round(sevenDayDojo * 100) / 100,
            volume: "-",
          },
          {
            name: "Astroport",
            category: "Dex",
            tvl: Math.round(totalTvlAstro * 100) / 100,
            "1 Hour Change": Math.round(oneDayAstro * 100) / 100,
            "24 Hours Change": Math.round(oneHourAstro * 100) / 100,
            "7 Days Change": Math.round(sevenDayAstro * 100) / 100,
            volume: Math.round(astroport24hVolume * 100) / 100,
          },
          {
            name: "Helix",
            category: "Derivative",
            tvl: Math.round(totalTvlHelix * 100) / 100,
            "1 Hour Change": Math.round(oneDayHelix * 100) / 100,
            "24 Hours Change": Math.round(oneHourHelix * 100) / 100,
            "7 Days Change": Math.round(sevenDayHelix * 100) / 100,
            volume: Math.round(helix24hVolume * 100) / 100,
          },
          {
            name: "Hydro",
            category: "Liquid Staking",
            tvl: Math.round(totalTvlHydro * 100) / 100,
            "1 Hour Change": Math.round(oneDayHydro * 100) / 100,
            "24 Hours Change": Math.round(oneHourHydro * 100) / 100,
            "7 Days Change": Math.round(sevenDayHydro * 100) / 100,
            volume: "-",
          },
          // ...
        ];
        setdata(data);
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

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full pb-8">
      <div className="flex items-center py-4">
        <div className="bg-black p-3 px-5 rounded-xl flex gap-4 w-full justify-between">
          <div className="flex items-center gap-4">
            <Image src="./protocolranking.svg" alt="" height={30} width={30} />
            <div className=" font-semibold ">Protocol Ranking </div>
          </div>

          <div className=" flex gap-4">
            {/* column dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="ml-auto ">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    // console.log(column.)
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tvl dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="ml-auto ">
                  TVL Range <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  key={1}
                  className="capitalize"
                  // checked={setState}
                  // onCheckedChange={(value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  1 Hr
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  key={2}
                  className="capitalize"
                  // checked={setState}
                  // onCheckedChange={(value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  24 Hrs
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  key={3}
                  className="capitalize"
                  // checked={setState}
                  // onCheckedChange={(value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  7 D
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-black"
        /> */}
      </div>
      <div className="rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className=" text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}

export function OverviewTableMobile() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Coin>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className=" flex gap-2 items-center">
          <Image
            alt=""
            src={`/${row.getValue("name")}.jpg`}
            width={30}
            height={30}
            className=" rounded"
          />

          <Link href={`/${row.getValue("name")}`}>
            {" "}
            <div className="capitalize text-white">{row.getValue("name")}</div>
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize text-teal-300">
          {row.getValue("category")}
        </div>
      ),
    },
    {
      accessorKey: "tvl",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            TVL
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("tvl"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);

        return <div className=" text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "1 Hour Change",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            1 Hour Change
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("1 Hour Change"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return (
          <div
            className={`text-center font-medium  ${
              amount < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {row.getValue("1 Hour Change")} %
          </div>
        );
      },
    },
  ];

  const [data, setdata] = useState<Coin[]>([]);

  // const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");
        const response2 = await axios.get(
          "https://api.llama.fi/summary/dexs/astroport?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
        );
        const response3 = await axios.get(
          "https://api.llama.fi/summary/dexs/helix?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
        );
        // Volume API Testing.
        const astroportVolume = response2.data;
        const astroport24hVolume = astroportVolume.total24h;
        const helixVolume = response3.data;
        const helix24hVolume = helixVolume.total24h;

        // console.log(astroport24hVolume);

        // Protocol (TVL) API Testing.
        const protocols = response.data;
        const dojoswapId = "3965";
        const hydroprotocolId = "4084";
        const astroportId = "3117";
        const helixId = "2259";
        const dojoswap = protocols.find(
          (protocol: { id: string }) => protocol.id === dojoswapId
        );
        const formatted4 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(dojoswap.tvl);
        const totalTvlDojo = formatted4;
        const oneDayDojo = dojoswap.change_1d;
        const oneHourDojo = dojoswap.change_1h;
        const sevenDayDojo = dojoswap.change_7d;

        const hydro = protocols.find(
          (protocol: { id: string }) => protocol.id === hydroprotocolId
        );
        const formatted3 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(hydro.tvl);
        const totalTvlHydro = formatted3;
        const oneDayHydro = hydro.change_1d;
        const oneHourHydro = hydro.change_1h;
        const sevenDayHydro = hydro.change_7d;

        const astro = protocols.find(
          (protocol: { id: string }) => protocol.id === astroportId
        );
        const formatted2 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(astro.tvl);
        const totalTvlAstro = formatted2;
        const oneDayAstro = astro.change_1d;
        const oneHourAstro = astro.change_1h;
        const sevenDayAstro = astro.change_7d;

        const helix = protocols.find(
          (protocol: { id: string }) => protocol.id === helixId
        );
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(helix.tvl);
        const totalTvlHelix = formatted;
        const oneDayHelix = helix.change_1d;
        const oneHourHelix = helix.change_1h;
        const sevenDayHelix = helix.change_7d;

        const data: Coin[] = [
          {
            name: "Dojo-Swap",
            category: "Dex",
            tvl: totalTvlDojo,
            "1 Hour Change": Math.round(oneDayDojo * 100) / 100,
            "24 Hours Change": Math.round(oneHourDojo * 100) / 100,
            "7 Days Change": Math.round(sevenDayDojo * 100) / 100,
            volume: "-",
          },
          {
            name: "Astroport",
            category: "Dex",
            tvl: totalTvlAstro,
            "1 Hour Change": Math.round(oneDayAstro * 100) / 100,
            "24 Hours Change": Math.round(oneHourAstro * 100) / 100,
            "7 Days Change": Math.round(sevenDayAstro * 100) / 100,
            volume: Math.round(astroport24hVolume * 100) / 100,
          },
          {
            name: "Helix",
            category: "Derivative",
            tvl: totalTvlHelix,
            "1 Hour Change": Math.round(oneDayHelix * 100) / 100,
            "24 Hours Change": Math.round(oneHourHelix * 100) / 100,
            "7 Days Change": Math.round(sevenDayHelix * 100) / 100,
            volume: Math.round(helix24hVolume * 100) / 100,
          },
          {
            name: "Hydro",
            category: "Liquid Staking",
            tvl: totalTvlHydro,
            "1 Hour Change": Math.round(oneDayHydro * 100) / 100,
            "24 Hours Change": Math.round(oneHourHydro * 100) / 100,
            "7 Days Change": Math.round(sevenDayHydro * 100) / 100,
            volume: "-",
          },
          // ...
        ];
        setdata(data);
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

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full pb-8">
      <div className="flex items-center py-4">
        <div className="bg-black p-3 px-5 rounded-xl flex gap-4 w-full justify-between">
          <div className="flex items-center gap-4">
            <Image src="./protocolranking.svg" alt="" height={30} width={30} />
            <div className=" font-semibold ">Protocol Ranking </div>
          </div>

          <div className=" lg:flex gap-4  hidden">
            {/* column dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="ml-auto ">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    // console.log(column.)
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tvl dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="ml-auto ">
                  TVL Range <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  key={1}
                  className="capitalize"
                  // checked={setState}
                  // onCheckedChange={(value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  1 Hr
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  key={2}
                  className="capitalize"
                  // checked={setState}
                  // onCheckedChange={(value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  24 Hrs
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  key={3}
                  className="capitalize"
                  // checked={setState}
                  // onCheckedChange={(value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  7 D
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-black"
        /> */}
      </div>
      {/* <div className="rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className=" text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div> */}

      <div>
        {data.map((coin, index) => (
          <div className=" bg-gray-900 rounded p-4">
            <div className=" flex items-center justify-between">
              <div className=" flex items-center">
                <Image
                  alt=""
                  src={`/${coin.name}.jpg`}
                  height={30}
                  width={30}
                  className=" rounded"
                />
                <div className="flex flex-col px-2">
                  <Link href={`/${coin.name}`}>
                    <h4>{coin.name}</h4>
                  </Link>
                  <p className="text-teal-300 text-sm">{coin.category}</p>
                </div>
              </div>
              <div>
                <p>{coin.tvl}</p>
                <p
                  className={` text-right  font-medium  ${
                    coin["1 Hour Change"] < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {" "}
                  {coin["1 Hour Change"]}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
