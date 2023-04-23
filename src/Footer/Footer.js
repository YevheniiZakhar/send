import { Container, Stack, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const handleCollaborate = () => {
    navigate("/collaborate")
  }

  return (
    <Container sx={{ mt: 'auto'}} >
      <Stack direction='row'>
        <Button onClick={handleCollaborate}>Співпраця</Button>
      </Stack>
    </Container>
  )
}