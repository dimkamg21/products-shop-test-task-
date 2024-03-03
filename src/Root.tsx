import {
  HashRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductDetailsPage }
  from './pages/ProductDetailsPage/ProductDetailsPage';
import App from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/products/:itemId" element={<ProductDetailsPage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  </Router>
);
