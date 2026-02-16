import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
    AppBar,
    Button,
    Container,
    IconButton,
    Toolbar,
    Box,
    Typography,
    Menu
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import BookmarksIcon from '@mui/icons-material/Bookmarks'

import blogService from '../services/blogs'
import localStorage from '../services/localStorage'

import { unsetCurrentUser } from '../reducers/currentUserReducer'

const NavigationMenu = ({ currentUser }) => {
    const pages = [
        { name: 'blogs', link: '/' },
        { name: 'users', link: '/users' }
    ]

    const [anchorElNav, setAnchorElNav] = useState(null)

    const dispatch = useDispatch()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleLogout = (event) => {
        event.preventDefault()

        localStorage.removeCurrentUser()
        blogService.setToken(null)
        dispatch(unsetCurrentUser())
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <BookmarksIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to={'/'}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        Blog app
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
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
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography
                                        sx={{ textAlign: 'center' }}
                                        component={Link}
                                        to={page.link}
                                    >
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <BookmarksIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        Blogs app
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                component={Link}
                                to={page.link}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Typography sx={{ marginRight: 4 }}>
                        {currentUser.name} is logged in
                    </Typography>
                    <LogoutIcon></LogoutIcon>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavigationMenu
