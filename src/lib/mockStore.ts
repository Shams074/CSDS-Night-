import { Registration, AdminStats } from "./types";

/**
 * In-memory fallback store for local development & preview when Supabase credentials
 * are not yet connected. When real Supabase credentials are configured in .env.local,
 * the application automatically queries Postgres & Supabase Storage instead.
 */

// Initial seed data representing students in Peshawar
const initialRegistrations: Registration[] = [
  {
    id: "csds-reg-001",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    name: "Ahmad Shah Afridi",
    email: "ahmad.afridi@csds.uop.edu.pk",
    section: "A",
    semester: 7,
    cnic: "17301-8392184-3",
    screenshot_path: "mock/payment-proof-1.jpg",
    status: "approved",
    approved_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    email_sent_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    reviewed_by: "admin@csds.uop.edu.pk",
    screenshot_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "csds-reg-002",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    name: "Zainab Khattak",
    email: "zainab.khattak@csds.uop.edu.pk",
    section: "B",
    semester: 5,
    cnic: "17201-4928172-2",
    screenshot_path: "mock/payment-proof-2.jpg",
    status: "pending",
    screenshot_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "csds-reg-003",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    name: "Bilal Ahmad Mohmand",
    email: "bilal.mohmand@csds.uop.edu.pk",
    section: "C",
    semester: 1,
    cnic: "17301-9283741-5",
    screenshot_path: "mock/payment-proof-3.jpg",
    status: "pending",
    screenshot_url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "csds-reg-004",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    name: "Marwa Yousafzai",
    email: "marwa.yousafzai@csds.uop.edu.pk",
    section: "A",
    semester: 8,
    cnic: "17101-3829104-6",
    screenshot_path: "mock/payment-proof-4.jpg",
    status: "approved",
    approved_at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    email_sent_at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    reviewed_by: "admin@csds.uop.edu.pk",
    screenshot_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "csds-reg-005",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    name: "Usman Tariq Shinwari",
    email: "usman.shinwari@csds.uop.edu.pk",
    section: "D",
    semester: 3,
    cnic: "17301-1928374-7",
    screenshot_path: "mock/payment-proof-5.jpg",
    status: "rejected",
    rejection_reason: "Transaction screenshot is blurry and does not display the transaction ID or amount.",
    reviewed_by: "admin@csds.uop.edu.pk",
    screenshot_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "csds-reg-006",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    name: "Sana Gul Orakzai",
    email: "sana.orakzai@csds.uop.edu.pk",
    section: "B",
    semester: 7,
    cnic: "17301-7192841-8",
    screenshot_path: "mock/payment-proof-6.jpg",
    status: "pending",
    screenshot_url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80",
  },
];

// Global cache for development hot reloads
const globalForStore = globalThis as unknown as {
  mockRegistrations?: Registration[];
};

if (!globalForStore.mockRegistrations) {
  globalForStore.mockRegistrations = [...initialRegistrations];
}

export const mockStore = {
  getAll: (): Registration[] => {
    return [...(globalForStore.mockRegistrations || [])];
  },

  getById: (id: string): Registration | undefined => {
    return (globalForStore.mockRegistrations || []).find((r) => r.id === id);
  },

  findByEmailOrCnic: (email: string, cnic: string): Registration | undefined => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanCnic = cnic.replace(/\D/g, "");
    return (globalForStore.mockRegistrations || []).find((r) => {
      const existingEmail = r.email.trim().toLowerCase();
      const existingCnic = r.cnic.replace(/\D/g, "");
      return existingEmail === cleanEmail || existingCnic === cleanCnic;
    });
  },

  insert: (item: Omit<Registration, "id" | "created_at" | "status">): Registration => {
    const newReg: Registration = {
      ...item,
      id: `csds-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
      status: "pending",
      screenshot_url: item.screenshot_path.startsWith("data:")
        ? item.screenshot_path
        : "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    };
    globalForStore.mockRegistrations = [newReg, ...(globalForStore.mockRegistrations || [])];
    return newReg;
  },

  updateStatus: (
    id: string,
    status: "approved" | "rejected",
    reason?: string,
    reviewerEmail?: string
  ): Registration | null => {
    const list = globalForStore.mockRegistrations || [];
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const existing = list[index];
    const now = new Date().toISOString();

    const updated: Registration = {
      ...existing,
      status,
      rejection_reason: status === "rejected" ? reason || "Payment verification failed" : null,
      approved_at: status === "approved" ? now : null,
      reviewed_by: reviewerEmail || "admin@csds.uop.edu.pk",
      email_sent_at: status === "approved" ? now : existing.email_sent_at,
    };

    list[index] = updated;
    globalForStore.mockRegistrations = list;
    return updated;
  },

  recordEmailSent: (id: string): void => {
    const list = globalForStore.mockRegistrations || [];
    const index = list.findIndex((r) => r.id === id);
    if (index !== -1) {
      list[index] = {
        ...list[index],
        email_sent_at: new Date().toISOString(),
      };
      globalForStore.mockRegistrations = list;
    }
  },

  getStats: (): AdminStats => {
    const list = globalForStore.mockRegistrations || [];
    const total = list.length;
    const pending = list.filter((r) => r.status === "pending").length;
    const approved = list.filter((r) => r.status === "approved").length;
    const rejected = list.filter((r) => r.status === "rejected").length;
    const totalCollected = approved * 2200;

    return {
      total,
      pending,
      approved,
      rejected,
      totalCollected,
    };
  },
};
