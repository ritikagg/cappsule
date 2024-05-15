import React from "react";
import { LeftArrow, SearchIcon } from "../icons";
import { APIResponse } from "../utils";

type SearchBarProps = {
  onSearch: (query: string) => void;
  setResponse: React.Dispatch<React.SetStateAction<APIResponse | null>>;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
};

export const SearchBar = ({
  onSearch,
  setResponse,
  isSearching,
  setIsSearching,
}: SearchBarProps) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value !== "") {
      setIsSearching(true);
      onSearch(event.currentTarget.value);
    }
  };

  const handleSearchButtonClick = () => {
    const inputElement = document.getElementById(
      "searchInput",
    ) as HTMLInputElement;
    if (inputElement && inputElement.value !== "") {
      onSearch(inputElement.value);
      setIsSearching(true);
    }
  };

  const handleOnChange = () => {
    setIsSearching(false);
  };

  const handleBackClick = () => {
    setIsSearching(false);
    const inputElement = document.getElementById(
      "searchInput",
    ) as HTMLInputElement;
    if (inputElement && isSearching) {
      inputElement.value = "";
      setResponse(null);
    }
  };

  return (
    <div
      className="flex h-16 w-full items-center justify-center rounded-full pl-6 pr-12"
      style={{
        boxShadow:
          "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
      }}
    >
      <div className="flex w-full items-center gap-8 pr-8">
        <div
          className={isSearching ? "cursor-pointer" : ""}
          onClick={handleBackClick}
        >
          {isSearching ? (
            <LeftArrow className="h-6 w-6" />
          ) : (
            <SearchIcon className="h-6 w-6" />
          )}
        </div>
        <input
          id="searchInput"
          type="text"
          placeholder="Type your medicine name here"
          className="h-16 w-full text-xl focus:outline-none"
          onKeyDown={handleKeyPress}
          onChange={handleOnChange}
        />
      </div>
      <button
        className="font-bold text-[#2A527A]"
        onClick={handleSearchButtonClick}
        // disabled={isSearching}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
