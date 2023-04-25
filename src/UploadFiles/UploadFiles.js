import React, { useState } from "react";
import { imageListItemClasses } from "@mui/material/ImageListItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, Stack } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

export default function UploadFiles({ onFilesChange, defaulFiles }) {
  const [fileList, setFileList] = useState();
  const [open, setOpen] = useState(false);
  const [displayDefault, setDisplayDefault] = useState(defaulFiles ? true : false);

  const handleFileChange = (e) => {
    if (displayDefault) {
      setDisplayDefault(!displayDefault);
    }

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
        bigMobile: 740,
        tablet: 980,
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
      
      <Stack sx={{ textAlign: "center"}}> 
      {fileList && fileList.length > 0 || displayDefault ? <ThemeProvider theme={theme}>
        <Box 
          sx={{
            maxHeight: '17rem',
            overflowY: 'auto',
            overflowX: 'hidden',
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
            <Box sx={{ height: "7rem", marginTop: '1rem'}} component="img" key={i} src={`${URL.createObjectURL(file)}`}>
              {/* <img
                style={{ maxHeight: "7rem" }}
                src={`${URL.createObjectURL(file)}`} 
                alt="" 
                loading="lazy" /> */}
            </Box>
          ))}
           {displayDefault && defaulFiles.map((src, i) => 
           {  return src !== null ? 
            <Box sx={{ height: "7rem", marginTop: '1rem'}} component="img" key={'unique-image-key' + i} src={"data:image/png;base64," + src}></Box> : 
            ''
           }
          )}
        </Box>
      </ThemeProvider> : ''}
      </Stack>
    </Container>
  );
};