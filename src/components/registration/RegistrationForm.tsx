"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import {
  registrationFormSchema,
  RegistrationFormInput,
} from "@/lib/validation/registrationSchema";
import { PillButton } from "../ui/PillButton";
import { CardContainer } from "../ui/CardContainer";
import { EVENT_CONFIG } from "@/config/event";
import {
  CheckCircle2,
  AlertCircle,
  Upload,
  X,
  CreditCard,
  Copy,
  Check,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function RegistrationForm() {
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    registrationId: string;
    name: string;
    email: string;
    cnic: string;
  } | null>(null);

  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(registrationFormSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      section: "A",
      semester: 1,
      cnic: "",
      website_honeypot: "",
    },
  });

  // CNIC Auto-formatter: 12345-1234567-1
  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // strip non-digits
    if (value.length > 13) value = value.slice(0, 13);

    let formatted = "";
    if (value.length > 0) {
      formatted = value.substring(0, 5);
      if (value.length > 5) {
        formatted += "-" + value.substring(5, 12);
        if (value.length > 12) {
          formatted += "-" + value.substring(12, 13);
        }
      }
    }
    setValue("cnic", formatted, { shouldValidate: true });
  };

  // Copy account number helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  // Handle file drop / change
  const handleFileSelect = (file: File) => {
    setFileError(null);
    setServerError(null);

    // Validate size (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileError("File size exceeds 5 MB. Please upload a smaller image.");
      return;
    }

    // Validate type
    const validMimes = ["image/jpeg", "image/png", "image/webp"];
    if (!validMimes.includes(file.type)) {
      setFileError("Only JPG, PNG, and WebP images are allowed.");
      return;
    }

    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: RegistrationFormInput) => {
    setServerError(null);

    if (!screenshotFile) {
      setFileError("Please upload your payment screenshot before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("section", data.section);
      formData.append("semester", String(data.semester));
      formData.append("cnic", data.cnic);
      formData.append("screenshot", screenshotFile);
      if (data.website_honeypot) {
        formData.append("website_honeypot", data.website_honeypot);
      }

      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit registration");
      }

      // Success! Fire festive confetti
      setIsSuccess(true);
      setSubmittedData({
        registrationId: result.registrationId,
        name: data.name,
        email: data.email,
        cnic: data.cnic,
      });

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#D94A3F", "#A3B565", "#0F3D2B", "#F1F0DC"],
        });
      } catch {
        // Confetti non-critical
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (isSuccess && submittedData) {
    return (
      <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 animate-in zoom-in-95 duration-200">
        <CardContainer variant="white" className="p-6 sm:p-10 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A3B565] border-2 border-[#111111] shadow-hard flex items-center justify-center mx-auto mb-5 text-[#0F3D2B]">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0F3D2B] text-white border-2 border-[#111111] shadow-hard-xs mb-3">
            Registration Received
          </span>

          <h2 className="font-serif font-black text-2xl sm:text-4xl text-[#0F3D2B] leading-tight">
            You&apos;re on the List!
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#111111]/80 max-w-lg mx-auto font-normal leading-relaxed">
            We received your registration and payment proof. Our departmental committee will verify your submission within <strong>12–24 hours</strong>.
          </p>

          {/* Reference Card */}
          <div className="my-6 p-5 rounded-[20px] bg-[#F1F0DC] border-2 border-[#111111] shadow-hard-xs text-left max-w-md mx-auto space-y-2.5">
            <div className="flex justify-between items-center pb-2 border-b border-[#111111]/20">
              <span className="text-xs font-bold text-[#111111]/60 uppercase tracking-wider">
                Registration ID:
              </span>
              <span className="font-mono font-bold text-sm sm:text-base text-[#D94A3F]">
                {submittedData.registrationId}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-[#111111]/70">Student Name:</span>
              <span className="font-semibold text-[#111111]">{submittedData.name}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-[#111111]/70">Email Address:</span>
              <span className="font-semibold text-[#111111]">{submittedData.email}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-[#111111]/70">CNIC:</span>
              <span className="font-mono font-semibold text-[#111111]">
                {submittedData.cnic}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm pt-1">
              <span className="text-[#111111]/70">Status:</span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 text-xs">
                Pending Verification
              </span>
            </div>
          </div>

          <div className="bg-[#A3B565]/20 p-4 rounded-xl border border-[#111111]/20 max-w-md mx-auto text-xs text-[#0F3D2B] leading-relaxed mb-6">
            <strong>Next Step:</strong> Once approved, your official entry pass and QR ticket will be sent to <strong>{submittedData.email}</strong>. Please bring your original CNIC to the event.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PillButton variant="primary" size="md" href="/">
              Return to Event Homepage
            </PillButton>
            <PillButton
              variant="secondary"
              size="md"
              onClick={() => {
                setIsSuccess(false);
                setSubmittedData(null);
                removeScreenshot();
              }}
            >
              Submit Another Registration
            </PillButton>
          </div>
        </CardContainer>
      </div>
    );
  }

  // ACTIVE REGISTRATION FORM
  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10 px-4">
      {/* Top Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F3D2B] hover:text-[#D94A3F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Event Details</span>
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F3D2B] bg-[#A3B565]/30 px-3 py-1 rounded-full border border-[#111111]/20">
          Official CSDS Portal
        </span>
      </div>

      {/* Standout Fee & Payment Instructions Banner (Right above the form) */}
      <div className="mb-8 rounded-[24px] bg-[#A3B565] border-2 border-[#111111] shadow-hard p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#111111]/20">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0F3D2B] block">
              Registration Fee
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-serif font-black text-3xl sm:text-4xl text-[#0F3D2B]">
                {EVENT_CONFIG.fee.formatted}
              </span>
              <span className="text-sm font-bold text-[#111111]/80">
                {EVENT_CONFIG.fee.unit}
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F3D2B] text-white text-xs font-bold uppercase tracking-wider border border-[#111111] self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#A3B565]" />
            <span>All-Inclusive Pass</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#0F3D2B] font-medium mt-3">
          Please transfer <strong>Rs. 2,200</strong> to any of the following official society accounts and take a clear screenshot of the transaction receipt:
        </p>

        {/* Bank & Wallet Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {EVENT_CONFIG.fee.accounts.map((acc, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-xl border-2 border-[#111111] shadow-hard-xs p-3 text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#D94A3F] uppercase tracking-wide text-[10px]">
                    {acc.type}
                  </span>
                  <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <div className="font-bold text-[#0F3D2B] text-sm">
                  {acc.accountNumber}
                </div>
                <div className="text-[11px] text-gray-700 mt-0.5 font-medium">
                  {acc.accountTitle}
                </div>
                {"bankName" in acc && (
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {acc.bankName}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(acc.accountNumber, `acc-${idx}`)}
                className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-center gap-1 text-[11px] font-bold text-[#0F3D2B] hover:text-[#D94A3F] transition-colors"
              >
                {copiedAccount === `acc-${idx}` ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Account</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Card Container (Cream page background, rounded bordered card, offset shadow) */}
      <CardContainer variant="white" className="p-6 sm:p-10">
        <div className="mb-6 sm:mb-8 text-center sm:text-left border-b-2 border-[#111111]/15 pb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D94A3F] block mb-1">
            Step 2: Participant Registration
          </span>
          <h1 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-[#0F3D2B]">
            Register Your Details
          </h1>
          <p className="text-xs sm:text-sm text-[#111111]/75 mt-1 font-normal">
            Fill in your university student credentials and attach your payment proof below.
          </p>
        </div>

        {/* Global Server Error Banner */}
        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border-2 border-rose-600 text-rose-900 text-sm flex items-start gap-3 shadow-hard-xs animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="font-medium leading-snug">{serverError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot Spam Guard (Hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website_honeypot")}
            />
          </div>

          {/* Row 1: Full Name */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#111111] mb-1.5">
              Full Name <span className="text-[#D94A3F]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Ahmad Shah Afridi"
              {...register("name")}
              className={`w-full px-4 py-3 rounded-xl border-2 border-[#111111] bg-[#FAF9F0] text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2B] transition-colors shadow-hard-xs ${
                errors.name ? "border-rose-600 ring-rose-200" : ""
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs font-semibold text-rose-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Row 2: Email Address */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#111111] mb-1.5">
              Email Address <span className="text-[#D94A3F]">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. yourname@csds.uop.edu.pk or personal email"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-xl border-2 border-[#111111] bg-[#FAF9F0] text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2B] transition-colors shadow-hard-xs ${
                errors.email ? "border-rose-600 ring-rose-200" : ""
              }`}
            />
            <span className="block mt-1 text-[11px] text-gray-500 font-normal">
              Your official entry ticket and QR pass will be emailed to this address.
            </span>
            {errors.email && (
              <p className="mt-1 text-xs font-semibold text-rose-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Row 3: Section and Semester (Grid on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Section Dropdown */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#111111] mb-1.5">
                Section <span className="text-[#D94A3F]">*</span>
              </label>
              <select
                {...register("section")}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#111111] bg-[#FAF9F0] text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2B] shadow-hard-xs cursor-pointer"
              >
                {EVENT_CONFIG.sections.map((sec) => (
                  <option key={sec} value={sec}>
                    Section {sec}
                  </option>
                ))}
              </select>
              {errors.section && (
                <p className="mt-1 text-xs font-semibold text-rose-600">
                  {errors.section.message}
                </p>
              )}
            </div>

            {/* Semester Dropdown */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#111111] mb-1.5">
                Semester <span className="text-[#D94A3F]">*</span>
              </label>
              <select
                {...register("semester", { valueAsNumber: true })}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#111111] bg-[#FAF9F0] text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2B] shadow-hard-xs cursor-pointer"
              >
                {EVENT_CONFIG.semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem} {sem === 1 ? "(Freshers)" : sem === 8 ? "(Graduating Seniors)" : ""}
                  </option>
                ))}
              </select>
              {errors.semester && (
                <p className="mt-1 text-xs font-semibold text-rose-600">
                  {errors.semester.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 4: CNIC (13 digits with auto-formatting) */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#111111] mb-1.5">
              CNIC Number (13 Digits) <span className="text-[#D94A3F]">*</span>
            </label>
            <input
              type="text"
              placeholder="12345-1234567-1"
              maxLength={15}
              value={watch("cnic") || ""}
              onChange={handleCnicChange}
              className={`w-full px-4 py-3 rounded-xl border-2 border-[#111111] bg-[#FAF9F0] font-mono text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2B] transition-colors shadow-hard-xs ${
                errors.cnic ? "border-rose-600 ring-rose-200" : ""
              }`}
            />
            <span className="block mt-1 text-[11px] text-gray-500 font-normal">
              Kept strictly confidential. Used for venue security verification at entry gates.
            </span>
            {errors.cnic && (
              <p className="mt-1 text-xs font-semibold text-rose-600">
                {errors.cnic.message}
              </p>
            )}
          </div>

          {/* Row 5: Payment Screenshot Upload */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#111111] mb-1.5">
              Payment Screenshot <span className="text-[#D94A3F]">*</span>
            </label>

            {/* Hidden native input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            {/* File Dropzone or Preview */}
            {!screenshotPreview ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 sm:p-8 rounded-[20px] border-2 border-dashed border-[#111111] bg-[#FAF9F0] hover:bg-[#F1F0DC] cursor-pointer text-center transition-colors shadow-hard-xs flex flex-col items-center justify-center ${
                  fileError ? "border-rose-600 bg-rose-50/50" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#A3B565] border-2 border-[#111111] flex items-center justify-center text-[#0F3D2B] shadow-hard-xs mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-[#0F3D2B]">
                  Click to upload or drag & drop screenshot
                </span>
                <span className="text-xs text-[#111111]/70 mt-1">
                  JPG, PNG, or WebP (Max 5 MB)
                </span>
                <span className="text-[11px] text-gray-500 mt-2 bg-white px-3 py-1 rounded-full border border-gray-300">
                  Ensure Transaction ID & Date are clearly visible
                </span>
              </div>
            ) : (
              <div className="relative rounded-[20px] overflow-hidden border-2 border-[#111111] bg-[#FAF9F0] shadow-hard p-4 flex flex-col sm:flex-row items-center gap-4">
                {/* Thumbnail */}
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-[#111111] shrink-0 bg-black">
                  <Image
                    src={screenshotPreview}
                    alt="Payment screenshot preview"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info & Remove Action */}
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-800 text-xs font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Screenshot Attached</span>
                  </div>
                  <p className="text-xs font-semibold text-[#111111] truncate">
                    {screenshotFile?.name}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {screenshotFile ? (screenshotFile.size / 1024 / 1024).toFixed(2) : 0} MB
                  </p>

                  <button
                    type="button"
                    onClick={removeScreenshot}
                    className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 border border-rose-300 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Change Screenshot</span>
                  </button>
                </div>
              </div>
            )}

            {fileError && (
              <p className="mt-1.5 text-xs font-semibold text-rose-600">
                {fileError}
              </p>
            )}
          </div>

          {/* Privacy & Anti-Duplicate Notice */}
          <div className="p-3.5 rounded-xl bg-[#F1F0DC] border border-[#111111]/20 flex items-start gap-2.5 text-xs text-[#111111]/80">
            <ShieldCheck className="w-4 h-4 text-[#0F3D2B] shrink-0 mt-0.5" />
            <span>
              Each student is permitted a single registration. Registrations are cross-checked by CNIC and email address. Proofs are safely stored in private encrypted storage.
            </span>
          </div>

          {/* Primary Red Submit Pill Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center font-bold text-base px-8 py-4 rounded-full border-2 border-[#111111] bg-[#D94A3F] text-white hover:bg-[#C53B30] shadow-hard hover:shadow-hard-lg hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-hard"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Verifying & Submitting Registration...</span>
                </>
              ) : (
                <span>Complete Registration & Upload Receipt</span>
              )}
            </button>
          </div>
        </form>
      </CardContainer>
    </div>
  );
}
