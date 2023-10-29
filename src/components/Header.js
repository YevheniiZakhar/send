import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Header({ updateName, name }) {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleAdd = () => {
    navigate("/add")
  }

  const handleMain = () => {
    navigate("/")
  }

  const handleProfile = () => {
    navigate("/profile")
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ mb: '2rem'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              "&:hover": { cursor: "pointer" }
            }}
            onClick={handleMain}
          >
            <img alt="Remy Sharp" src="/logo.png" style={{ filter: 'brightness(0) invert(1)', height: '3rem'}} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => { handleCloseNavMenu(); handleMain() }}>
                <HomeIcon />
                <Typography sx={{ ml: '1rem' }} textAlign="center">Знайти оголошення</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleCloseNavMenu(); handleAdd() }}>
                <AddIcon />
                <Typography sx={{ ml: '1rem' }} textAlign="center">Додати оголошення</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              "&:hover": { cursor: "pointer" }
            }}
            onClick={handleMain}
          >
            <img alt="Remy Sharp" src="/logo.png" style={{ filter: 'brightness(0) invert(1)', height: '3rem'}} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button size='large' variant='outlined' sx={{ my: 2, color: 'white', ml: '1rem', textTransform: 'none', borderColor: 'white', "&.MuiButtonBase-root:hover": { borderColor: '#e2e2e2' } }} startIcon={<HomeIcon />} onClick={handleMain}>Знайти оголошення</Button>
            <Button size='large' variant='outlined' sx={{ my: 2, color: 'white', ml: '1rem', textTransform: 'none', borderColor: 'white', "&.MuiButtonBase-root:hover": { borderColor: '#e2e2e2' } }} startIcon={<AddIcon />} onClick={handleAdd}>Додати оголошення</Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={name ? "Відкрити налаштування" : "Увійти до акаунту"}>
              <IconButton onClick={name ? handleOpenUserMenu : handleProfile} sx={{ p: 0 }}>
                <Avatar alt="Профіль" src="/profile.png" sx={{ filter: 'brightness(0) invert(1)' }} />
              </IconButton>
            </Tooltip>
            {name && <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => { handleCloseUserMenu(); handleProfile() }}>
                <LocalShippingIcon />
                <Typography sx={{ ml: '1rem' }} textAlign="center">Мої оголошення</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleCloseUserMenu(); localStorage.clear(); updateName(''); }}>
                <LogoutIcon />
                <Typography sx={{ ml: '1rem' }} textAlign="center">Вийти з акаунту</Typography>
              </MenuItem>
            </Menu>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
