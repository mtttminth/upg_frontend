import "@/styles/admin/admin.scss";
import Link from 'next/link';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import CircleIcon from '@mui/icons-material/Circle';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { DRAWER_WIDTH, SIDE_MENU_ITEM } from "@/consts/AdminsideMenu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, ListItem } from "@mui/material";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import { Can } from "@/app/admin/(main)/layout";
import React, { useState } from "react";
import { Permission } from "@/consts/common";

type SideMenuProps = {
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({mobileOpen, handleDrawerTransitionEnd,handleDrawerClose}) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const pathname = usePathname();
  const handleClick = (itemId: number) => {
    setOpenItems((prevOpen) => {
      const isOpen = prevOpen.includes(itemId);
      return isOpen ? prevOpen.filter((id) => id !== itemId) : [...prevOpen, itemId];
    });
  };

  const isItemOpen = (itemId: number) => openItems.includes(itemId);

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {SIDE_MENU_ITEM.map((menu, index) => (
          menu.type == 'item' ? (
            <Can I={menu.permission} a="admin">
              <Box sx={{ py: 0.5 }} key={index}>
                <Link href={`/admin/${menu.href}`}>
                  <ListItem className={pathname == `/admin/${menu.href}` ? 'active' : ''} disablePadding>
                    <ListItemButton>
                      <Box sx={{ pr: 2 }}>
                        <Image
                          src={`/images/icons/${menu.icon}`}
                          width="0"
                          height="0"
                          style={{ width: '20px', height: 'auto' }}
                          alt="Logo"
                        />
                      </Box>
                      <ListItemText primary={menu.label} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </Box>
            </Can>
          ) :(
            <React.Fragment key={index}>
              <Can I={menu.permission} a="admin">
                <Box sx={{ py: 0.5 }}>
                  <ListItemButton onClick={() => handleClick(index)}>
                    <Box sx={{ pr: 2 }}>
                      <Image
                        src={`/images/icons/${menu.icon}`}
                        width="0"
                        height="0"
                        style={{ width: '20px', height: 'auto' }}
                        alt="Logo"
                      />
                    </Box>
                    <ListItemText primary={menu.label} />
                    {isItemOpen(index) ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </Box>
                <Collapse in={isItemOpen(index)} timeout="auto" unmountOnExit>
                  {menu.subitems.map((sub_menu) => (
                    <Can I={sub_menu.permission} a="admin" key={index}>
                      <Box sx={{ py: 0.5 }}>
                        <Link href={`/admin/${sub_menu.href}`}>
                          <ListItem className={pathname == `/admin/${sub_menu.href}` ? 'active' : ''} disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              <Box sx={{ pr: 2 }}>
                                <CircleIcon style={{fontSize: 10}}/>
                              </Box>
                              <ListItemText primary={sub_menu.label} />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      </Box>
                    </Can>
                  ))}
                </Collapse>
              </Can>
            </React.Fragment>
          )
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default SideMenu;