import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Building, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function Registration() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { signUp } = useAuth();
  
  const selectedOption = location.state?.option || 'rental';
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobilePhone: '',
    nationalId: '',
    billingInstitution: '',
    institutionAddress: '',
    contactPersonEmail: '',
    contactPersonPhone: '',
    email: '',
    password: '',
    gdprConsent: false,
    termsConsent: false
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        mobile_phone: formData.mobilePhone,
        national_id: formData.nationalId,
        billing_institution: formData.billingInstitution,
        institution_address: formData.institutionAddress,
        contact_person_email: formData.contactPersonEmail,
        contact_person_phone: formData.contactPersonPhone,
        gdpr_consent: formData.gdprConsent
      });

      navigate(selectedOption === 'purchase' ? '/purchase' : '/rental');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Registration
            </h1>
            <p className="text-gray-600">
              Selected Option: <span className="font-semibold text-blue-700 capitalize">{selectedOption}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-2" />
                  {t('mobilePhone')} *
                </label>
                <input
                  type="tel"
                  name="mobilePhone"
                  value={formData.mobilePhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('nationalId')} *
                </label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Institution Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Institution Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="inline h-4 w-4 mr-2" />
                    {t('billingInstitution')} *
                  </label>
                  <input
                    type="text"
                    name="billingInstitution"
                    value={formData.billingInstitution}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    {t('institutionAddress')} *
                  </label>
                  <textarea
                    name="institutionAddress"
                    value={formData.institutionAddress}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contactEmail')} *
                    </label>
                    <input
                      type="email"
                      name="contactPersonEmail"
                      value={formData.contactPersonEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contactPhone')} *
                    </label>
                    <input
                      type="tel"
                      name="contactPersonPhone"
                      value={formData.contactPersonPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Setup */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Setup</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Consent */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <Shield className="inline h-5 w-5 mr-2" />
                Consent & Privacy
              </h3>
              
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="gdprConsent"
                  checked={formData.gdprConsent}
                  onChange={handleInputChange}
                  required
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {t('gdprConsent')} *
                </span>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="termsConsent"
                  checked={formData.termsConsent}
                  onChange={handleInputChange}
                  required
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the Terms and Conditions *
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.gdprConsent || !formData.termsConsent}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors"
            >
              {loading ? 'Processing...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}