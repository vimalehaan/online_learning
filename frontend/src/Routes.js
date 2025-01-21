import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import CoursePage from "./pages/CoursePage";
import StudentProfile from "./pages/StudentProfile";
import OpenAiPrompt from "./pages/OpenAiPrompt";
import Dashboard from "./pages/Admin/Dashboard";

import { AuthContext } from "./Contexts/AuthContext";
import { useContext } from "react";

const RoutesMain = () => {
  const { user } = useContext(AuthContext);
  const userRole = user?.role;

  return (
    <div>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {userRole === "student" ? (
            <>
              <Route path="/studentdash" element={<StudentDashboard />} />
              <Route path="/profile" element={<StudentProfile />} />
              <Route path="/aibot" element={<OpenAiPrompt />} />
              <Route path="/course/:id" element={<CoursePage />} />
            </>
          ) : userRole === "instructor" ? (
            <>
              <Route path="/admin" element={<Dashboard />} />
            </>
          ) : null}
        </Routes>
    </div>
  );
};

export default RoutesMain;
