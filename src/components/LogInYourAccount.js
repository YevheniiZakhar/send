import { Typography, Stack } from '@mui/material';
import React, { useEffect }from 'react';
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LogInYourAccount({ callback }) {
  const theme = useTheme();
  const matchesSize = useMediaQuery(theme.breakpoints.up('864'));

  useEffect(
    () => {
      if (!matchesSize) {
        let timer1 = setTimeout(() => {
          const result = document.getElementsByTagName('iframe');
          if (result.length !== 0) {
            //result[0].style.display = 'flex';
             result[0].style.height = '46px';
             result[0].style.width = '300px';
          }
        }, 1000);
  
        // this will clear Timeout
        // when component unmount like in willComponentUnmount
        // and show will not change to true
        return () => {
          clearTimeout(timer1);
        }; 
      }
    }, []);

  const login = async (token) => {
    await axios.get(process.env.REACT_APP_SERVER_URL + `user/google?token=${token}`,)
    .then(result => {
      localStorage.setItem("email", result.data.email);
      localStorage.setItem("name", result.data.name);
      callback(result.data.name, result.data.email);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <Stack direction={matchesSize ? 'row' : 'column'} sx={{display: 'flex', justifyContent: "space-evenly", mt: '2rem', mb: '2rem'}}>
        <Typography>Увійдіть у свій Google акаунт</Typography>
        <GoogleLogin
          onSuccess={result => { 
            login(result.credential)
          }}
          onError={() => {
            console.log('Login Failed');
          }} 
        />
      </Stack>
    </div>
  )
}