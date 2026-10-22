"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Registration, AdminStats } from "@/lib/types";
import { CardContainer } from "../ui/CardContainer";
import { PillButton } from "../ui/PillButton";
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Download,
  LogOut,
  RefreshCw,
  Eye,
  Check,
  X,
  Mail,
  ShieldCheck,
  Calendar,
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

  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Notification message
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showAlert = (text: string, type: "success" | "error" = "success") => {
    setAlertMessage({ type, text });
    setTimeout(() => setAlertMessage(null), 4500);
  };

  // Mask sensitive CNIC: 12345-*******-1
  const maskCnic = (cnic: string) => {
    if (!cnic || cnic.length < 15) return "•••••••••••••";
    return `${cnic.slice(0, 6)}*******${cnic.slice(13)}`;
  };

  // Reload data
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

  // Logout handler
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Single Approve
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

      showAlert(data.message || "Registration approved!");
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

  // Single Reject
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

  // Resend Email
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

  // Bulk Approve
  const handleBulkApprove = async () => {
    if (selectedIds.length === 0) return;
    if (
      !confirm(
        `Are you sure you want to approve ${selectedIds.length} selected registrations and dispatch their entry passes?`
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

  // CSV Export
  const handleExportCsv = () => {
    const headers = [
      "Registration ID",
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
      `CSDS_Night_2026_Registrations_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search Logic
  const filteredRegistrations = useMemo(() => {
    return registrations
      .filter((r) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = r.name.toLowerCase().includes(q);
          const matchEmail = r.email.toLowerCase().includes(q);
          const matchCnic = r.cnic.includes(q);
          const matchId = r.id.toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchCnic && !matchId) return false;
        }

        // Status
        if (statusFilter !== "all" && r.status !== statusFilter) return false;

        // Section
        if (sectionFilter !== "all" && r.section !== sectionFilter) return false;

        // Semester
        if (semesterFilter !== "all" && String(r.semester) !== semesterFilter)
          return false;

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
      });
  }, [registrations, searchQuery, statusFilter, sectionFilter, semesterFilter, sortOrder]);

  // Paginated Slice
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
    <div className="min-h-screen bg-[#F1F0DC] text-[#111111]">
      {/* Admin Top Header Strip */}
      <header className="bg-[#0F3D2B] text-white px-4 sm:px-6 lg:px-8 py-3.5 border-b-2 border-[#111111] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#A3B565] border-2 border-[#111111] flex items-center justify-center font-serif font-black text-[#0F3D2B] text-lg shadow-hard-xs">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg block leading-none">
                  CSDS Admin Dashboard
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D94A3F] text-white border border-[#111111]">
                  Peshawar &apos;26
                </span>
              </div>
              <span className="text-xs text-[#A3B565] font-normal">
                Signed in as: <strong className="font-semibold text-white">{adminEmail}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <PillButton
              variant="secondary"
              size="sm"
              onClick={handleExportCsv}
              icon={<Download className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              Export CSV
            </PillButton>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D94A3F] hover:bg-[#C53B30] text-white text-xs font-bold border-2 border-[#111111] shadow-hard-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Alert Notification Banner */}
        {alertMessage && (
          <div
            className={`p-4 rounded-xl border-2 border-[#111111] shadow-hard text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in ${
              alertMessage.type === "success"
                ? "bg-[#A3B565] text-[#0F3D2B]"
                : "bg-rose-100 text-rose-900 border-rose-600"
            }`}
          >
            <span>{alertMessage.text}</span>
            <button
              onClick={() => setAlertMessage(null)}
              className="p-1 hover:opacity-75"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 1. Stat Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          <CardContainer variant="white" className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Total Applied
              </span>
              <Users className="w-4 h-4 text-[#0F3D2B]" />
            </div>
            <div className="font-serif font-black text-2xl sm:text-3xl text-[#0F3D2B]">
              {stats.total}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Students registered</span>
          </CardContainer>

          <CardContainer variant="white" className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-amber-700 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Pending
              </span>
              <Clock className="w-4 h-4" />
            </div>
            <div className="font-serif font-black text-2xl sm:text-3xl text-amber-600">
              {stats.pending}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Awaiting review</span>
          </CardContainer>

          <CardContainer variant="white" className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-emerald-700 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Approved
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif font-black text-2xl sm:text-3xl text-emerald-700">
              {stats.approved}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Passes dispatched</span>
          </CardContainer>

          <CardContainer variant="white" className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-rose-700 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Rejected
              </span>
              <XCircle className="w-4 h-4 text-rose-600" />
            </div>
            <div className="font-serif font-black text-2xl sm:text-3xl text-rose-600">
              {stats.rejected}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Proof issues</span>
          </CardContainer>

          <CardContainer
            variant="sage"
            className="col-span-2 lg:col-span-1 p-4 sm:p-5 bg-[#A3B565]"
          >
            <div className="flex items-center justify-between text-[#0F3D2B] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Verified Funds
              </span>
              <Sparkles className="w-4 h-4 text-[#0F3D2B]" />
            </div>
            <div className="font-serif font-black text-xl sm:text-2xl text-[#0F3D2B]">
              Rs. {stats.totalCollected.toLocaleString()}
            </div>
            <span className="text-[11px] text-[#0F3D2B]/80 font-medium mt-1 block">
              {stats.approved} × Rs. 2,200
            </span>
          </CardContainer>
        </div>

        {/* 2. Search, Filters, and Bulk Actions Bar */}
        <CardContainer variant="white" className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by student name, email, or CNIC..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-[#111111] bg-[#FAF9F0] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2B] shadow-hard-xs"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-xl border-2 border-[#111111] bg-white text-xs font-bold shadow-hard-xs cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              {/* Section */}
              <select
                value={sectionFilter}
                onChange={(e) => {
                  setSectionFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-xl border-2 border-[#111111] bg-white text-xs font-bold shadow-hard-xs cursor-pointer"
              >
                <option value="all">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>

              {/* Semester */}
              <select
                value={semesterFilter}
                onChange={(e) => {
                  setSemesterFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-xl border-2 border-[#111111] bg-white text-xs font-bold shadow-hard-xs cursor-pointer"
              >
                <option value="all">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={String(s)}>
                    Semester {s}
                  </option>
                ))}
              </select>

              {/* Sort Order */}
              <button
                type="button"
                onClick={() =>
                  setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
                }
                className="px-3 py-2 rounded-xl border-2 border-[#111111] bg-[#F1F0DC] text-xs font-bold shadow-hard-xs hover:bg-[#E2E0C4] transition-colors"
              >
                {sortOrder === "newest" ? "Newest First" : "Oldest First"}
              </button>
            </div>
          </div>

          {/* Bulk Action Controls */}
          {selectedIds.length > 0 && (
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between bg-amber-50 p-3 rounded-xl border border-amber-200">
              <span className="text-xs font-bold text-amber-900">
                {selectedIds.length} registration(s) selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBulkApprove}
                  className="px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white border-2 border-[#111111] shadow-hard-xs transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Selected</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-black"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}
        </CardContainer>

        {/* 3. Registrations Table */}
        <CardContainer variant="white" className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FAF9F0] border-b-2 border-[#111111] text-[#0F3D2B] font-serif font-bold text-xs uppercase tracking-wider">
                  <th className="p-3.5 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={
                        paginatedRegistrations.length > 0 &&
                        selectedIds.length === paginatedRegistrations.length
                      }
                      onChange={toggleSelectAll}
                      className="rounded border-[#111111] cursor-pointer"
                    />
                  </th>
                  <th className="p-3.5">Student Details</th>
                  <th className="p-3.5">Section & Sem</th>
                  <th className="p-3.5">CNIC (Masked)</th>
                  <th className="p-3.5">Submitted</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111111]/10">
                {paginatedRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">
                      No registrations match your search filters.
                    </td>
                  </tr>
                ) : (
                  paginatedRegistrations.map((reg) => {
                    const isSelected = selectedIds.includes(reg.id);
                    return (
                      <tr
                        key={reg.id}
                        className={`hover:bg-[#FAF9F0] transition-colors ${
                          isSelected ? "bg-amber-50/70" : ""
                        }`}
                      >
                        <td className="p-3.5 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectRow(reg.id)}
                            className="rounded border-[#111111] cursor-pointer"
                          />
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-[#111111] text-sm">
                            {reg.name}
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            {reg.email}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                            ID: {reg.id}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-gray-800">
                            Sec {reg.section} • Sem {reg.semester}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-xs text-gray-600">
                          {maskCnic(reg.cnic)}
                        </td>
                        <td className="p-3.5 text-xs text-gray-500">
                          {new Date(reg.created_at).toLocaleDateString("en-PK", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="p-3.5">
                          {reg.status === "approved" && (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 text-xs">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Approved</span>
                            </span>
                          )}
                          {reg.status === "pending" && (
                            <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 text-xs">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>Pending</span>
                            </span>
                          )}
                          {reg.status === "rejected" && (
                            <span className="inline-flex items-center gap-1 font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300 text-xs">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              <span>Rejected</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          {/* View Detail Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedReg(reg)}
                            className="p-1.5 rounded-lg border border-[#111111]/30 hover:bg-[#F1F0DC] text-[#0F3D2B] transition-colors"
                            title="View details & proof"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Quick Approve if pending */}
                          {reg.status === "pending" && (
                            <button
                              type="button"
                              onClick={() => handleApprove(reg.id)}
                              className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white border border-[#111111] shadow-hard-xs transition-colors"
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

          {/* Pagination Row */}
          <div className="p-4 bg-[#FAF9F0] border-t-2 border-[#111111] flex items-center justify-between text-xs text-gray-600">
            <div>
              Showing {filteredRegistrations.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredRegistrations.length)} of{" "}
              {filteredRegistrations.length} registrations
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-1.5 rounded-lg border border-[#111111] bg-white disabled:opacity-40 disabled:cursor-not-allowed shadow-hard-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-[#111111] px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-1.5 rounded-lg border border-[#111111] bg-white disabled:opacity-40 disabled:cursor-not-allowed shadow-hard-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContainer>
      </main>

      {/* 4. Detail Modal (All submitted fields + payment screenshot with zoom) */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white text-[#111111] rounded-[26px] border-2 border-[#111111] shadow-hard-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            {/* Close button */}
            <button
              onClick={() => setSelectedReg(null)}
              className="absolute top-5 right-5 p-2 rounded-full border-2 border-[#111111] bg-white hover:bg-gray-100 shadow-hard-xs"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b-2 border-[#111111]/15 pb-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F3D2B] bg-[#A3B565]/30 px-3 py-0.5 rounded-full border border-[#111111]/20">
                  Registration Review
                </span>
                <span className="font-mono text-xs text-gray-500">
                  {selectedReg.id}
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0F3D2B]">
                {selectedReg.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column (Details) */}
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 rounded-xl bg-[#FAF9F0] border-2 border-[#111111] shadow-hard-xs space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Email Address:</span>
                    <span className="font-semibold">{selectedReg.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Section:</span>
                    <span className="font-semibold">Section {selectedReg.section}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Semester:</span>
                    <span className="font-semibold">Semester {selectedReg.semester}</span>
                  </div>
                  {/* Full CNIC visible in detail modal only as required by Section 7 */}
                  <div className="flex justify-between py-1 border-b border-gray-200 bg-amber-50/70 p-2 rounded-lg">
                    <span className="text-amber-900 font-bold">CNIC (Full Unmasked):</span>
                    <span className="font-mono font-bold text-[#0F3D2B]">
                      {selectedReg.cnic}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Submitted At:</span>
                    <span>{new Date(selectedReg.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Current Status:</span>
                    <span className="font-bold uppercase tracking-wider text-xs">
                      {selectedReg.status}
                    </span>
                  </div>
                </div>

                {/* Audit trail details */}
                {(selectedReg.approved_at || selectedReg.reviewed_by || selectedReg.email_sent_at) && (
                  <div className="p-3 rounded-xl bg-[#F1F0DC] border border-[#111111]/20 text-xs text-gray-700 space-y-1">
                    {selectedReg.reviewed_by && (
                      <div>Reviewed By: <strong>{selectedReg.reviewed_by}</strong></div>
                    )}
                    {selectedReg.approved_at && (
                      <div>Approved At: {new Date(selectedReg.approved_at).toLocaleString()}</div>
                    )}
                    {selectedReg.email_sent_at && (
                      <div>Pass Emailed At: {new Date(selectedReg.email_sent_at).toLocaleString()}</div>
                    )}
                  </div>
                )}

                {/* Rejection reason if any */}
                {selectedReg.status === "rejected" && selectedReg.rejection_reason && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-900">
                    <strong>Rejection Reason:</strong> {selectedReg.rejection_reason}
                  </div>
                )}
              </div>

              {/* Right Column (Screenshot Preview with Zoom) */}
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="block text-xs font-bold text-[#0F3D2B] uppercase tracking-wider mb-2">
                    Payment Receipt Proof:
                  </span>
                  <div
                    onClick={() => setIsZoomOpen(true)}
                    className="relative h-60 w-full rounded-2xl overflow-hidden border-2 border-[#111111] shadow-hard-xs cursor-pointer group bg-black"
                  >
                    {selectedReg.screenshot_url || selectedReg.screenshot_path ? (
                      <Image
                        src={selectedReg.screenshot_url || selectedReg.screenshot_path}
                        alt="Payment proof screenshot"
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-xs text-white">
                        No Screenshot Provided
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                      <ZoomIn className="w-5 h-5" />
                      <span>Click to Zoom</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 block text-center">
                    Check that Rs. 2,200 & Transaction ID match
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={isLoading || selectedReg.status === "approved"}
                      onClick={() => handleApprove(selectedReg.id)}
                      className="flex-1 py-2.5 px-4 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white border-2 border-[#111111] shadow-hard-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve Registration</span>
                    </button>

                    <button
                      type="button"
                      disabled={isLoading || selectedReg.status === "rejected"}
                      onClick={() => setIsRejectDialogOpen(true)}
                      className="py-2.5 px-4 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white border-2 border-[#111111] shadow-hard-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>

                  {selectedReg.status === "approved" && (
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleResendEmail(selectedReg.id)}
                      className="w-full py-2 px-3 rounded-full text-xs font-bold bg-[#FAF9F0] hover:bg-white text-[#0F3D2B] border-2 border-[#111111] shadow-hard-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Resend Entry Pass Email</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Reject Reason Dialog */}
      {isRejectDialogOpen && selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-[24px] border-2 border-[#111111] shadow-hard-lg p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-serif font-bold text-xl">
              <AlertTriangle className="w-5 h-5" />
              <span>Reject Registration</span>
            </div>
            <p className="text-xs text-gray-600">
              Please specify the reason for rejecting {selectedReg.name}&apos;s proof so they can re-submit properly.
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Transaction screenshot is blurry or amount mismatch (expected Rs. 2,200)."
              className="w-full p-3 rounded-xl border-2 border-[#111111] bg-[#FAF9F0] text-xs font-medium focus:bg-white focus:outline-none shadow-hard-xs"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRejectDialogOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-bold border-2 border-[#111111] bg-white hover:bg-gray-100 shadow-hard-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleReject(selectedReg.id)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white border-2 border-[#111111] shadow-hard-xs"
              >
                Confirm Rejection & Send Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Screenshot Full Zoom Lightbox */}
      {isZoomOpen && selectedReg && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 cursor-zoom-out animate-in fade-in"
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
            className="absolute top-6 right-6 p-2 rounded-full bg-white text-black font-bold shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
