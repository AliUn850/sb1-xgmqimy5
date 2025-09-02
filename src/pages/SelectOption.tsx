import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Calendar, Euro, Calculator } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SelectOption() {
  const [selectedOption, setSelectedOption] = useState<'purchase' | 'rental' | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleContinue = () => {
    if (selectedOption) {
      navigate('/register', { state: { option: selectedOption } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Option
          </h1>
          <p className="text-xl text-gray-600">
            Select the best option for your healthcare institution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Purchase Option */}
          <div
            className={`bg-white rounded-2xl p-8 border-2 cursor-pointer transition-all duration-300 ${
              selectedOption === 'purchase'
                ? 'border-blue-500 shadow-lg transform scale-105'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
            onClick={() => setSelectedOption('purchase')}
          >
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                selectedOption === 'purchase' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <ShoppingCart className={`h-8 w-8 ${
                  selectedOption === 'purchase' ? 'text-blue-700' : 'text-gray-600'
                }`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Purchase Device
              </h3>
              
              <div className="text-3xl font-bold text-blue-700 mb-4">
                {t('purchasePrice')}
              </div>
              
              <p className="text-gray-600 mb-6">
                Complete ownership with full warranty and support
              </p>
              
              <div className="space-y-2 text-left">
                <div className="flex items-center text-gray-700">
                  <Euro className="h-4 w-4 mr-2 text-green-600" />
                  Device + 1,000 electrode set
                </div>
                <div className="flex items-center text-gray-700">
                  <Euro className="h-4 w-4 mr-2 text-green-600" />
                  Full software license
                </div>
                <div className="flex items-center text-gray-700">
                  <Euro className="h-4 w-4 mr-2 text-green-600" />
                  1-year warranty
                </div>
              </div>
            </div>
          </div>

          {/* Rental Option */}
          <div
            className={`bg-white rounded-2xl p-8 border-2 cursor-pointer transition-all duration-300 relative ${
              selectedOption === 'rental'
                ? 'border-blue-500 shadow-lg transform scale-105'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
            onClick={() => setSelectedOption('rental')}
          >
            <div className="absolute top-0 right-4 transform -translate-y-1/2">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Recommended
              </span>
            </div>
            
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                selectedOption === 'rental' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Calendar className={`h-8 w-8 ${
                  selectedOption === 'rental' ? 'text-blue-700' : 'text-gray-600'
                }`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Rental Service
              </h3>
              
              <div className="text-3xl font-bold text-blue-700 mb-4">
                {t('rentalRate')}
              </div>
              
              <p className="text-gray-600 mb-6">
                Flexible rental with trial period
              </p>
              
              <div className="space-y-2 text-left">
                <div className="flex items-center text-gray-700">
                  <Calculator className="h-4 w-4 mr-2 text-green-600" />
                  7-day trial period
                </div>
                <div className="flex items-center text-gray-700">
                  <Calculator className="h-4 w-4 mr-2 text-green-600" />
                  Monthly payments
                </div>
                <div className="flex items-center text-gray-700">
                  <Calculator className="h-4 w-4 mr-2 text-green-600" />
                  1,000 tests included
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedOption}
            className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
              selectedOption
                ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Registration
          </button>
        </div>
      </div>
    </div>
  );
}