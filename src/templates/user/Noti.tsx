// UserNoti.tsx
"use client";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchUserNotification,
  removeUserNotification,
} from "@/store/thunks/user/authThunk";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import {
  Badge,
  Box,
  ButtonBase,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircleIcon from "@mui/icons-material/Circle";
import { concatStrings } from "@/utils/common";
import { markNotificationAsRead } from "@/store/slices/user/authSlice";

const UserNoti = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { loading, userNotification } = useSelector(
    (state: RootState) => state.userAuth
  );

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    dispatch(fetchUserNotification());
  }, [dispatch]);

  const handleNotificationNavigate = (
    notificationId: string,
    referenceId: string
  ) => {
    dispatch(markNotificationAsRead(notificationId));
    handleCloseUserMenu();
  };

  const handleRemoveNotification = (
    event: MouseEvent,
    notificationId: string
  ) => {
    event.stopPropagation();
    dispatch(removeUserNotification(notificationId));
  };

  return (
    <>
      <ButtonBase onClick={handleOpenUserMenu}>
        <Badge badgeContent={userNotification.length} color="error">
          <NotificationsIcon className="nav-menu" />
        </Badge>
      </ButtonBase>
      <Menu
        sx={{ mt: "40px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        MenuListProps={{ sx: { py: 0 } }}
      >
        {userNotification.length !== 0 ? (
          userNotification.map((noti) => (
            <MenuItem
              key={noti.id}
              sx={{
                py: 1,
                px: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link
                href={`/releases/detail/${noti.reference_id}`}
                onClick={() =>
                  handleNotificationNavigate(noti.id, noti.reference_id)
                }
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  marginRight: "8px",
                }}
              >
                <CircleIcon
                  sx={{
                    fontSize: 8,
                    color: "blue",
                    mr: "10px",
                    flexShrink: 0,
                  }}
                />
                <ListItemText
                  primary={concatStrings(noti.message, 30)}
                  primaryTypographyProps={{
                    variant: "body2",
                    sx: { whiteSpace: "normal" },
                  }}
                />
              </Link>
              <IconButton
                size="small"
                onClick={(e) => handleRemoveNotification(e, noti.id)}
                aria-label="remove notification"
                sx={{ ml: 1, p: 0.5, flexShrink: 0 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <ListItemText>No Notifications Yet</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserNoti;
