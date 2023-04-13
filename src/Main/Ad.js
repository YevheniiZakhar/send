import React, { useEffect, useState, useCallback } from 'react'
import axios from "axios"
import styles from "./AdList.module.css"
import { Box, Container  } from "@mui/material";
import { useParams } from 'react-router';
import ImageViewer from 'react-simple-image-viewer';

export default function Ad() {
  const { id, title }  = useParams();
  const [ad, setAd] = useState();
  const [images, setImages] = useState();

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
        setImages(["data:image/png;base64,"+data.data.file1,"data:image/png;base64,"+data.data.file2,"data:image/png;base64,"+data.data.file3,"data:image/png;base64,"+data.data.file4,"data:image/png;base64,"+data.data.file5,"data:image/png;base64,"+data.data.file6,"data:image/png;base64,"+data.data.file7,"data:image/png;base64,"+data.data.file8]);
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
    <Container maxWidth="sm">
      {ad !== undefined ? 
      <Box key={ad.id} className={styles.ad} sx={{ p: 2, border: '1px dashed grey' }}>
        Name: {ad.name} <br/>
        Description: {ad.description}<br/>
        Price: {ad.price}<br/>
        {/* Category: {categories.find(c => c[0] === ad.categoryId)[1] }<br/> */}
        Phone: {ad.phone}<br/>
        <img style={{maxWidth: "10rem", maxHeight: "10rem"}} src={"data:image/png;base64," + ad.file1} alt=""></img>
      </Box> : ""}
      {images && images.map((src, index) => (
        <img
          src={ src }
          onClick={ () => openImageViewer(index) }
          width="300"
          key={ index }
          style={{ margin: '2px' }}
          alt=""
        />
      ))}

      {isViewerOpen && (
        <ImageViewer
          src={ images }
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
        />
      )}
    </Container>
  )
}
