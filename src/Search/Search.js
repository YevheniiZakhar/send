import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Locality from '../components/locality';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Search({ onSearchChange }) {
  const theme = useTheme();
  const matchesSize = useMediaQuery(theme.breakpoints.up('864'));
  const [q, setQ] = useState('');
  const [l, setL] = useState(0);

  const buttonClick = () => {
    onSearchChange(q, l);
  }
  
  const localityChanged = (value) => {
    setL(value);
  }

  return (
    <Stack spacing={2} direction={matchesSize ? 'row' : 'column'} sx={{ p: 1 }}>
      <TextField
        fullWidth
        id="outlined-controlled"
        label="Пошук..."
        value={q}
        onChange={(event) => {
          setQ(event.target.value);
        }}
      /> 
      <Locality localityChanged={localityChanged}/>
      <Button variant="contained" sx={{ minWidth: '6rem'}} onClick={buttonClick}>ЗНАЙТИ</Button>
    </Stack>
  )
}