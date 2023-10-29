import { Stack, Typography } from '@mui/material';
import React from 'react';
import AdsByProfile from './AdsByProfile'
import LogInYourAccount from '../components/LogInYourAccount'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Profile({ callback, email, name }) {
  const theme = useTheme();
  const matchesSize = useMediaQuery(theme.breakpoints.up('864'));

  return (
    <div>
      {!name ? <LogInYourAccount callback={callback}/>
       :
        <div>
          <AdsByProfile email={email} name={name}/>
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