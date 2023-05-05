import React, { useEffect, useState } from 'react'
import axios from "axios"
import styles from "./AdList.module.css"
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import { imageListItemClasses } from "@mui/material/ImageListItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';

export default function AdList({ searchInput, searchLocality }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(undefined);
  const [categories, setCategories] = useState();
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
  
    useEffect(() => 
    {
      axios.get(process.env.REACT_APP_SERVER_URL+'ad/data')
      .then(resp => {
        const category = resp.data.category.map(c => [c.id, c.name] );
        setCategories(category);
      })
      .catch((error) => {
        //console.log(error)
      });
    }, []);

    useEffect(() => 
    {
      // TODO invoke endpoint by pressing Enter (тільки якщо було змінено локацію або інпут)
      axios.post(process.env.REACT_APP_SERVER_URL+'ad/filter', {searchInput, searchLocality, page})
        .then(resp => {
          setResponse(resp.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }, [page, searchInput, searchLocality]);


    const adClick = (title, id) => {
      document.title = title;
      navigate(`/ad/${title.replaceAll(' ', '-')}/${id}`)
    }
    
    const handlePageChange = (event, value) => {
      setPage(value);
    }
    // TODO initialy quickly load ads without images and then in background load images (it will load data quickly because currently EF load 130 in 8-9 seconds and it's not so good for user)
    // TODO format date сьогодні 21:20, вчора 21:20 або 21 квітня
     // TODO добавить к локейшн слово село\город вначале
  return (
    <Container sx={{ textAlign: "center"}}>
      {loading ? <Box sx={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress />
                  </Box> : response ? 
      <Container>
        <ThemeProvider theme={theme}>
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
            {response.results.map((x) => ( 
              <Box key={x.id} sx={{textAlign: 'initial'}} className={styles.ad} onClick={() => adClick(x.name, x.id)}>
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
                  <Typography variant='caption' sx={{fontSize: '0.7rem' }} gutterBottom>
                  {x.locality} - { new Date(Date.parse(x.createdDate)).toLocaleDateString('uk-UA')}
                  </Typography>
                  <Typography sx={{fontWeight: 600}} variant='h7'>
                    {x.price} ГРН
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        </ThemeProvider>
        <Stack sx={{ m: "1rem" }}>
          <Pagination sx={{ margin: 'auto' }} color="primary" count={response.pageCount} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" />
        </Stack>
      </Container> 
      : <Typography sx={{ mt: "5rem" }}> Помилка. Спробуйте пізніше. </Typography>
      }
    </Container>
  )
}

// TODO: NO AD's - so we have to provide some info "unfortunately can't find any items, please change the filter and try again"
// TODO Add ad sorting at least by price by date (firstly new)
