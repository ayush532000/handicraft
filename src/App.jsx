import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ProductProvider } from './contexts/ProductContext';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import ECataloguePage from './pages/ECataloguePage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ProductProvider>
        <Routes>
        <Route path="/" element={<RootLayout />}>
    <Route index element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/ecatalogue" element={<ECataloguePage />} />
  </Route>
</Routes>
        </ProductProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;