import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "@/common/contexts/authContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Email, Logout } from "@mui/icons-material";
import { useRouter } from "next/router";
import { PATH_AUTH } from "@/common/routes/path";

function AuthMenu() {
  const router = useRouter();
  const {
    isAuthenticated,
    firstname,
    lastname,
    email,
    logout = () => {},
  } = useAuthContext() || {};
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return isAuthenticated ? (
    <>
      <Button
        id="auth-menu-button"
        aria-controls={open ? "auth-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={(event) => setAnchorEl(event.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {firstname} {lastname}
      </Button>
      <Menu
        id="auth-menu"
        MenuListProps={{ "aria-labelledby": "auth-menu" }}
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <Box mr={2}>
            <Email />
          </Box>
          {email}
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}
          disableRipple
        >
          <Box mr={2}>
            <Logout />
          </Box>
          Logout
        </MenuItem>
      </Menu>
    </>
  ) : (
    <div className="flex gap-x-4">
      <Button variant="contained" onClick={() => router.push(PATH_AUTH.login)}>
        SIGN IN
      </Button>
    </div>
  );
}

export default AuthMenu;
