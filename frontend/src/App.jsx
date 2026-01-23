import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz"; // 🔥 Added
import Result from "./pages/Result"; // 🔥 Added

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

// Protected route component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
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
        
        {/* --- Dynamic User Quiz Routes --- */}
        {/* These handle questions added by the Admin via the backend */}
        <Route path="/quiz/:categoryName" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        
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
        </Route>

        {/* 404 - Page Not Found */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafafa]">
            <h1 className="text-4xl font-black text-slate-900">404</h1>
            <p className="text-slate-500 font-medium">Page not found.</p>
            <button onClick={() => window.location.href="/"} className="mt-4 text-blue-600 font-bold uppercase text-[10px] tracking-widest">Return Home</button>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;