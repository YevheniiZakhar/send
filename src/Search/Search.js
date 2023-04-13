import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Locality from '../components/locality';

export default function Search({ onSearchChange }) {
  const [q, setQ] = useState('');
  const [l, setL] = useState(0);

  const buttonClick = () => {
    onSearchChange(q, l);
  }
  
  const localityChanged = (value) => {
    setL(value);
  }

  return (
    <Stack spacing={2} direction="row" sx={{ m: 5 }}>
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
      <Button variant="contained" onClick={buttonClick}>ЗНАЙТИ</Button>
    </Stack>
  )
}