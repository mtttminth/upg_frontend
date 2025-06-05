import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import {
  Box,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect } from "react";
import { ExpandMore } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { fetchLogout } from "@/store/thunks/admin/authThunk";
import Link from "next/link";
import { fetchDetailProfile } from "@/store/thunks/admin/profileThunk";

type NavBarProps = {
  handleDrawerToggle: () => void;
};
const Navbar: React.FC<NavBarProps> = ({ handleDrawerToggle }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();
  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { profileDetail } = useSelector((state: RootState) => state.profile);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    dispatch(fetchDetailProfile());
  }, []);
  const logout = () => {
    dispatch(fetchLogout());
    handleCloseUserMenu();
  };
  React.useEffect(() => {
    !isAuthenticated && redirect("/admin/login");
  }, [isAuthenticated]);
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box className="nav-container">
          <Box sx={{ py: 1 }}>
            <Image
              src="/images/logo.png"
              width={50}
              height={50}
              priority
              alt="Logo"
            />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ListItemButton sx={{ pl: 4 }} onClick={handleOpenUserMenu}>
              <ListItemText primary={profileDetail.name} />
              <Box>
                <ExpandMore style={{ fontSize: 23 }} />
              </Box>
            </ListItemButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href={"/admin/profile"}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ pr: 1 }}>
                      <EditOutlinedIcon style={{ fontSize: 20 }} />
                    </Box>
                    <Typography fontSize={16} textAlign="center">
                      Edit Profile
                    </Typography>
                  </Box>
                </Link>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Box sx={{ pr: 1 }}>
                  <LogoutIcon style={{ fontSize: 20 }} />
                </Box>
                <Typography fontSize={16} textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
