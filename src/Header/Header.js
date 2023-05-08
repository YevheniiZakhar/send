import { Container, Box } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// TODO https://mui.com/material-ui/react-app-bar/
export default function Header() {
  const theme = useTheme();
  const matchesSize = useMediaQuery(theme.breakpoints.up('864'));
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/add")
  }

  const handleLogo = () => {
    navigate("/")
  }

  const handleProfile = () => {
    navigate("/profile")
  }

  return (
    <Stack direction={matchesSize ? 'row' : 'column'} justifyContent="center" spacing={2} sx={{mb: 2}}> 
        <Button size='large' variant="contained" onClick={handleLogo}>SEND</Button>
        <Button size='large' variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Додати оголошення</Button>
        <Button size='large' variant="contained" startIcon={<PermIdentityIcon />} onClick={handleProfile}>Профіль</Button>
    </Stack>
  )
}