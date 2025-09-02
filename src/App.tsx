import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SelectOption from './pages/SelectOption';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Contact from './pages/Contact';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Home />} />
              <Route path="/pricing" element={<Home />} />
              <Route path="/select" element={<SelectOption />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;