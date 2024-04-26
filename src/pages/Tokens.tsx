import SearchBar from "@/components/Searchbar";
import { TokensTable } from "@/components/TokensTable";
import React from "react";

const Tokens = () => {
  return (
    <div className=" flex gap-4 flex-col">
      {/* <div>DEFI-overview</div> */}

      <SearchBar />
      <TokensTable />
    </div>
  );
};

export default Tokens;
