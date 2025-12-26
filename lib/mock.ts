export type Id = string;

export type Product = {
  id: number;
  sku: string;
  name: string;
  category: string;
  cost_price: number;
  selling_price: number;
  units: number;
  reorder_level: number;
};

export type Customer = {
  id: number;
  type: "individual" | "business";
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  outstanding_balance: number;
  lifetime_spend: number;
};

export type Sale = {
  id: number;
  sale_number: string;
  sale_date: string; // ISO
  customer_id?: number;
  customer_name?: string;
  total_amount: number;
  amount_paid: number;
  balance_due: number;
  status: "paid" | "pending";
};

export type PurchaseOrder = {
  id: number;
  po_number: string;
  supplier_name: string;
  created_at: string;
  expected_delivery?: string;
  total_amount: number;
  status: "draft" | "ordered" | "partially_received" | "received";
};

export type Supplier = {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
};

export type Invoice = {
  id: number;
  invoice_number: string;
  customer_name: string;
  issue_date: string;
  due_date: string;
  total_amount: number;
  status: "draft" | "sent" | "overdue" | "paid" | "void";
};

export type Expense = {
  id: number;
  expense_date: string;
  category: string;
  vendor?: string;
  description: string;
  amount: number;
  receipt_url?: string;
};

export const mock = {
  me: {
    id: "00000000-0000-0000-0000-000000000000",
    email: "demo@bizhelm.app",
    first_name: "Demo",
    last_name: "User",
    role: "Admin"
  },
  kpis: {
    todaySales: 1250.0,
    cashCollected: 980.0,
    lowStockCount: 4,
    unpaidBalances: 2
  },
  products: [
    { id: 101, sku: "SKU-001", name: "Premium Soap", category: "Hygiene", cost_price: 3.5, selling_price: 7.0, units: 18, reorder_level: 20 },
    { id: 102, sku: "SKU-002", name: "Hand Sanitizer 500ml", category: "Hygiene", cost_price: 4.0, selling_price: 9.5, units: 6, reorder_level: 12 },
    { id: 103, sku: "SKU-003", name: "Rice 5kg", category: "Groceries", cost_price: 18.0, selling_price: 25.0, units: 32, reorder_level: 15 },
    { id: 104, sku: "SKU-004", name: "Tea Bags 100ct", category: "Groceries", cost_price: 6.0, selling_price: 10.0, units: 9, reorder_level: 10 },
    { id: 105, sku: "SKU-005", name: "Notebook A5", category: "Stationery", cost_price: 1.2, selling_price: 3.0, units: 48, reorder_level: 25 }
  ] satisfies Product[],
  customers: [
    { id: 201, type: "individual", first_name: "Ama", last_name: "Mensah", email: "ama@example.com", phone: "+233 24 000 0000", outstanding_balance: 0, lifetime_spend: 540 },
    { id: 202, type: "business", company_name: "Bluewave Traders", email: "accounts@bluewave.com", phone: "+233 55 000 0000", outstanding_balance: 120, lifetime_spend: 2450 },
    { id: 203, type: "individual", first_name: "Kojo", last_name: "Asante", email: "kojo@example.com", phone: "+233 20 000 0000", outstanding_balance: 75, lifetime_spend: 980 }
  ] satisfies Customer[],
  sales: [
    { id: 301, sale_number: "S-000301", sale_date: new Date().toISOString(), customer_id: 201, customer_name: "Ama Mensah", total_amount: 120, amount_paid: 120, balance_due: 0, status: "paid" },
    { id: 302, sale_number: "S-000302", sale_date: new Date(Date.now() - 86400000).toISOString(), customer_id: 203, customer_name: "Kojo Asante", total_amount: 75, amount_paid: 0, balance_due: 75, status: "pending" },
    { id: 303, sale_number: "S-000303", sale_date: new Date(Date.now() - 2 * 86400000).toISOString(), customer_id: 202, customer_name: "Bluewave Traders", total_amount: 540, amount_paid: 420, balance_due: 120, status: "pending" }
  ] satisfies Sale[],
  purchaseOrders: [
    { id: 401, po_number: "PO-000401", supplier_name: "Accra Supply Co.", created_at: new Date(Date.now() - 3 * 86400000).toISOString(), expected_delivery: new Date(Date.now() + 2 * 86400000).toISOString(), total_amount: 980, status: "ordered" },
    { id: 402, po_number: "PO-000402", supplier_name: "Coastal Wholesale", created_at: new Date(Date.now() - 10 * 86400000).toISOString(), expected_delivery: new Date(Date.now() - 2 * 86400000).toISOString(), total_amount: 420, status: "partially_received" }
  ] satisfies PurchaseOrder[],
  suppliers: [
    { id: 701, name: "Accra Supply Co.", phone: "+233 30 000 0000", email: "sales@accrasupply.example", address: "Accra" },
    { id: 702, name: "Coastal Wholesale", phone: "+233 31 000 0000", email: "orders@coastal.example", address: "Cape Coast" }
  ] satisfies Supplier[],
  invoices: [
    { id: 501, invoice_number: "INV-000501", customer_name: "Bluewave Traders", issue_date: new Date(Date.now() - 8 * 86400000).toISOString(), due_date: new Date(Date.now() - 1 * 86400000).toISOString(), total_amount: 540, status: "overdue" },
    { id: 502, invoice_number: "INV-000502", customer_name: "Kojo Asante", issue_date: new Date(Date.now() - 1 * 86400000).toISOString(), due_date: new Date(Date.now() + 6 * 86400000).toISOString(), total_amount: 75, status: "sent" }
  ] satisfies Invoice[],
  expenses: [
    { id: 601, expense_date: new Date(Date.now() - 2 * 86400000).toISOString(), category: "Utilities", vendor: "ECG", description: "Electricity", amount: 120, receipt_url: "" },
    { id: 602, expense_date: new Date(Date.now() - 5 * 86400000).toISOString(), category: "Transport", vendor: "Fuel", description: "Delivery fuel", amount: 85, receipt_url: "" }
  ] satisfies Expense[]
};

export function displayCustomerName(c: Customer) {
  return c.type === "business" ? c.company_name || "(Business)" : `${c.first_name || ""} ${c.last_name || ""}`.trim();
}
