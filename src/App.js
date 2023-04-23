import { Route, Routes } from "react-router-dom";
import AddAd from "./Add/AddAd";

import Main from "./Main/Main";
import Profile from "./Profile/Profile";
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Collaborate from "./Collaborate/Collaborate";
import { Container, Stack } from "@mui/material";
const Ad = React.lazy(() => import('./Main/Ad'));

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
    <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header></Header>
      <Stack >
        <Routes>
          <Route exact path="/" element={<Main />}/>
          <Route path="/add" element={<AddAd />}/>
          <Route path="/collaborate" element={<Collaborate />}/>
          <Route path="/ad/:title/:id" element={
            // todo update fallback to valid value
            <React.Suspense fallback={<>1111</>}>
              <Ad />
            </React.Suspense>}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </Stack>
      <Footer/>
    </Container>
  );
}

export default App;
