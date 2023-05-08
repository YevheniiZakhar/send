import { Route, Routes } from "react-router-dom";
import AddOrUpdateAd from "./Add/AddOrUpdateAd";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Main from "./Main/Main";
import Profile from "./Profile/Profile";
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Collaborate from "./Collaborate/Collaborate";
import { Container, Stack } from "@mui/material";
import Added from "./Added/Added";
import Ad from "./Main/Ad";

  // const Ad = React.lazy(async () => {
  //   return await axios.get(process.env.REACT_APP_SERVER_URL+`ad/getbyid?id=${670}`)
  //   .then(
  //     (res) => {
  //       //adData = res.data;
  //       return import('./Main/Ad')
  //         .then((res) => {res.default.a = 111; return res}); 
  //     });
  // });

function App() {
  let location = useLocation();
  React.useEffect(() => {
    if (location.pathname === "/"){
      document.title = "Сайт безкоштовних оголошень"
    }
  }, [location])

  return (
    // investigate
    // https://mahdi-karimipour.medium.com/responsive-layout-setup-header-content-footer-for-your-react-single-page-application-spa-f5287cdf2a50
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Container sx={{ minHeight: '97vh', display: 'flex', flexDirection: 'column' }}>
      <Header></Header>
      <Stack >
        <Routes>
          <Route exact path="/" element={<Main />}/>
          <Route path="/add" element={<AddOrUpdateAd />}/>
          <Route path="/added" element={<Added />}/>
          <Route path="/collaborate" element={<Collaborate />}/>
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </Stack>
      <Footer/>
    </Container>
    </GoogleOAuthProvider>
  );
}

export default App;
