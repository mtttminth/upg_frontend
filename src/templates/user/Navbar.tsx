'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { DRAWER_WIDTH, USER_MENU_ITEM } from "@/consts/AdminsideMenu";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExpandMore } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ButtonBase, Menu, MenuItem } from '@mui/material';
import MobileDrawer from './Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { redirect } from 'next/navigation';
import UserNoti from './Noti';
import UserProfile from './Profile';
interface Props {
  window?: () => Window;
}

const UserNavBar = (props: Props) => {
  const { window } = props;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {loading, isUserAuthenticated} = useSelector((state: RootState) => state.userAuth);
  const pathname = usePathname();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    !isUserAuthenticated && redirect('/login');
  }, [isUserAuthenticated]);

  const drawer = (
    <MobileDrawer handleDrawerToggle={handleDrawerToggle} />
  );

  const container = window ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }} className="user-nav">
      <AppBar>
        <Toolbar>
          <Box sx={{display: {xs: 'flex', sm: 'none'}, justifyContent: 'space-between', width: '100%' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{display: 'flex', gap: 3}}>
              <UserNoti />
              <UserProfile />
            </Box>
          </Box>
          <Box sx={{ py: 1, display: { xs: 'none', sm: 'block' } }} className="logo-box">
            <Image
              src="/images/logo-blue.png"
              width={160}
              height={160}
              priority
              alt="Logo"
              className='logo'
            />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%', justifyContent: 'right', gap: 5, alignItems: 'center' }}>
            {USER_MENU_ITEM.map((item, index) =>
              item.type == 'item-tree' ? 
              <Box sx={{ flexGrow: 0 }} key={index}>
                <ButtonBase onClick={handleOpenUserMenu} className='nav-menu'>
                  <ListItemText primary={item.label} />
                  <Box>
                    <ExpandMore style={{fontSize: 23}} />
                  </Box>
                </ButtonBase>
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {
                    item.subitems?.map((sub_item, index) => (
                    <MenuItem onClick={handleCloseUserMenu} key={index}>
                      <Link href={`/${sub_item.href}`} key={index} className={pathname == `/${sub_item.href}` ? 'user-nav-active nav-menu' : 'nav-menu'}>
                        {sub_item.label}
                      </Link>
                    </MenuItem>
                    ))
                  }
                </Menu>
              </Box>
              :
              <Link href={`/${item.href}`} key={index} className={pathname == `/${item.href}` ? 'user-nav-active nav-menu' : 'nav-menu'}>
                {item.label}
              </Link>
            )}
            <UserNoti />
            <UserProfile />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default UserNavBar;