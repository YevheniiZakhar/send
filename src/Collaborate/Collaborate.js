import { Container, Typography, Box } from '@mui/material';
import React from 'react';

export default function Collaborate() {
  return (
    <Container sx={{mt: '5rem'}}>
      <Typography variant='subtitle2' gutterBottom sx={{maxHeight: '3.4rem', overflow: 'hidden', lineHeight: '1.3'}}>
        Для співпраці з <b>SEND UA</b> зв’яжіться за електронною поштою - 
        <Box sx={{fontWeight: 'bold'}} display='inline'> help.send.ua@gmail.com</Box>
      </Typography>
    </Container>
  )
}