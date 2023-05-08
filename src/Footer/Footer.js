import { Stack, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Footer() {
  const navigate = useNavigate();
  const handleCollaborate = () => {
    navigate("/collaborate")
  }

  return (
    <Stack direction='row' sx={{ mt: 'auto'}}>
      <Button onClick={handleCollaborate} variant='outlined' sx={{ mt: '1rem'}}>Співпраця</Button>
    </Stack>
  )
}