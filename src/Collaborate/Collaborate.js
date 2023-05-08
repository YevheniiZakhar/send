import { Container, Typography, Box } from '@mui/material';
import React from 'react';

export default function Collaborate() {
  return (
    <Container sx={{mt: '5rem'}}>
      <Typography variant='body1' gutterBottom sx={{maxHeight: '3.4rem', lineHeight: '1.3'}}>
      Якщо у вас трапилась помилка на сайті <b>SEND UA</b><br/>
      Якщо ви маєте ідеї чи пропозиції для покращення <b>SEND UA</b><br/>
      Якщо ви бажаєте співпрацювати з <b>SEND UA</b><br/><br/>
      зв’яжіться за електронною поштою - 
        <Box sx={{fontWeight: 'bold'}} display='inline'> help.send.ua@gmail.com</Box>
      </Typography>
    </Container>
  )
}         