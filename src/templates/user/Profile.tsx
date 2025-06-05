'use client'
import PersonIcon from '@mui/icons-material/Person';
import { ButtonBase, Divider, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchUserLogout, fetchUserProfile } from '@/store/thunks/user/authThunk';

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const {loading, userProfile} = useSelector((state: RootState) => state.userAuth);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [])

  const logout = () => {
    dispatch(fetchUserLogout());
    handleCloseUserMenu();
  }

  return (
    <>
      <ButtonBase onClick={handleOpenUserMenu}>
        <PersonIcon className='nav-menu'/>
      </ButtonBase>
      <Menu
        sx={{ mt: '40px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemText>{userProfile.name}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemText sx={{marginRight: '10px'}}>
            Logout
          </ListItemText>
          <Typography>
            <LogoutIcon fontSize="small" />
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserProfile;