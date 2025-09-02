export interface User {
  id: string;
  email: string;
  full_name: string;
  mobile_phone: string;
  national_id: string;
  billing_institution: string;
  institution_address: string;
  contact_person_email: string;
  contact_person_phone: string;
  country: string;
  language: 'en' | 'tr';
  gdpr_consent: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrder {
  id: string;
  user_id: string;
  device_price: number;
  vat_amount: number;
  total_amount: number;
  payment_method: string;
  agreement_signed: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface RentalContract {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  monthly_rate: number;
  total_tests_included: number;
  current_test_count: number;
  test_kit_number: number;
  status: 'trial' | 'active' | 'terminated' | 'completed';
  trial_end_date: string;
  contract_signed: boolean;
  created_at: string;
  updated_at: string;
}

export interface MonthlyReport {
  id: string;
  rental_contract_id: string;
  month: number;
  year: number;
  test_count_start: number;
  test_count_end: number;
  tests_used: number;
  amount_due: number;
  photo_url: string;
  photo_uploaded_at: string;
  invoice_generated: boolean;
  payment_status: 'pending' | 'paid' | 'overdue';
  due_date: string;
  paid_date?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  user_id: string;
  rental_contract_id?: string;
  purchase_order_id?: string;
  monthly_report_id?: string;
  invoice_number: string;
  amount: number;
  vat_amount: number;
  total_amount: number;
  due_date: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paid_date?: string;
  created_at: string;
}

export interface Device {
  id: string;
  serial_number: string;
  model: string;
  status: 'available' | 'rented' | 'sold' | 'maintenance';
  user_id?: string;
  rental_contract_id?: string;
  purchase_order_id?: string;
  created_at: string;
  updated_at: string;
}