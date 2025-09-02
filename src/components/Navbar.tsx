import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Stethoscope } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('product'), href: '/product' },
    { name: t('pricing'), href: '/pricing' },
    { name: t('contact'), href: '/contact' },
  ];

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-700" />
              <span className="text-xl font-bold text-gray-900">Sudoscan</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.href ? 'text-blue-700 border-b-2 border-blue-700' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <button
              onClick={handleLanguageToggle}
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-700 px-3 py-2 text-sm font-medium"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{language}</span>
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-blue-700 hover:text-blue-800 px-3 py-2 text-sm font-medium"
                >
                  {t('dashboard')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t('login')}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <button
              onClick={handleLanguageToggle}
              className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>Language: {language.toUpperCase()}</span>
            </button>

            {user ? (
              <div className="space-y-1">
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-blue-700 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  {t('dashboard')}
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md mx-3 my-2 text-center"
                onClick={() => setIsOpen(false)}
              >
                {t('login')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}