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
  ArrowUpRight,
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

  const filteredRegistrations = useMemo(() => {
    return registrations
      .filter((r) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = r.name.toLowerCase().includes(q);
          const matchEmail = r.email.toLowerCase().includes(q);
          const matchCnic = r.cnic.includes(q);
          const matchId = r.id.toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchCnic && !matchId) return false;
        }

        if (statusFilter !== "all" && r.status !== statusFilter) return false;
        if (sectionFilter !== "all" && r.section !== sectionFilter) return false;
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
    <div className="min-h-screen bg-[#070707] text-[#EDEDED] font-body">
      {/* Admin Top Header */}
      <header className="bg-[#0c0c0c] text-white px-4 sm:px-6 lg:px-8 py-3.5 border-b border-[#262626] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B4F23D]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm sm:text-base uppercase tracking-wider text-white">
                  CSDS ADMIN <span className="text-[#B4F23D]">&apos;26</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#1b2210] text-[#B4F23D] border border-[#B4F23D]/30">
                  PORTAL
                </span>
              </div>
              <span className="text-[11px] font-mono text-gray-400">
                Logged in as: <strong className="text-white">{adminEmail}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="p-2 rounded-full border border-white/20 hover:border-white text-gray-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <PillButton
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              icon={<Download className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              Export CSV
            </PillButton>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-display font-bold uppercase transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Alert Notification */}
        {alertMessage && (
          <div
            className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in ${
              alertMessage.type === "success"
                ? "bg-[#14180d] text-[#B4F23D] border-[#B4F23D]/40"
                : "bg-rose-950/40 text-rose-300 border-rose-800"
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

        {/* 1. Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <CardContainer variant="surface" className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Total
              </span>
              <Users className="w-4 h-4 text-gray-400" />
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-white">
              {stats.total}
            </div>
            <span className="text-[10px] font-mono text-gray-500 mt-1 block">Registered</span>
          </CardContainer>

          <CardContainer variant="surface" className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-amber-500 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Pending
              </span>
              <Clock className="w-4 h-4" />
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-amber-400">
              {stats.pending}
            </div>
            <span className="text-[10px] font-mono text-gray-500 mt-1 block">Awaiting Review</span>
          </CardContainer>

          <CardContainer variant="surface" className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-[#B4F23D] mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Approved
              </span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-[#B4F23D]">
              {stats.approved}
            </div>
            <span className="text-[10px] font-mono text-gray-500 mt-1 block">Passes Sent</span>
          </CardContainer>

          <CardContainer variant="surface" className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-rose-500 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Rejected
              </span>
              <XCircle className="w-4 h-4" />
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-rose-400">
              {stats.rejected}
            </div>
            <span className="text-[10px] font-mono text-gray-500 mt-1 block">Issues</span>
          </CardContainer>

          <CardContainer variant="highlight" className="col-span-2 lg:col-span-1 p-4 sm:p-5">
            <div className="flex items-center justify-between text-[#B4F23D] mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Funds
              </span>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="font-display font-black text-xl sm:text-2xl text-white">
              Rs. {stats.totalCollected.toLocaleString()}
            </div>
            <span className="text-[10px] font-mono text-[#B4F23D]/80 mt-1 block">
              {stats.approved} × Rs. 2,200
            </span>
          </CardContainer>
        </div>

        {/* 2. Search & Filters Bar */}
        <CardContainer variant="surface" className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by student name, email, or CNIC..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#2a2a2a] bg-[#161616] text-sm text-white focus:outline-none focus:border-[#B4F23D]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-xl border border-[#2a2a2a] bg-[#161616] text-xs font-mono text-gray-300 focus:outline-none cursor-pointer"
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
                className="px-3 py-2 rounded-xl border border-[#2a2a2a] bg-[#161616] text-xs font-mono text-gray-300 focus:outline-none cursor-pointer"
              >
                <option value="all">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>

              <select
                value={semesterFilter}
                onChange={(e) => {
                  setSemesterFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-xl border border-[#2a2a2a] bg-[#161616] text-xs font-mono text-gray-300 focus:outline-none cursor-pointer"
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
                className="px-3 py-2 rounded-xl border border-[#2a2a2a] bg-[#161616] hover:bg-[#1f1f1f] text-xs font-mono text-gray-300 transition-colors"
              >
                {sortOrder === "newest" ? "Newest" : "Oldest"}
              </button>
            </div>
          </div>

          {selectedIds.length > 0 && (
            <div className="pt-3 border-t border-[#262626] flex items-center justify-between bg-[#14180d] p-3 rounded-xl border border-[#B4F23D]/30">
              <span className="text-xs font-mono text-[#B4F23D]">
                {selectedIds.length} registration(s) selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBulkApprove}
                  className="px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase bg-[#B4F23D] text-black hover:bg-[#A3E635] flex items-center gap-1.5 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Selected</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="px-3 py-1.5 rounded-full text-xs font-mono text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </CardContainer>

        {/* 3. Registrations Table */}
        <CardContainer variant="surface" className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#161616] border-b border-[#262626] text-gray-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="p-3.5 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={
                        paginatedRegistrations.length > 0 &&
                        selectedIds.length === paginatedRegistrations.length
                      }
                      onChange={toggleSelectAll}
                      className="rounded border-[#262626] bg-[#0c0c0c] cursor-pointer"
                    />
                  </th>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Sec & Sem</th>
                  <th className="p-3.5">CNIC (Masked)</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f1f]">
                {paginatedRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500 font-mono text-xs">
                      No registrations match your search filters.
                    </td>
                  </tr>
                ) : (
                  paginatedRegistrations.map((reg) => {
                    const isSelected = selectedIds.includes(reg.id);
                    return (
                      <tr
                        key={reg.id}
                        className={`hover:bg-[#171717] transition-colors ${
                          isSelected ? "bg-[#181d10]" : ""
                        }`}
                      >
                        <td className="p-3.5 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectRow(reg.id)}
                            className="rounded border-[#262626] bg-[#0c0c0c] cursor-pointer"
                          />
                        </td>
                        <td className="p-3.5">
                          <div className="font-display font-bold text-white text-sm">
                            {reg.name}
                          </div>
                          <div className="text-xs text-gray-400 font-mono">
                            {reg.email}
                          </div>
                          <div className="text-[10px] text-gray-600 font-mono">
                            {reg.id}
                          </div>
                        </td>
                        <td className="p-3.5 font-mono text-xs text-gray-300">
                          Sec {reg.section} • Sem {reg.semester}
                        </td>
                        <td className="p-3.5 font-mono text-xs text-gray-400">
                          {maskCnic(reg.cnic)}
                        </td>
                        <td className="p-3.5 font-mono text-xs text-gray-500">
                          {new Date(reg.created_at).toLocaleDateString("en-PK", {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-3.5">
                          {reg.status === "approved" && (
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#B4F23D] bg-[#14180d] px-2.5 py-0.5 rounded-full border border-[#B4F23D]/30">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Approved</span>
                            </span>
                          )}
                          {reg.status === "pending" && (
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                              <Clock className="w-3 h-3" />
                              <span>Pending</span>
                            </span>
                          )}
                          {reg.status === "rejected" && (
                            <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-rose-400 bg-rose-400/10 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                              <XCircle className="w-3 h-3" />
                              <span>Rejected</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedReg(reg)}
                            className="p-1.5 rounded-lg border border-white/20 hover:border-white text-gray-300 hover:text-white transition-colors"
                            title="View details & receipt"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {reg.status === "pending" && (
                            <button
                              type="button"
                              onClick={() => handleApprove(reg.id)}
                              className="px-2.5 py-1 rounded-full text-xs font-display font-bold uppercase bg-[#B4F23D] hover:bg-[#A3E635] text-black transition-colors"
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
          <div className="p-4 bg-[#141414] border-t border-[#262626] flex items-center justify-between text-xs font-mono text-gray-400">
            <div>
              Showing {filteredRegistrations.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredRegistrations.length)} of{" "}
              {filteredRegistrations.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-1.5 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-white px-2">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-1.5 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContainer>
      </main>

      {/* 4. Detail Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#121212] text-[#EDEDED] rounded-2xl sm:rounded-3xl border border-[#262626] max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <button
              onClick={() => setSelectedReg(null)}
              className="absolute top-5 right-5 p-2 rounded-full border border-white/20 hover:border-white text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-[#262626] pb-4 mb-6">
              <div className="flex items-center gap-2 mb-1 font-mono text-xs">
                <span className="text-[#B4F23D] font-bold">
                  [ REGISTRATION DETAIL ]
                </span>
                <span className="text-gray-500">{selectedReg.id}</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                {selectedReg.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] space-y-2 text-xs sm:text-sm font-mono">
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-white font-semibold">{selectedReg.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-gray-500">Section:</span>
                    <span className="text-white font-semibold">Section {selectedReg.section}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-gray-500">Semester:</span>
                    <span className="text-white font-semibold">Semester {selectedReg.semester}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10 bg-[#1b2210] p-2 rounded-lg">
                    <span className="text-[#B4F23D] font-bold">CNIC (Unmasked):</span>
                    <span className="text-white font-bold">{selectedReg.cnic}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-gray-500">Submitted:</span>
                    <span className="text-gray-300">{new Date(selectedReg.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-bold uppercase text-[#B4F23D]">
                      {selectedReg.status}
                    </span>
                  </div>
                </div>

                {(selectedReg.approved_at || selectedReg.reviewed_by) && (
                  <div className="p-3 rounded-xl bg-[#0c0c0c] border border-white/10 text-xs font-mono text-gray-400 space-y-1">
                    {selectedReg.reviewed_by && <div>Reviewer: {selectedReg.reviewed_by}</div>}
                    {selectedReg.approved_at && <div>Approved: {new Date(selectedReg.approved_at).toLocaleString()}</div>}
                  </div>
                )}
              </div>

              {/* Screenshot Preview */}
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="block text-xs font-mono uppercase text-[#B4F23D] mb-2">
                    Payment Receipt Proof:
                  </span>
                  <div
                    onClick={() => setIsZoomOpen(true)}
                    className="relative h-56 w-full rounded-xl overflow-hidden border border-[#2a2a2a] cursor-pointer group bg-black"
                  >
                    {selectedReg.screenshot_url || selectedReg.screenshot_path ? (
                      <Image
                        src={selectedReg.screenshot_url || selectedReg.screenshot_path}
                        alt="Payment proof screenshot"
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-xs text-gray-500">
                        No Screenshot
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono gap-1.5">
                      <ZoomIn className="w-4 h-4 text-[#B4F23D]" />
                      <span>Click to Zoom</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={isLoading || selectedReg.status === "approved"}
                      onClick={() => handleApprove(selectedReg.id)}
                      className="flex-1 py-2.5 px-4 rounded-full text-xs font-display font-bold uppercase bg-[#B4F23D] hover:bg-[#A3E635] text-black disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>

                    <button
                      type="button"
                      disabled={isLoading || selectedReg.status === "rejected"}
                      onClick={() => setIsRejectDialogOpen(true)}
                      className="py-2.5 px-4 rounded-full text-xs font-display font-bold uppercase bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5"
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
                      className="w-full py-2 px-3 rounded-full text-xs font-display font-bold uppercase bg-[#181818] hover:bg-[#202020] text-white border border-white/20 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#B4F23D]" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#121212] rounded-2xl border border-[#262626] p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-display font-bold text-lg uppercase">
              <AlertTriangle className="w-5 h-5" />
              <span>Reject Registration</span>
            </div>
            <p className="text-xs text-gray-400">
              Specify reason for rejecting {selectedReg.name}&apos;s proof so they can re-submit properly.
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Transaction receipt is blurry or amount mismatch."
              className="w-full p-3 rounded-xl border border-[#2a2a2a] bg-[#161616] text-xs text-white focus:outline-none focus:border-rose-500"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRejectDialogOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-mono border border-white/20 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleReject(selectedReg.id)}
                className="px-5 py-2 rounded-full text-xs font-display font-bold uppercase bg-rose-600 hover:bg-rose-700 text-white"
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
