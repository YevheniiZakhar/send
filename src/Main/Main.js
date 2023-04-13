import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import AdList from './AdList';
import { Container } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Main() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchLocality, setSearchLocality] = useState(0);

  const handleAdd = () => {
      navigate("/add")
  }

  // const handleProfile= () => {
  //   navigate("/profile")
  // }

  const handleSearch = (searchValue, searchLocality) => {
    setSearchInput(searchValue);
    setSearchLocality(searchLocality);
  }

  return (
    <Container>
      {/* <button onClick={handleProfile}>Профіль</button> */}
      <Stack direction="row"
        justifyContent="center"
        alignItems="center" spacing={2}> 
        <Button variant="contained">LOGO</Button>
        <Button variant="contained" onClick={handleAdd}>Додати оголошення</Button>
      </Stack>
      
      <Search onSearchChange={handleSearch} />
      <AdList searchInput={searchInput} searchLocality={searchLocality} />
    </Container>
  )
}
