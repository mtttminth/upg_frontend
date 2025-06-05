import { USER_MENU_ITEM } from "@/consts/AdminsideMenu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import CircleIcon from '@mui/icons-material/Circle';
import LogoutIcon from '@mui/icons-material/Logout';

type MobileDrawerProps = {
  handleDrawerToggle: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({handleDrawerToggle}) => {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const handleClick = (itemId: number) => {
    setOpenItems((prevOpen) => {
      const isOpen = prevOpen.includes(itemId);
      return isOpen ? prevOpen.filter((id) => id !== itemId) : [...prevOpen, itemId];
    });
  };
  const isItemOpen = (itemId: number) => openItems.includes(itemId);
  return (
    <Box className="user-side">
      <Box sx={{ py: 3, flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Image
          src="/images/logo.png"
          width={160}
          height={160}
          priority
          alt="Logo"
          className='logo'
        />
      </Box>
      <Divider />
      <List>
        {USER_MENU_ITEM.map((item, index) => 
          item.type == 'item-tree' ?
          <React.Fragment key={index}>
            <Box sx={{ py: 0.5 }}>
              <ListItemButton onClick={() => handleClick(index)}>
                <Box sx={{ pr: 2 }}>
                  <CircleIcon style={{fontSize: 8}}/>
                </Box>
                <ListItemText primary={item.label} />
                {isItemOpen(index) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </Box>
            <Collapse in={isItemOpen(index)} timeout="auto" unmountOnExit>
              {item.subitems.map((sub_item) => (
                <Box sx={{ py: 0.5 }} key={index}>
                  <Link href={`/${sub_item.href}`}>
                    <ListItem className={pathname == `/${sub_item.href}` ? 'active' : ''} disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <Box sx={{ pr: 2 }}>
                          <CircleIcon style={{fontSize: 8}}/>
                        </Box>
                        <ListItemText primary={sub_item.label} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </Box>
              ))}
            </Collapse>
          </React.Fragment>
          :
          <Link href={`/${item.href}`} key={index}>
            <ListItem 
              key={item.label}
              className={pathname == `/${item.href}` ? 'user-nav-active' : ''}
              disablePadding
            >
              <ListItemButton>
                <Box sx={{ pr: 2 }}>
                  <CircleIcon style={{fontSize: 8}}/>
                </Box>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
      </List>
    </Box>
  )
}

export default MobileDrawer;