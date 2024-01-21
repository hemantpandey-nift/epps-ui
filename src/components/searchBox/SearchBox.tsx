import React from "react";
import "../searchBox/SearchBox.css";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ setSearch }: { setSearch: any }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value);
  };
  return (
    <>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
          className="searchBoxInput"
        />
        <SearchIcon className="searchBoxIcon" />
      </div>
    </>
  );
};
export default SearchBox;
