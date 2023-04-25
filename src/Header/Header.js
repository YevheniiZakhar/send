import { Container } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/add")
  }

  const handleLogo = () => {
    navigate("/")
  }

  const handleProfile = () => {
    navigate("/profile")
  }

  return (
    <Container sx={{mb: '1rem'}}>
      <Stack direction='row' justifyContent="center" spacing={2}> 
        <Button variant="contained" onClick={handleLogo}>SEND UA</Button>
        <Button variant="contained" onClick={handleAdd}>Додати оголошення</Button>
        <Button variant="contained" onClick={handleProfile}>Профіль</Button>
      </Stack>
    </Container>
  )
}