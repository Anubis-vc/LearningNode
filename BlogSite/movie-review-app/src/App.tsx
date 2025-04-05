import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import './App.css'

import Home from "./pages/Home"
import Login from "./pages/Login"
import MoviePost from "./pages/MoviePost"
import Register from "./pages/Register"
import Unauthorized from "./pages/Unauthorized"

// Protected Pages
import PostEditor from "./pages/PostEditor"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<MoviePost />} />
          {/* <Route path="/user/:username" element={<User />} */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute requireAuth={true} />}>
            <Route path="/posts/new" element={<PostEditor />} />
            <Route path="/posts/edit" element={<PostEditor />} />
          </Route>

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;