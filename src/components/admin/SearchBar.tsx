import * as React from 'react';
import { InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

type SearchParams = {
  keyword: string;
  setKeyword: Function;
}

const SearchBar: React.FC<SearchParams> = ({keyword, setKeyword}) => {
  return (
    <TextField
      value={keyword}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
      }}
      id="input-with-icon-textfield"
      placeholder="Search with keyword"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      size="small"
    />
  );
}

export default SearchBar;