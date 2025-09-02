import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/select"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 group"
              >
                {t('purchaseOption')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/select"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300 group border-2 border-blue-400"
              >
                {t('rentalOption')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-300" />
                <span className="text-blue-100">Medical Grade</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-300" />
                <span className="text-blue-100">1000+ Patients</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-blue-300" />
                <span className="text-blue-100">CE Certified</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg"
                alt="Sudoscan Device"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sudoscan Device</h3>
                <p className="text-gray-600">Advanced Neuropathy Screening</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}