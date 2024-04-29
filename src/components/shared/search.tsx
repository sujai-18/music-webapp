import React from "react";
import { AutoComplete } from "antd";
import { searchMusicApi } from "../../api/api";
import { debounce } from "lodash";
import { useAppSelector } from "../../hooks/reduxhooks";

const Search: React.FC = () => {
  // Fetching search options from Redux store
  const searchOptions = useAppSelector(
    (state) => state.commonReducer.searchOptions
  );
  // Creating a debounced version of the search API function
  const debouncedSearchMusicApi = debounce((text) => {
    searchMusicApi({ value: text });
  }, 500);

  // Handler function for searching
  const handleSearch = (text: string) => {
    debouncedSearchMusicApi(text);
  };

  return (
    <AutoComplete
      style={{ width: 200 }}
      options={searchOptions}
      placeholder="try to type `b`"
      // Custom filter function to match options with input value
      filterOption={(inputValue, option) =>
        typeof option?.value === "string" &&
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onSearch={handleSearch}
      onSelect={(text) => searchMusicApi({ value: text })}
    />
  );
};

export default Search;
