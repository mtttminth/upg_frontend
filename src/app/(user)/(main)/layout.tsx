'use client'
import ability from "@/services/admin/ability";
import { userTheme } from "@/styles/theme";
import "@/styles/user/user.scss";
import UserFooter from "@/templates/user/Footer";
import UserNavBar from "@/templates/user/Navbar";
import { createContextualCan } from "@casl/react";
import { Box, ThemeProvider, Toolbar } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createContext } from "react";

export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <ThemeProvider theme={userTheme}>
        <Box sx={{ display: 'flex' }}>
          <UserNavBar />
          <Box
            component="main"
            style={{ width: '100%' }}
            sx={{ flexGrow: 1 }}
          >
            <Toolbar />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AbilityContext.Provider value={ability}>
                {children}
              </AbilityContext.Provider> 
            </LocalizationProvider>
            <UserFooter />
          </Box>
        </Box>
      </ThemeProvider>
    </section>
  )
}