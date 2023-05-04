import { Container, Box, Stack, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { imageListItemClasses } from "@mui/material/ImageListItem";
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';

export default function AdsByProfile({email}) {
  const [ad, setAd] = useState(undefined);
  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        bigMobile: 740,
        tablet: 1100,
        desktop: 1390,
      },
    },
  });
  useEffect(() => {
   const fetchData = async () => {

     const data = await axios.get(process.env.REACT_APP_SERVER_URL+`ad/getbyuseremail?email=${email}`);
     setAd(data.data);
   }
   fetchData();
 }, [])
  return (
    <Container>
     {ad && <ThemeProvider theme={theme}>
          <Box 
            sx={{
              justifyContent: "center",
              display: "grid",
              gridTemplateColumns: {
                mobile: "repeat(1, 23rem)",
                bigMobile: "repeat(2, 23rem)",
                tablet: "repeat(3, 23rem)",
                desktop: "repeat(4, 22rem)",
              },
              [`& .${imageListItemClasses.root}`]: {
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {ad.map((x) => ( 
              <Box key={x.id} sx={{textAlign: 'initial'}} onClick={() => console.log(x.name)}>
                <Box sx={{ textAlign: 'center'}}>
                  {x.file1 ? <Box 
                    sx={{ height: '9rem' }}
                    component="img" 
                    src={"data:image/png;base64," + x.file1} >
                  </Box> 
                  : 
                  <Box sx={{ height: '9rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <NoPhotographyIcon color='action' sx={{ fontSize: 90 }} />
                  </Box>}
                </Box>
              
              
                <Stack > 
                  <Typography variant='subtitle2' gutterBottom sx={{maxHeight: '3.4rem', overflow: 'hidden', lineHeight: '1.3'}}>
                    { x.name}
                  </Typography>
                  <Typography variant='caption' sx={{fontSize: '0.7rem' }}gutterBottom>
                  {x.locality} - { new Date(Date.parse(x.createdDate)).toLocaleDateString('uk-UA')}
                  </Typography>
                  <Typography sx={{fontWeight: 600}} variant='h7'>
                    {x.price} ГРН
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        </ThemeProvider>}
    </Container>
  )
}