import "./App.css";
import RoutesMain from "./Routes";
import { AuthProvider } from "./Contexts/AuthContext";
import theme from "./Themes/Theme";
import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { isTokenExpired } from "./Components/Utils/AuthUtil";
import { useNavigate } from "react-router-dom";

function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const token = Cookies.get("authToken");
  //   if (!token || isTokenExpired(token)) {
  //     Cookies.remove("authToken");
  //     navigate("/login");
  //   }
  // }, [navigate]);
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
