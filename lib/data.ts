import { bhFetch } from "@/lib/api";
import { mock, type Customer, type Expense, type Invoice, type Product, type PurchaseOrder, type Sale, type Supplier } from "@/lib/mock";

export const useMock = () => process.env.NEXT_PUBLIC_MOCK_MODE === "true";

function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  return fn().catch(() => fallback);
}

export async function getMe() {
  if (useMock()) return mock.me;
  return safe(() => bhFetch("/auth/me"), mock.me as any);
}

export async function getHome() {
  if (useMock()) {
    const lowStock = mock.products.filter(p => p.units <= p.reorder_level);
    return {
      kpis: mock.kpis,
      lowStock,
      unpaidSales: mock.sales.filter(s => s.balance_due > 0),
      openPOs: mock.purchaseOrders.filter(po => po.status === "ordered" || po.status === "partially_received"),
      overdueInvoices: mock.invoices.filter(i => i.status === "overdue"),
    };
  }
  // For now: try to pull key resources; fall back to mock.
  return safe(async () => {
    const [lowStock, unpaidSales, openPOs, overdueInvoices] = await Promise.all([
      bhFetch<Product[]>("/inventory/low-stock"),
      bhFetch<Sale[]>("/sales?status=pending"),
      bhFetch<PurchaseOrder[]>("/purchase-orders?status=draft,ordered,partially_received&limit=5"),
      bhFetch<Invoice[]>("/invoices?status=overdue&limit=5"),
    ]);
    return {
      kpis: mock.kpis,
      lowStock,
      unpaidSales,
      openPOs,
      overdueInvoices,
    };
  }, {
    kpis: mock.kpis,
    lowStock: mock.products.filter(p => p.units <= p.reorder_level),
    unpaidSales: mock.sales.filter(s => s.balance_due > 0),
    openPOs: mock.purchaseOrders.filter(po => po.status === "ordered" || po.status === "partially_received"),
    overdueInvoices: mock.invoices.filter(i => i.status === "overdue"),
  });
}

export async function listProducts(query?: string): Promise<Product[]> {
  if (useMock()) {
    const q = (query || "").toLowerCase();
    return mock.products.filter(p => !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }
  return safe(() => bhFetch<Product[]>(`/products?search=${encodeURIComponent(query || "")}`), mock.products);
}

export async function getProduct(id: number): Promise<Product | null> {
  if (useMock()) return mock.products.find(p => p.id === id) || null;
  return safe(() => bhFetch<Product>(`/products/${id}`), mock.products.find(p => p.id === id) || null);
}

export async function listCustomers(query?: string): Promise<Customer[]> {
  if (useMock()) {
    const q = (query || "").toLowerCase();
    return mock.customers.filter(c => {
      const name = (c.type === "business" ? c.company_name : `${c.first_name || ""} ${c.last_name || ""}`).toLowerCase();
      return !q || name.includes(q) || (c.email || "").toLowerCase().includes(q) || (c.phone || "").toLowerCase().includes(q);
    });
  }
  return safe(() => bhFetch<Customer[]>(`/customers?search=${encodeURIComponent(query || "")}`), mock.customers);
}

export async function getCustomer(id: number): Promise<Customer | null> {
  if (useMock()) return mock.customers.find(c => c.id === id) || null;
  return safe(() => bhFetch<Customer>(`/customers/${id}`), mock.customers.find(c => c.id === id) || null);
}

export async function listSales(): Promise<Sale[]> {
  if (useMock()) return mock.sales;
  return safe(() => bhFetch<Sale[]>("/sales"), mock.sales);
}

export async function getSale(id: number): Promise<Sale | null> {
  if (useMock()) return mock.sales.find(s => s.id === id) || null;
  return safe(() => bhFetch<Sale>(`/sales/${id}`), mock.sales.find(s => s.id === id) || null);
}

export async function listPurchaseOrders(): Promise<PurchaseOrder[]> {
  if (useMock()) return mock.purchaseOrders;
  return safe(() => bhFetch<PurchaseOrder[]>("/purchase-orders"), mock.purchaseOrders);
}

export async function listSuppliers(query?: string): Promise<Supplier[]> {
  if (useMock()) {
    const q = (query || "").toLowerCase();
    return mock.suppliers.filter(s => !q || s.name.toLowerCase().includes(q));
  }
  return safe(() => bhFetch<Supplier[]>(`/suppliers?search=${encodeURIComponent(query || "")}`), mock.suppliers as any);
}

export async function getSupplier(id: number): Promise<Supplier | null> {
  if (useMock()) return mock.suppliers.find(s => s.id === id) || null;
  return safe(() => bhFetch<Supplier>(`/suppliers/${id}`), mock.suppliers.find(s => s.id === id) || null);
}

export async function getPurchaseOrder(id: number): Promise<PurchaseOrder | null> {
  if (useMock()) return mock.purchaseOrders.find(po => po.id === id) || null;
  return safe(() => bhFetch<PurchaseOrder>(`/purchase-orders/${id}`), mock.purchaseOrders.find(po => po.id === id) || null);
}

export async function listInvoices(): Promise<Invoice[]> {
  if (useMock()) return mock.invoices;
  return safe(() => bhFetch<Invoice[]>("/invoices"), mock.invoices);
}

export async function getInvoice(id: number): Promise<Invoice | null> {
  if (useMock()) return mock.invoices.find(i => i.id === id) || null;
  return safe(() => bhFetch<Invoice>(`/invoices/${id}`), mock.invoices.find(i => i.id === id) || null);
}

export async function listExpenses(): Promise<Expense[]> {
  if (useMock()) return mock.expenses;
  return safe(() => bhFetch<Expense[]>("/expenses"), mock.expenses);
}
