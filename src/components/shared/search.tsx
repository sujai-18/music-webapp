import React from "react";
import { AutoComplete } from "antd";
import { searchMusicApi } from "../../api/api";
import { debounce } from "lodash";
import { useAppSelector } from "../../hooks/reduxhooks";

const Search: React.FC = () => {
    const searchOptions = useAppSelector((state) => state.commonReducer.searchOptions);
  const debouncedSearchMusicApi = debounce((text) => {
    searchMusicApi({ value: text });
  }, 500);

  const handleSearch = (text: string) => {
    debouncedSearchMusicApi(text);
  };

  return (
    <AutoComplete
      style={{ width: 200 }}
      options={searchOptions}
      placeholder="try to type `b`"
      filterOption={(inputValue, option) =>
        typeof option?.value === 'string' && option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onSearch={handleSearch}
      onSelect={(text) => searchMusicApi({ value: text })}
    />
  );
};

export default Search;
