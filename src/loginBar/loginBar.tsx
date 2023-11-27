import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

interface LoginBarProps {
  userName?: string;
  logOut?: () => void;
  onMenuClisk?: () => void;
}

export const LoginBar = ({ userName, logOut, onMenuClisk }: LoginBarProps) => {
  return (<AppBar position="static">
    <Toolbar>
      <IconButton
        onClick={onMenuClisk}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {userName}
      </Typography>
      {
        userName && <Button color="inherit" onClick={async () => logOut?.()}>Logout</Button>
      }
    </Toolbar>
  </AppBar>
  )
}
