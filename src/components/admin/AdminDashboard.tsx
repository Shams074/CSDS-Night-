"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Registration, AdminStats } from "@/lib/types";
import { EVENT_CONFIG } from "@/config/event";
import { formatShortId } from "@/lib/id";
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Download,
  LogOut,
  RefreshCw,
  Eye,
  Check,
  X,
  Mail,
  ShieldCheck,
  AlertTriangle,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface AdminDashboardProps {
  initialRegistrations: Registration[];
  initialStats: AdminStats;
  adminEmail: string;
}

export function AdminDashboard({
  initialRegistrations,
  initialStats,
  adminEmail,
}: AdminDashboardProps) {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [stats, setStats] = useState<AdminStats>(initialStats);
  const [isLoading, setIsLoading] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [semesterFilter, setSemesterFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Notifications
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showAlert = (text: string, type: "success" | "error" = "success") => {
    setAlertMessage({ type, text });
    setTimeout(() => setAlertMessage(null), 4500);
  };

  const maskCnic = (cnic: string) => {
    if (!cnic || cnic.length < 15) return "•••••••••••••";
    return `${cnic.slice(0, 6)}*******${cnic.slice(13)}`;
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/registrations");
      const data = await res.json();
      if (res.ok) {
        setRegistrations(data.registrations || []);
        setStats(data.stats || initialStats);
        setSelectedIds([]);
      }
    } catch {
      showAlert("Failed to reload registrations", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleApprove = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.emailSent === false) {
        showAlert(data.message, "error");
      } else {
        showAlert(data.message || "Registration approved and confirmation pass emailed!");
      }

      if (selectedReg?.id === id) {
        setSelectedReg(data.registration);
      }
      await refreshData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error approving registration";
      showAlert(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", id, reason: rejectReason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showAlert(data.message || "Registration rejected.");
      setIsRejectDialogOpen(false);
      setRejectReason("");
      if (selectedReg?.id === id) {
        setSelectedReg(data.registration);
      }
      await refreshData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error rejecting registration";
      showAlert(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resend_email", id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showAlert("Confirmation email resent successfully!");
      await refreshData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error resending email";
      showAlert(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkApprove = async () => {
    if (selectedIds.length === 0) return;
    if (
      !confirm(
        `Are you sure you want to approve ${selectedIds.length} selected registrations and dispatch their digital entry passes?`
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "bulk_approve", ids: selectedIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showAlert(data.message || "Bulk approvals completed!");
      setSelectedIds([]);
      await refreshData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Bulk approve failed";
      showAlert(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCsv = () => {
    const headers = [
      "Pass ID (6-char)",
      "System UUID",
      "Full Name",
      "Email Address",
      "Section",
      "Semester",
      "CNIC",
      "Status",
      "Created At",
      "Approved At",
      "Reviewed By",
      "Rejection Reason",
    ];

    const rows = filteredRegistrations.map((r) => [
      `"${formatShortId(r.id)}"`,
      `"${r.id}"`,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.section}"`,
      r.semester,
      `"${r.cnic}"`,
      `"${r.status}"`,
      `"${new Date(r.created_at).toLocaleString()}"`,
      r.approved_at ? `"${new Date(r.approved_at).toLocaleString()}"` : '""',
      `"${r.reviewed_by || ""}"`,
      `"${(r.rejection_reason || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `CC_CSDS_Night_2026_Registrations_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = useMemo(() => {
    return registrations
      .filter((r) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const short = formatShortId(r.id).toLowerCase();
          const matchName = r.name.toLowerCase().includes(q);
          const matchEmail = r.email.toLowerCase().includes(q);
          const matchCnic = r.cnic.includes(q);
          const matchId = r.id.toLowerCase().includes(q);
          const matchShort = short.includes(q);
          if (!matchName && !matchEmail && !matchCnic && !matchId && !matchShort) {
            return false;
          }
        }

        if (statusFilter !== "all" && r.status !== statusFilter) return false;
        if (sectionFilter !== "all" && r.section !== sectionFilter) return false;
        if (semesterFilter !== "all" && String(r.semester) !== semesterFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
      });
  }, [registrations, searchQuery, statusFilter, sectionFilter, semesterFilter, sortOrder]);

  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage) || 1;
  const paginatedRegistrations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRegistrations.slice(start, start + itemsPerPage);
  }, [filteredRegistrations, currentPage, itemsPerPage]);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedRegistrations.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedRegistrations.map((r) => r.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Admin Top Header */}
      <header className="bg-[#0B253A] text-white px-4 sm:px-8 py-3 border-b border-slate-700/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
              <Image
                src="/images/cc-logo.png"
                alt="CC Logo"
                width={26}
                height={26}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-white">
                  COMPUTER CELL <span className="text-[#D4A03D]">ADMIN</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D4A03D]/20 text-[#D4A03D] border border-[#D4A03D]/40">
                  PORTAL
                </span>
              </div>
              <span className="text-[10px] text-slate-300 block">
                Logged in as: <strong className="text-white font-medium">{adminEmail}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="p-1.5 rounded-lg border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleExportCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-600 hover:border-slate-400 text-xs text-slate-200 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#D4A03D]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 text-rose-300 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-4">
        {/* Alert Notification */}
        {alertMessage && (
          <div
            className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between ${
              alertMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            <span>{alertMessage.text}</span>
            <button
              onClick={() => setAlertMessage(null)}
              className="p-1 hover:opacity-75"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 1. Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Total
              </span>
              <Users className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="font-extrabold text-2xl text-[#0B253A]">
              {stats.total}
            </div>
            <span className="text-[10px] text-slate-500">Registrations</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-amber-600 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Pending
              </span>
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="font-extrabold text-2xl text-amber-600">
              {stats.pending}
            </div>
            <span className="text-[10px] text-slate-500">Awaiting Review</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-emerald-600 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Approved
              </span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="font-extrabold text-2xl text-emerald-600">
              {stats.approved}
            </div>
            <span className="text-[10px] text-slate-500">Passes Dispatched</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-rose-600 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Rejected
              </span>
              <XCircle className="w-3.5 h-3.5" />
            </div>
            <div className="font-extrabold text-2xl text-rose-600">
              {stats.rejected}
            </div>
            <span className="text-[10px] text-slate-500">Needs Resubmit</span>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-[#0B253A] text-white rounded-xl border border-[#0B253A] p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-[#D4A03D] mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Funds
              </span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="font-extrabold text-xl text-white">
              Rs. {stats.totalCollected.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-300 block">
              {stats.approved} × Rs. 2,200
            </span>
          </div>
        </div>

        {/* 2. Search & Filters Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by student name, 6-char ID, email, or CNIC..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B253A] focus:border-[#0B253A]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={sectionFilter}
                onChange={(e) => {
                  setSectionFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Sections</option>
                {EVENT_CONFIG.sections.map((sec) => (
                  <option key={sec} value={sec}>
                    Section {sec}
                  </option>
                ))}
              </select>

              <select
                value={semesterFilter}
                onChange={(e) => {
                  setSemesterFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={String(s)}>
                    Semester {s}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() =>
                  setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
                }
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors"
              >
                {sortOrder === "newest" ? "Newest" : "Oldest"}
              </button>
            </div>
          </div>

          {selectedIds.length > 0 && (
            <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between bg-amber-50/60 p-2.5 rounded-lg border border-amber-200">
              <span className="text-xs font-semibold text-amber-900">
                {selectedIds.length} registration(s) selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBulkApprove}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-[#0B253A] text-white hover:bg-[#123854] flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Check className="w-3 h-3 text-[#D4A03D]" />
                  <span>Approve Selected</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="px-2.5 py-1 rounded-lg text-xs text-slate-600 hover:text-slate-900"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. Registrations Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={
                        paginatedRegistrations.length > 0 &&
                        selectedIds.length === paginatedRegistrations.length
                      }
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-[#0B253A] focus:ring-[#0B253A] cursor-pointer"
                    />
                  </th>
                  <th className="p-3">Student & Pass ID</th>
                  <th className="p-3">Sec & Sem</th>
                  <th className="p-3">CNIC</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400 text-xs">
                      No registrations match your search filters.
                    </td>
                  </tr>
                ) : (
                  paginatedRegistrations.map((reg) => {
                    const isSelected = selectedIds.includes(reg.id);
                    const shortId = formatShortId(reg.id);
                    return (
                      <tr
                        key={reg.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isSelected ? "bg-amber-50/40" : ""
                        }`}
                      >
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectRow(reg.id)}
                            className="rounded border-slate-300 text-[#0B253A] cursor-pointer"
                          />
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-900 text-xs">
                            {reg.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {reg.email}
                          </div>
                          <div className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-[#0B253A]">
                            <span className="text-slate-400">ID:</span>
                            <span className="tracking-wider">{shortId}</span>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-600">
                          Sec {reg.section} • Sem {reg.semester}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-500">
                          {maskCnic(reg.cnic)}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-500">
                          {new Date(reg.created_at).toLocaleDateString("en-PK", {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-3">
                          {reg.status === "approved" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Approved</span>
                            </span>
                          )}
                          {reg.status === "pending" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              <Clock className="w-3 h-3" />
                              <span>Pending</span>
                            </span>
                          )}
                          {reg.status === "rejected" && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                              <XCircle className="w-3 h-3" />
                              <span>Rejected</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-1 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedReg(reg)}
                            className="p-1 rounded-md border border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-900 transition-colors"
                            title="View details & receipt"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {reg.status === "pending" && (
                            <button
                              type="button"
                              onClick={() => handleApprove(reg.id)}
                              className="px-2 py-1 rounded-md text-[11px] font-bold bg-[#0B253A] hover:bg-[#123854] text-white border border-[#D4A03D]/50 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing {filteredRegistrations.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredRegistrations.length)} of{" "}
              {filteredRegistrations.length}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-1 rounded-md border border-slate-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-700 px-2 font-medium">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-1 rounded-md border border-slate-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Detail Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white text-slate-800 rounded-2xl border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-6">
            <button
              onClick={() => setSelectedReg(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full border border-slate-200 hover:border-slate-300 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-[#D4A03D]/15 text-[#0B253A] font-bold text-xs border border-[#D4A03D]/30">
                  PASS CODE: {formatShortId(selectedReg.id)}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  UUID: {selectedReg.id}
                </span>
              </div>
              <h2 className="font-extrabold text-lg sm:text-xl text-[#0B253A] uppercase">
                {selectedReg.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-7 space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Email:</span>
                    <span className="text-slate-900 font-semibold">{selectedReg.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Section:</span>
                    <span className="text-slate-900 font-semibold">Section {selectedReg.section}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Semester:</span>
                    <span className="text-slate-900 font-semibold">Semester {selectedReg.semester}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 bg-amber-50/70 p-1.5 rounded">
                    <span className="text-[#0B253A] font-bold">CNIC (Unmasked):</span>
                    <span className="text-slate-900 font-bold">{selectedReg.cnic}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Submitted:</span>
                    <span className="text-slate-700">{new Date(selectedReg.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold uppercase text-[#0B253A]">
                      {selectedReg.status}
                    </span>
                  </div>
                </div>

                {(selectedReg.approved_at || selectedReg.reviewed_by) && (
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-500 space-y-0.5">
                    {selectedReg.reviewed_by && <div>Reviewer: {selectedReg.reviewed_by}</div>}
                    {selectedReg.approved_at && <div>Approved: {new Date(selectedReg.approved_at).toLocaleString()}</div>}
                  </div>
                )}
              </div>

              {/* Screenshot Preview */}
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#0B253A] mb-1.5">
                    Payment Receipt Proof:
                  </span>
                  <div
                    onClick={() => setIsZoomOpen(true)}
                    className="relative h-48 w-full rounded-xl overflow-hidden border border-slate-200 cursor-pointer group bg-slate-100"
                  >
                    {selectedReg.screenshot_url || selectedReg.screenshot_path ? (
                      <Image
                        src={selectedReg.screenshot_url || selectedReg.screenshot_path}
                        alt="Payment proof screenshot"
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-xs text-slate-400">
                        No Screenshot
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-[#D4A03D]" />
                      <span>Click to Zoom</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={isLoading || selectedReg.status === "approved"}
                      onClick={() => handleApprove(selectedReg.id)}
                      className="flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase bg-[#0B253A] hover:bg-[#123854] text-white disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5 text-[#D4A03D]" />
                      <span>Approve</span>
                    </button>

                    <button
                      type="button"
                      disabled={isLoading || selectedReg.status === "rejected"}
                      onClick={() => setIsRejectDialogOpen(true)}
                      className="py-2 px-3 rounded-lg text-xs font-bold uppercase bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>

                  {selectedReg.status === "approved" && (
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleResendEmail(selectedReg.id)}
                      className="w-full py-1.5 px-3 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#0B253A]" />
                      <span>Resend Entry Pass</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Reject Dialog */}
      {isRejectDialogOpen && selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-base uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>Reject Registration</span>
            </div>
            <p className="text-xs text-slate-500">
              Specify reason for rejecting {selectedReg.name}&apos;s proof so they can re-submit properly.
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Transaction receipt is blurry or amount mismatch."
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRejectDialogOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleReject(selectedReg.id)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase bg-rose-600 hover:bg-rose-700 text-white"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Zoom Lightbox */}
      {isZoomOpen && selectedReg && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 cursor-zoom-out animate-in fade-in"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-[80vh]">
            <Image
              src={selectedReg.screenshot_url || selectedReg.screenshot_path}
              alt="Zoomed payment proof"
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white text-slate-900 font-bold shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
