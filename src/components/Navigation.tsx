import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// importing icons for menu items
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import RegionIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/LocalOffer';
import PinDropIcon from '@mui/icons-material/PinDrop';
import GoodIcon from '@mui/icons-material/ShoppingCart';
import UserIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import StorageIcon from '@mui/icons-material/Storage';
import UnitIcon from '@mui/icons-material/FormatListNumbered';
import { Routes } from 'react-router-dom';
import { RoutesEnum } from '../constants/routes';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
        <Toolbar />
      <List>
        <ListItemButton component="a" href="/" key="Home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component="a" href={RoutesEnum.Category} key="Category">
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItemButton>
        <ListItemButton component="a" href={RoutesEnum.Region} key="Region">
          <ListItemIcon>
            <RegionIcon />
          </ListItemIcon>
          <ListItemText primary="Region" />
        </ListItemButton>
        <ListItemButton component="a" href={RoutesEnum.Tag} key="Tag">
          <ListItemIcon>
            <TagIcon />
          </ListItemIcon>
          <ListItemText primary="Tag" />
        </ListItemButton>
        <ListItemButton component="a" href={RoutesEnum.Good} key="Good">
          <ListItemIcon>
            <GoodIcon />
          </ListItemIcon>
          <ListItemText primary="Good" />
        </ListItemButton>
        <ListItemButton component="a" href={RoutesEnum.User} key="User">
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItemButton>
        <ListItemButton component="a" href={RoutesEnum.Place} key="Place">
          <ListItemIcon>  
            <PinDropIcon />
          </ListItemIcon>
          <ListItemText primary="Place" />
        </ListItemButton>
        <ListItemButton component="a" href={RoutesEnum.Storage} key="Storage">
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary="Storage" />
        </ListItemButton>
        <ListItemButton component="a" href={RoutesEnum.Unit} key="Unit">
          <ListItemIcon>
            <UnitIcon />
          </ListItemIcon>
          <ListItemText primary="Unit" />
        </ListItemButton>
      </List>
      <Divider />
        <ListItemButton component="a" href={RoutesEnum.Logout} key="Logout">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
    </div>
  );

  return (
    <Box sx={{ display: 'flex'
    }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            IT-Lab
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>

  );
}  