import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle, Heart, Brain, Clock, Users } from 'lucide-react';

export default function ProductInfo() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Cardiovascular Assessment',
      description: 'Early detection of cardiovascular autonomic dysfunction'
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: 'Diabetic Neuropathy',
      description: 'Non-invasive screening for diabetic complications'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Quick Testing',
      description: '3-minute test with immediate results'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Patient Friendly',
      description: 'Non-invasive and comfortable for patients'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('productTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('productDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-blue-700 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Clinical Benefits
              </h3>
              <ul className="space-y-4">
                {[
                  'Early detection of autonomic dysfunction',
                  'Quantitative assessment of sudomotor function',
                  'Risk stratification for diabetic patients',
                  'Monitoring treatment efficacy',
                  'Non-invasive and rapid testing',
                  'Standardized and reproducible results'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg"
                alt="Medical Professional"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-blue-700 bg-opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}