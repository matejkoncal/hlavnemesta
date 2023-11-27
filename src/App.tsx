import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress, CssBaseline, Paper } from '@mui/material';
import { useUser } from './firebaseService/useCurrentUser';
import { useState } from 'react';
import { GoogleLogin } from './googleLogin/googleLogin';
import { Menu } from './menu/menu';
import { LoginBar } from './loginBar/loginBar';
import { Playground } from './playground/playground';


function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const { user, signIn, logOut, loading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (<ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className="App">
      <Menu isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <LoginBar userName={user?.displayName || ""} logOut={logOut} onMenuClisk={() => setIsMenuOpen(true)} />
      <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "600px", width: "400px", maxHeight: "100%", maxWidth: "100%" }}>
        {
          loading ? <CircularProgress /> :
            user ?
              <Playground /> :
              <GoogleLogin onClick={signIn} />
        }
      </Paper>
    </div>
  </ThemeProvider>
  );
}

export default App;
