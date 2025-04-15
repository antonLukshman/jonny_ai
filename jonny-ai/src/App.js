import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ChatWindow from "./components/Chat/ChatWindow";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Common/Header";
import "./styles/globals.css";

// Private route component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Main layout component for authenticated users
function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ChatProvider>
      <div className="h-screen flex flex-col">
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

          <div
            className="flex-1 overflow-hidden"
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          >
            <ChatWindow />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
