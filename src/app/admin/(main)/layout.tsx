'use client'
import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import "@/styles/admin/admin.scss";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Navbar from "@/templates/admin/Navbar";
import { DRAWER_WIDTH } from "@/consts/AdminsideMenu";
import SideMenu from "@/templates/admin/SideMenu";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ability from "@/services/admin/ability";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import { fetchDepartmentList, fetchPermission, fetchPermissionList, fetchRoleList } from "@/store/thunks/admin/authThunk";

export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {permissions} = useSelector((state: RootState) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchPermission());
    dispatch(fetchPermissionList());
    dispatch(fetchDepartmentList());
    dispatch(fetchRoleList());
  }, [])
  
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <section>
      <Box sx={{ display: 'flex' }}>
      {
        permissions.length != 0 ? (
          <>
            <Navbar handleDrawerToggle={handleDrawerToggle}/>
            <SideMenu
              mobileOpen={mobileOpen}
              handleDrawerTransitionEnd={handleDrawerTransitionEnd}
              handleDrawerClose={handleDrawerClose}
            />
            <Box
              component="main"
              style={{ width: '100%' }}
              sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px) !important` } }}
            >
              <Toolbar />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <AbilityContext.Provider value={ability}>
                      {children}
                    </AbilityContext.Provider> 
                  
              </LocalizationProvider>
            </Box>
          </>
          ) : (
            <LoadingOverlay />
          )
        }
      </Box>
    </section>
  )
}