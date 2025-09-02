import { useState, useEffect } from 'react';
import { Camera, FileText, CreditCard, Calendar, Upload, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [rentalContract, setRentalContract] = useState<any>(null);
  const [monthlyReports, setMonthlyReports] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load rental contract
      const { data: contract } = await supabase
        .from('rental_contracts')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      setRentalContract(contract);

      // Load monthly reports
      const { data: reports } = await supabase
        .from('monthly_reports')
        .select('*')
        .eq('rental_contract_id', contract?.id)
        .order('created_at', { ascending: false });
      
      setMonthlyReports(reports || []);

      // Load invoices
      const { data: invoicesData } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      setInvoices(invoicesData || []);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      const fileName = `${user?.id}/${Date.now()}_${file.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('monthly-reports')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create monthly report record
      const currentDate = new Date();
      const { error: insertError } = await supabase
        .from('monthly_reports')
        .insert([{
          rental_contract_id: rentalContract?.id,
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
          photo_url: fileName,
          photo_uploaded_at: currentDate.toISOString()
        }]);

      if (insertError) throw insertError;

      loadUserData(); // Refresh data
    } catch (error) {
      console.error('Photo upload error:', error);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <FileText className="h-5 w-5" /> },
    { id: 'reports', name: 'Monthly Reports', icon: <Camera className="h-5 w-5" /> },
    { id: 'invoices', name: 'Invoices', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'contract', name: 'Contract', icon: <Calendar className="h-5 w-5" /> }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-700 text-white p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-blue-100">Welcome back to your Sudoscan account</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Account Overview</h2>
                
                {rentalContract && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900">Contract Status</h3>
                      <p className="text-2xl font-bold text-blue-700 capitalize">{rentalContract.status}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="font-semibold text-green-900">Tests Used</h3>
                      <p className="text-2xl font-bold text-green-700">{rentalContract.current_test_count}</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h3 className="font-semibold text-orange-900">Contract Days Left</h3>
                      <p className="text-2xl font-bold text-orange-700">
                        {Math.max(0, Math.ceil((new Date(rentalContract.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Monthly Reports</h2>
                  <label className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                    <Upload className="inline h-4 w-4 mr-2" />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-yellow-800">
                      Upload a photo of your device's test counter at the end of each month for billing purposes.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {monthlyReports.map((report) => (
                    <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {report.month}/{report.year}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Tests used: {report.tests_used || 'Pending calculation'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            report.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                            report.payment_status === 'overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.payment_status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Invoices</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Invoice #{invoice.invoice_number}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Due: {new Date(invoice.due_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            €{invoice.total_amount.toFixed(2)}
                          </p>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contract' && rentalContract && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Rental Contract</h2>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Contract Details</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Start Date:</span> {new Date(rentalContract.start_date).toLocaleDateString()}</p>
                        <p><span className="font-medium">End Date:</span> {new Date(rentalContract.end_date).toLocaleDateString()}</p>
                        <p><span className="font-medium">Monthly Rate:</span> €{rentalContract.monthly_rate}</p>
                        <p><span className="font-medium">Tests Included:</span> {rentalContract.total_tests_included}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Usage Statistics</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Current Test Count:</span> {rentalContract.current_test_count}</p>
                        <p><span className="font-medium">Test Kit Number:</span> #{rentalContract.test_kit_number}</p>
                        <p><span className="font-medium">Status:</span> <span className="capitalize">{rentalContract.status}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}