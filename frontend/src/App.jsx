import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

// Admin pages
import Dashboard from "./admin/Dashboard";
import QuestionList from "./admin/QuestionList";
import AddQuestion from "./admin/AddQuestion";
import EditQuestion from "./admin/EditQuestion";

// Protected route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin (protected) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/questions"
          element={
            <ProtectedRoute>
              <QuestionList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/questions/add"
          element={
            <ProtectedRoute>
              <AddQuestion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-question/:id"
          element={
            <ProtectedRoute>
              <EditQuestion />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
