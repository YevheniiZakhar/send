import { Route, Routes } from "react-router-dom";
import AddOrUpdateAd from "./Add/AddOrUpdateAd";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Main from "./Main/Main";
import Profile from "./Profile/Profile";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "./Footer/Footer";
import Header from "./components/Header";
import Collaborate from "./Collaborate/Collaborate";
import { Container, Stack } from "@mui/material";
import Added from "./Added/Added";
import Ad from "./Main/Ad";

function App() {
  const [name, setName] = useState(() => {
    const initialValue = localStorage.getItem("name");
    return initialValue || "";
  });
  const [email, setEmail] = useState(() => {
    const initialValue = localStorage.getItem("email");
    return initialValue || "";
  });
  
  const updateName = (name) => {
    setName('')
  }

  const callback = (name, email) => {
    setName(name);
    setEmail(email);
  }

  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Сайт безкоштовних оголошень"
    }
  }, [location])

  return (
    // investigate:
    // https://mahdi-karimipour.medium.com/responsive-layout-setup-header-content-footer-for-your-react-single-page-application-spa-f5287cdf2a50
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Header updateName={updateName} name={name}></Header>
      <Container sx={{ minHeight: '97vh', display: 'flex', flexDirection: 'column' }}>
        <Stack>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/add" element={<AddOrUpdateAd callback1={callback} name={name} propsEmail={email} />} />
            <Route path="/added" element={<Added />} />
            <Route path="/collaborate" element={<Collaborate />} />
            <Route path="/ad/:id" element={<Ad />} />
            <Route path="/profile" element={<Profile callback={callback} name={name} email={email}/>} />
          </Routes>
        </Stack>
        <Footer />
      </Container>
    </GoogleOAuthProvider>
  );
}

export default App;