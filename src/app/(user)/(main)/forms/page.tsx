"use client";
import UserFormMainComponent from "@/components/user/forms/Main";
import { Box, ListItemButton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const UserForm = () => {
  const router = useRouter();
  const resources = () => {
    router.push("/resources");
  };
  const contracts = () => {
    router.push("/contracts");
  };
  const forms = () => {
    router.push("/forms");
  };
  return (
    <div style={{ width: "100%" }}>
      <Box className="subtitle-container">
        <Typography variant="h6" sx={{ pt: 3, mx: {xs: 2, md: 10}, mb: 5}}>Forms</Typography>
      </Box>
      <Box sx={{ mt: 4, mx: {xs: 2, md: 10}, mb: 8, position: 'relative'}}>
        <Box className="tab-container">
          <ListItemButton sx={{ p: 0 }} onClick={() => resources()}>
            <Box className="tab-item">
              <Image
                src="/images/resources.png"
                width={80}
                height={80}
                priority
                alt="Logo"
                className='logo'
              />
              <Typography variant="body1" sx={{ marginTop: 1 }}>Resources</Typography>
            </Box>
          </ListItemButton>
          <ListItemButton sx={{ p: 0 }} onClick={() => contracts()}>
            <Box className="tab-item">
              <Image
                src="/images/contract.png"
                width={80}
                height={80}
                priority
                alt="Logo"
                className='logo'
              />
              <Typography variant="body1" sx={{ marginTop: 1 }}>Contracts</Typography>
            </Box>
          </ListItemButton>
          <ListItemButton sx={{ p: 0 }} className='active' onClick={() => forms()}>
            <Box className="tab-item">
              <Image
                src="/images/form.png"
                width={80}
                height={80}
                priority
                alt="Logo"
                className='logo'
              />
              <Typography variant="body1" sx={{ marginTop: 1 }}>Forms</Typography>
            </Box>
          </ListItemButton>
        </Box>
        <Box sx={{ pt: 7 }}>
        <UserFormMainComponent />
        </Box>
      </Box>
    </div>
  );
};

export default UserForm;
