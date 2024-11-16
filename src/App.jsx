// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ProductProvider } from "./contexts/ProductContext";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CategoryTypes from "./pages/CategoryTypes"; // New component
import BlogPage from "./pages/BlogPage";
import ECataloguePage from "./pages/ECataloguePage";
import { AnimatePresence } from "framer-motion";
import AdminAuth from "./components/admin/AdminAuth";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <HelmetProvider>
      <ProductProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="category/:categoryName" element={<CategoryTypes />} />
              </Route>
              <Route path="/admin" element={<AdminAuth />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </Router>
      </ProductProvider>
    </HelmetProvider>
  );
}

export default App;
