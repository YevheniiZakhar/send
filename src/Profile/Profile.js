import { Container, Stack, Typography, Button } from '@mui/material';
import React, { useState }from 'react';
import AddOrUpdateAd from '../Add/AddOrUpdateAd'
import AdsByProfile from './AdsByProfile'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LogInYourAccount from '../components/LogInYourAccount'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Profile() {
  const theme = useTheme();
  const matchesSize = useMediaQuery(theme.breakpoints.up('864'));
  const callback = (name, email) => {
    setName(name);
    setEmail(email);
  }

  const [name, setName] = useState(() => {
    const initialValue = localStorage.getItem("name");
    return initialValue || "";
  });
  const [email, setEmail] = useState(() => {
    const initialValue = localStorage.getItem("email");
    return initialValue || "";
  });

  return (
    <div>
      {!name ? <LogInYourAccount callback={callback}/>
       :
        <div>
          <Stack direction={matchesSize ? 'row' : 'column'} sx={{display: 'flex', justifyContent: "space-evenly", mt: '2rem', mb: '2rem'}}>
            <Typography>Привіт, {name}</Typography>
            <Button variant="outlined" startIcon={<ExitToAppIcon />} onClick={() => { localStorage.clear(); setName(''); }}>Вийти з акаунту</Button>
          </Stack>
          <AdsByProfile email={email}/>
        </div>
        }
      
      {/* <Button
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "white" : undefined,
        }}
        color="inherit"
        type="submit"
        variant="outlined"
        size="large"
        children="Continue with Google"
        startIcon={<GoogleIcon />}
        //onClick={handleSignIn}
        data-method="google.com"
        fullWidth
      /> */}
    </div>
  )
}