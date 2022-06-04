import React, {useState} from 'react';
import { 
    Container, Box,  AppBar, Toolbar, IconButton, Badge,
    Menu, Avatar, Button, Tooltip, MenuItem, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

let pages = ['Home', 'About', 'Contact'];
let settings = [ 'Account', 'Dashboard', 'Logout'];
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
}));
const Navbar = ({setLogin, setIsAccount, adminLogin, setAdminLogin}) => {

    if(adminLogin) {
        pages = ['Admin'];
        settings = ['Logout'];
    }

    const navigate =  useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [settingValue, setSettingValue] = useState("Dashboard");
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = (event) => {
      setAnchorElNav(null);
      if(!adminLogin) {
        window.open(`/#${event.target.textContent.toLowerCase()}`, '_blank', 'noopener,noreferrer')
      }
    };

    return (
    <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
            variant="h6"
            noWrap
            component="a"
            title='Raise For a Cause'
            href="/"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            RFC
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
                horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                display: { xs: 'block', md: 'none' },
                }}
            >
                {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
                ))}
            </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            CFS
            </Typography>
        
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },  justifyContent: 'center' }}>
            {pages.map((page) => (
                <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', margin: '0px 20px' }}
                >
                {page}
                </Button>
            ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src="/broken-image.jpg" />
                        </StyledBadge>
                    </IconButton>
                </Tooltip>
                <Menu
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
                    onClose={() => {
                        setAnchorElUser(null);
                        }}
                    >
                    {settings.map((setting) => (
                    <MenuItem key={setting} selected={setting === settingValue} onClick={() => {
                        setAnchorElUser(null);
                        setSettingValue(setting);
                        if(adminLogin && setting === 'Logout') {
                            const logout = async () => {
                                try {
                                    let res = await fetch("http://localhost:5000/cfms/adminlogout", {
                                        credentials: 'include',
                                        method: 'GET',
                                    });

                                    setAdminLogin(false);
                                    navigate("login");
                                } catch(err) {
                                    console.log(err);
                                }
                            }
                            logout();
                        } else if(setting === 'Logout') {
                            setIsAccount(false);
                            const logout = async () => {
                                try {
                                    let res = await fetch("http://localhost:5000/cfms/logout", {
                                        credentials: 'include',
                                        method: 'GET',
                                    });
                                    console.log(res);
                                    setLogin(false);
                                    navigate("/login");
                                } catch(err) {
                                    console.log(err);
                                }
                            }
                            logout();
                        } else if(setting === 'Dashboard') {
                            setIsAccount(false);
                            navigate("/dashboard");
                        } else {
                            setIsAccount(true);
                            navigate("/account");
                        }
                    }}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Toolbar>
        </Container>
    </AppBar>
    )
};

export default Navbar;