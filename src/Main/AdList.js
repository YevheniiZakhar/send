import React, { useEffect, useState } from 'react'
import axios from "axios"
import styles from "./AdList.module.css"
import { Box, Container } from "@mui/material";
import { imageListItemClasses } from "@mui/material/ImageListItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//import { City }  from 'country-state-city';


export default function AdList({ searchInput, searchLocality }) {
  //console.log(City.getCitiesOfCountry("UA"));
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(undefined);
  const [categories, setCategories] = useState();
  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        bigMobile: 600,
        tablet: 1200,
        desktop: 1600,
      },
    },
  });
  
    useEffect(() => 
    {
      axios.get('http://localhost:5110/ad/data')
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
      axios.post('http://localhost:5110/ad/filter', {searchInput, searchLocality, page})
        .then(resp => {
          setResponse(resp.data);
        })
        .catch((error) => {
          //console.log(error)
        });
    }, [page, searchInput, searchLocality]);


    const adClick = (title, id) => {
      document.title = title;
      navigate(`/ad/${title.replaceAll(' ', '-')}/${id}`)
    }
    
    const handlePageChange = (event, value) => {
      setPage(value);
    }
     // TODO добавить к локейшн слово село\город вначале
  return (
    <Container maxWidth="sm">
      {response ? <>
      <ThemeProvider theme={theme}>
        <Box 
          sx={{
            justifyContent: "center",
            display: "grid",
            gridTemplateColumns: {
              mobile: "repeat(1, 4fr)",
              bigMobile: "repeat(2, 20rem)",
              tablet: "repeat(3, 25rem)",
              desktop: "repeat(4, 30rm)",
            },
            [`& .${imageListItemClasses.root}`]: {
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {response.results.map((x) => ( 
            <Box key={x.id} className={styles.ad} onClick={() => adClick(x.name, x.id)}>
              Name: { x.id + x.name} <br />
              Description: {x.description}<br />
              Price: {x.price}<br />
              Category: {categories.find(c => c[0] === x.categoryId)[1]}<br />
              Phone: {x.phone}<br />
              <img style={{ maxWidth: "10rem", maxHeight: "10rem" }} src={"data:image/png;base64," + x.file1 } alt=""></img>
            </Box>
          ))}
        </Box>
      </ThemeProvider>
      <Stack sx={{ m: 3 }}>

        <Pagination color="primary" count={response.pageCount} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" />
      </Stack></> : ''}
    </Container>
  )
}

// TODO: NO AD's - so we have to provide some info "unfortunately can't find any items, please change the filter and try again"
