import { Route, Routes } from "react-router-dom";
import AddAd from "./Add/AddAd";

import Main from "./Main/Main";
import Profile from "./Profile/Profile";
import * as React from 'react';
import { useLocation } from 'react-router-dom';

const Ad = React.lazy(() => import('./Main/Ad'));

function App() {
  let location = useLocation();
  React.useEffect(() => {
    if (location.pathname === "/"){
      document.title = "Сайт бесплатных объявлений"
    }
  }, [location])
  
  return (
    <Routes>
      <Route exact path="/" element={<Main />}/>
      <Route path="/add" element={<AddAd />}/>
      <Route path="/ad/:title/:id" element={
        <React.Suspense fallback={<>1111</>}>
          <Ad />
        </React.Suspense>}/>
      <Route path="/profile" element={<Profile />}/>
    </Routes>
  );
}

export default App;
