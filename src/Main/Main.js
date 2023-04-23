import React, {useState} from 'react';
import Search from '../Search/Search';
import AdList from './AdList';
import { Container } from "@mui/material";


export default function Main() {
  const [searchInput, setSearchInput] = useState('');
  const [searchLocality, setSearchLocality] = useState(0);

  const handleSearch = (searchValue, searchLocality) => {
    setSearchInput(searchValue);
    setSearchLocality(searchLocality);
  }

  return (
    <Container>
      <Search onSearchChange={handleSearch} />
      <AdList searchInput={searchInput} searchLocality={searchLocality} />
    </Container>
  )
}
