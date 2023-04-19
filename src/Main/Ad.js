import React, { useEffect, useState, useCallback } from 'react'
import axios from "axios"
import styles from "./AdList.module.css"
import { Box, Container, Typography, Stack  } from "@mui/material";
import { useParams } from 'react-router';
import ImageViewer from 'react-simple-image-viewer';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { imageListItemClasses } from "@mui/material/ImageListItem";

export default function Ad() {
  const { id, title }  = useParams();
  const [ad, setAd] = useState();
  const [images, setImages] = useState();

  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        bigMobile: 600,
        tablet: 864,
        laptop: 1024,
        desktop: 1200,
      },
    },
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  // const images = [
  //   'http://placeimg.com/1200/800/nature',
  //   'http://placeimg.com/800/1200/nature',
  //   'http://placeimg.com/1920/1080/nature',
  //   'http://placeimg.com/1500/500/nature',
  // ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };


    useEffect(() => 
    {
      // axios.get('http://localhost:5110/ad/data')
      // .then(resp => {
      //   const category = resp.data.category.map(c => [c.id, c.name] );
      //   setCategories(category);
      // })
      // .catch((error) => {
      //   console.log(error)
      // });
      const fetchData = async () => {

        const data = await axios.get(`http://localhost:5110/ad/byid?id=${id}`);
        setAd(data.data);
        const files = [data.data.file1,data.data.file2,data.data.file3,data.data.file4,data.data.file5,data.data.file6,data.data.file7,data.data.file8];
        let imgs = [];
        files.forEach(element => {
          if (element) {
            imgs.push("data:image/png;base64,"+element);
          }
        });
        setImages(imgs);
        // setImages([data.data.file1,data.data.file2,data.data.file3,data.data.file4,data.data.file5,data.data.file6,data.data.file7,data.data.file8]);
      }
      fetchData();
        // .then(resp => {
        //   console.log(resp);
        //   setAd(resp.data);
        // })
        // .catch((error) => {
        //   console.log(error)
        // });
    //   fetch("http://localhost:5110/ad", {
    //   method: "GET"
    // })
    //   .then((res) => res.json())
    //   .then((data) => setAd(data))
    //   .catch((err) => console.error(err));
    }, []);
// TODO: add notification pr popup when ad is added (201 : Created)
  return (
    <Container>
      {ad !== undefined ? 
      <Stack sx={{ textAlign: "center"}}> 
        {images && images.length > 0 ? <ThemeProvider theme={theme}>
        <Box 
          sx={{
            maxHeight: '17rem',
            overflow: 'auto',
            justifyContent: "center",
            display: "grid",
            gridTemplateColumns: {
              mobile: "repeat(1, 16rem)",
              bigMobile: "repeat(2, 16rem)",
              tablet: "repeat(3, 16rem)",
              desktop: "repeat(4, 16rem)",
            },
            [`& .${imageListItemClasses.root}`]: {
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {images.map((src, i) => { return src && ( 
            <Box 
              key={i} 
              sx={{height: "7rem", marginTop: '1rem', cursor: 'pointer'}} 
              onClick={ () => openImageViewer(i) } 
              component="img" 
              src={src} >
            </Box>
          )})}
        </Box>
      </ThemeProvider> : ''}

      <Stack sx={{textAlign: 'initial'}}> 
        <Typography variant='h4' gutterBottom paragraph>
          {ad.name}
        </Typography>
        <Typography sx={{fontWeight: 600}} variant='h4' gutterBottom paragraph>
          {ad.price} грн.
        </Typography>
        <Typography variant='overline' sx={{fontSize: '1.5rem'}}>
         Опис
        </Typography>
        <Typography variant='body1' gutterBottom>
          {ad.description}
        </Typography>
        <Typography variant='h6' gutterBottom>
          Користувач: {ad.userName}, Телефон: +{ad.phone}
        </Typography>
        <Typography variant='h6' gutterBottom>
          Місцезнаходження: {ad.locality}
        </Typography>
      </Stack>
     
      {isViewerOpen && (
        <ImageViewer
          src={ images }
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
        />
      )}
      </Stack>
      // <Box key={ad.id} className={styles.ad} sx={{ p: 2, border: '1px dashed grey' }}>
      //   Name: {ad.name} <br/>
      //   Description: {ad.description}<br/>
      //   Price: {ad.price}<br/>
      //   {/* Category: {categories.find(c => c[0] === ad.categoryId)[1] }<br/> */}
      //   Phone: {ad.phone}<br/>
      //   <img style={{maxWidth: "10rem", maxHeight: "10rem"}} src={"data:image/png;base64," + ad.file1} alt=""></img>
      // </Box> 
      : ""}


    </Container>
  )
}
