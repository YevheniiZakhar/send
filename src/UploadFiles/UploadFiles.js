import React, { useState } from "react";
import { imageListItemClasses } from "@mui/material/ImageListItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

export default function UploadFiles({ onFilesChange }) {
  const [fileList, setFileList] = useState();
  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const array = Array.prototype.slice.call(e.target.files);
      console.log(array);
      if (array.length > 8) {
        setOpen(true);
        onFilesChange(array.slice(0, 8));
        setFileList(array.slice(0, 8));
      } else {
        onFilesChange(array);
        setFileList(array);
      }
    }
  };

  const files = fileList ? [...fileList] : [];
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

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Container sx={{ textAlign: "center", marginTop: "2rem" }}>
      <Typography variant='subtitle1' gutterBottom>
        Виберіть максимум 8 фото. Перше фото буде на обкладинці оголошення. 
      </Typography>
      <Tooltip title="Завантажити фото">  
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden onChange={handleFileChange} accept="image/*" type="file" multiple />
          <PhotoCamera />
        </IconButton>
      </Tooltip>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Ви можете додати максимум 8 фото
        </Alert>
      </Snackbar>
      
      {fileList && fileList.length > 0 ? <ThemeProvider theme={theme}>
        <Box 
          sx={{
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
          {files.map((file, i) => (
            <Box key={i} >
              <img
                style={{ maxHeight: "7rem" }}
                src={`${URL.createObjectURL(file)}`} 
                alt="" 
                loading="lazy" />
            </Box>
          ))}
        </Box>
      </ThemeProvider> : ''}
    </Container>
  );
};