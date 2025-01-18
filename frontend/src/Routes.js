import {BrowserRouter as Router, Route, Routes, Switch} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import CoursePage from "./pages/CoursePage";
import StudentProfile from "./pages/StudentProfile";
import OpenAiPrompt from "./pages/OpenAiPrompt";

const RoutesMain = () => {
    return (
            <div>
                <Router>
                    <Routes>
                       <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/studentdash" element={<StudentDashboard />} />
                        <Route path="/course/:id" element={<CoursePage />} />
                        <Route path="/profile/student" element={<StudentProfile />} />
                        <Route path="/prompt" element={<OpenAiPrompt />} />
                    </Routes>
                </Router>
            </div>
    );
};

export default RoutesMain;