import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CollectionDetailPage from './pages/CollectionDetailPage.jsx';
import ItemDetailPage from './pages/ItemDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const location = useLocation();
  const showFooter = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/collections"
            element={
              <RequireAuth>
                <CollectionsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/collections/:collectionId"
            element={
              <RequireAuth>
                <CollectionDetailPage />
              </RequireAuth>
            }
          />
          <Route
            path="/items/:itemId"
            element={
              <RequireAuth>
                <ItemDetailPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
