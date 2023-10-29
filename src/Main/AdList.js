import React, { useEffect, useState } from 'react'
import axios from "axios"
import styles from "./AdList.module.css"
import { Box, Typography } from "@mui/material";
import { imageListItemClasses } from "@mui/material/ImageListItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import Loader from '../components/loader';

export default function AdList({ searchInput, searchLocality }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(undefined);
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
    // TODO invoke endpoint by pressing Enter (тільки якщо було змінено локацію або інпут)
    const fetchData = async () => {
      await axios.post(process.env.REACT_APP_SERVER_URL + 'ad/filter', { searchInput, searchLocality, page })
        .then(resp => {
          setResponse(resp.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };
    fetchData();
  }, [page, searchInput, searchLocality]);

  const adClick = (title, id) => {
    document.title = title;
    navigate(`/ad/${id}`)
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  }
  // TODO initialy quickly load ads without images and then in background load images (it will load data quickly because currently EF load 130 in 8-9 seconds and it's not so good for user)
  // TODO format date сьогодні 21:20, вчора 21:20 або 21 квітня
  // TODO добавить к локейшн слово село\город вначале
  return (
    <div>
      {loading ?
        <Loader text='Список оголошень завантажується. Будь ласка, почекайте...' /> : response ?
          <div>
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
                  <Box key={x.id} sx={{ textAlign: 'initial' }} className={styles.ad} onClick={() => adClick(x.name, x.id)}>
                    <Box sx={{ textAlign: 'center' }}>
                      {x.file1 ? <Box
                        sx={{ height: '15rem', borderRadius: "16px 16px 0 0", width: '100%', objectFit: 'cover' }}
                        component="img"
                        src={"data:image/png;base64," + x.file1} >
                      </Box>
                        :
                        <Box sx={{ height: '9rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <NoPhotographyIcon color='action' sx={{ fontSize: 90 }} />
                        </Box>}
                    </Box>
                  
                    <Stack style={{ padding: '1rem' }}>
                      <Typography variant='subtitle2' gutterBottom sx={{ maxHeight: '3.4rem', overflow: 'hidden', lineHeight: '1.3' }}>
                        {x.name}
                      </Typography>
                      <Typography sx={{ fontWeight: 600 }} variant='h7'>
                        {x.price} ГРН
                      </Typography>
                      <Typography variant='caption' sx={{ fontSize: '0.7rem' }} gutterBottom>
                        {x.locality} - {new Date(Date.parse(x.createdDate)).toLocaleDateString('uk-UA')}
                      </Typography>
                     
                    </Stack>
                  </Box>
                ))}
              </Box>
            </ThemeProvider>
            <Stack sx={{ mt: "1rem" }}>
              <Pagination sx={{ margin: 'auto' }} color="primary" count={response.pageCount} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" />
            </Stack>
          </div>
          : <Typography sx={{ mt: "5rem" }}> Помилка. Спробуйте пізніше. </Typography>
      }
    </div>
  )
}

// TODO: NO AD's - so we have to provide some info "unfortunately can't find any items, please change the filter and try again"
// TODO Add ad sorting at least by price by date (firstly new)
