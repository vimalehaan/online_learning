import "./App.css";
import RoutesMain from "./Routes";
import { AuthProvider } from "./Contexts/AuthContext";
import theme from "./Themes/Theme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RoutesMain />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
