import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import UserDashboard from "./pages/UserDashboard";
import Quiz from "./pages/Quiz"; 
import Result from "./pages/Result";
import ContributeQuestion from "./pages/ContributeQuestion";

// Discovery/Quiz pages (Static Frontend)
import Science from "./discovery/Science";
import Technology from "./discovery/Technology";
import History from "./discovery/History";
import Geography from "./discovery/Geography";

// Admin pages
import Dashboard from "./admin/Dashboard";
import QuestionList from "./admin/QuestionList";
import AddQuestion from "./admin/AddQuestion";
import EditQuestion from "./admin/EditQuestion";
import DeveloperDashboard from "./admin/DeveloperDashboard";
import UserList from "./admin/UserList";
import GlobalAnalytics from "./admin/GlobalAnalytics";

// Protected route component
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import NeuralBackground from "./components/NeuralBackground";

function App() {
  return (
    <Router>
      <NeuralBackground />
      <Navbar />
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
          },
        }}
      />

      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* --- Dynamic User Quiz Routes --- */}
        <Route path="/quiz/:categoryName" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/contribute" element={<ProtectedRoute><ContributeQuestion /></ProtectedRoute>} />
        
        {/* --- Discovery Routes (Hardcoded Frontend) --- */}
        <Route path="/science" element={<Science />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/history" element={<History />} />
        <Route path="/geography" element={<Geography />} />
        
        {/* Profile is protected */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* --- Admin Routes (Protected) --- */}
        <Route path="/admin">
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="questions"
            element={
              <ProtectedRoute>
                <QuestionList />
              </ProtectedRoute>
            }
          />
          <Route
            path="questions/add"
            element={
              <ProtectedRoute>
                <AddQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="questions/edit/:id"
            element={
              <ProtectedRoute>
                <EditQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <ProtectedRoute>
                <GlobalAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="developer"
            element={
              <ProtectedRoute>
                <DeveloperDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 - Page Not Found */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-black text-slate-900">404</h1>
            <p className="text-slate-400 font-medium">Protocol not found.</p>
            <button onClick={() => window.location.href="/"} className="mt-4 text-slate-900 font-black uppercase text-[10px] tracking-widest">Return Home</button>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
