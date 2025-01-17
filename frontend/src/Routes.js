import {BrowserRouter as Router, Route, Routes, Switch} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const RoutesMain = () => {
    return (
            <div>
                <Router>
                    <Routes>
                       <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </div>
    );
};

export default RoutesMain;