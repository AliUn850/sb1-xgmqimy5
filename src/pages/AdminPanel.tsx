import { useState, useEffect } from 'react';
import { Users, TestTube, Euro, Package, BarChart3, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminPanel() {
  const [stats, setStats] = useState({
    totalRenters: 0,
    totalTestsInvoiced: 0,
    pendingBilling: 0,
    totalUsers: 0,
    totalDevices: 0
  });

  const [users, setUsers] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      // Load statistics
      const { data: usersData } = await supabase.from('users').select('*');
      const { data: contractsData } = await supabase.from('rental_contracts').select('*');
      const { data: reportsData } = await supabase.from('monthly_reports').select('*');
      const { data: devicesData } = await supabase.from('devices').select('*');

      setUsers(usersData || []);
      setContracts(contractsData || []);
      setDevices(devicesData || []);

      const totalTestsInvoiced = reportsData?.reduce((sum, report) => sum + (report.tests_used || 0), 0) || 0;
      const pendingBilling = contractsData?.filter(c => c.status === 'active').length || 0;

      setStats({
        totalRenters: contractsData?.filter(c => c.status === 'active').length || 0,
        totalTestsInvoiced,
        pendingBilling,
        totalUsers: usersData?.length || 0,
        totalDevices: devicesData?.length || 0
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'users', name: 'Users', icon: <Users className="h-5 w-5" /> },
    { id: 'contracts', name: 'Contracts', icon: <FileText className="h-5 w-5" /> },
    { id: 'devices', name: 'Devices', icon: <Package className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-700 text-white p-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-blue-100">Manage Sudoscan rental operations</p>
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
                <h2 className="text-xl font-semibold text-gray-900">Dashboard Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-blue-700 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Current Renters</p>
                        <p className="text-2xl font-bold text-blue-700">{stats.totalRenters}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <TestTube className="h-8 w-8 text-green-700 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-green-900">Tests Invoiced</p>
                        <p className="text-2xl font-bold text-green-700">{stats.totalTestsInvoiced}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Euro className="h-8 w-8 text-orange-700 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-orange-900">Pending Billing</p>
                        <p className="text-2xl font-bold text-orange-700">{stats.pendingBilling}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-purple-700 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-purple-900">Total Users</p>
                        <p className="text-2xl font-bold text-purple-700">{stats.totalUsers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-gray-700 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Total Devices</p>
                        <p className="text-2xl font-bold text-gray-700">{stats.totalDevices}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Institution
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registered
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.billing_institution}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Rental Contracts</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {contracts.map((contract) => (
                    <div key={contract.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900">Contract #{contract.id.slice(0, 8)}</h3>
                          <p className="text-sm text-gray-600">
                            Period: {new Date(contract.start_date).toLocaleDateString()} - {new Date(contract.end_date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Tests: {contract.current_test_count} / {contract.total_tests_included}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          contract.status === 'active' ? 'bg-green-100 text-green-800' :
                          contract.status === 'trial' ? 'bg-blue-100 text-blue-800' :
                          contract.status === 'terminated' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {contract.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'devices' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Device Inventory</h2>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors">
                    Add Device
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {devices.map((device) => (
                    <div key={device.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">#{device.serial_number}</h3>
                          <p className="text-sm text-gray-600">{device.model}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          device.status === 'available' ? 'bg-green-100 text-green-800' :
                          device.status === 'rented' ? 'bg-blue-100 text-blue-800' :
                          device.status === 'sold' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {device.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Added: {new Date(device.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}