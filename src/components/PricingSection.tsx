import { Check, Euro, Calculator } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function PricingSection() {
  const { t } = useLanguage();

  const purchaseFeatures = [
    'Complete device ownership',
    '1,000-patient electrode set included',
    'Full software license',
    'Technical support for 1 year',
    'Training and installation'
  ];

  const rentalFeatures = [
    '7-day mandatory trial period',
    'Flexible rental up to 365 days',
    'Monthly payment structure',
    'Free second test kit if needed',
    'Full technical support',
    'Training included'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Option
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible solutions to meet your healthcare institution's needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Purchase Option */}
          <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-200 transition-colors">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Euro className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Purchase</h3>
              <div className="text-3xl font-bold text-blue-700 mb-2">
                {t('purchasePrice')}
              </div>
              <p className="text-gray-600">{t('includes')}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {purchaseFeatures.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
              {t('purchaseOption')}
            </button>
          </div>

          {/* Rental Option */}
          <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-300 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-700 rounded-full mb-4">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Rental Service</h3>
              <div className="text-3xl font-bold text-blue-700 mb-2">
                {t('rentalRate')}
              </div>
              <p className="text-gray-600">Pay per test used</p>
            </div>

            <ul className="space-y-4 mb-8">
              {rentalFeatures.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
              {t('rentalOption')}
            </button>
          </div>
        </div>

        <div className="mt-16 bg-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help Deciding?</h3>
          <p className="text-blue-100 mb-6">
            Our team can help you choose the best option for your institution
          </p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}