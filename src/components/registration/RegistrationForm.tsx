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
  ArrowUpRight,
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
    let value = e.target.value.replace(/\D/g, "");
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleFileSelect = (file: File) => {
    setFileError(null);
    setServerError(null);

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileError("File size exceeds 5 MB. Please upload a smaller image.");
      return;
    }

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
          colors: ["#B4F23D", "#FFFFFF", "#111111"],
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
        <CardContainer variant="surface" className="text-center p-6 sm:p-10 border border-[#262626]">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1b2210] border border-[#B4F23D] flex items-center justify-center mx-auto mb-5 text-[#B4F23D]">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B4F23D] bg-[#14180d] px-3 py-1 rounded-full border border-[#B4F23D]/30 inline-block mb-3">
            [ REGISTRATION RECEIVED ]
          </span>

          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase leading-tight">
            YOU&apos;RE ON THE LIST.
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-gray-300 max-w-lg mx-auto font-normal leading-relaxed">
            We received your registration and proof of payment. The CSDS committee will verify your submission within <strong>12–24 hours</strong>.
          </p>

          {/* Reference Card */}
          <div className="my-6 p-5 rounded-2xl bg-[#0c0c0c] border border-[#262626] text-left max-w-md mx-auto space-y-2.5 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-gray-500 uppercase tracking-wider">
                Registration ID:
              </span>
              <span className="font-bold text-[#B4F23D]">
                {submittedData.registrationId}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Student Name:</span>
              <span className="font-semibold text-white">{submittedData.name}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Email Address:</span>
              <span className="font-semibold text-white">{submittedData.email}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">CNIC:</span>
              <span className="font-semibold text-white">{submittedData.cnic}</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-gray-400">Status:</span>
              <span className="font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                Pending Verification
              </span>
            </div>
          </div>

          <div className="bg-[#14180d] p-4 rounded-xl border border-[#B4F23D]/30 max-w-md mx-auto text-xs text-gray-300 leading-relaxed mb-6">
            <strong>Next Step:</strong> Your official entry pass with QR code will be emailed to <strong>{submittedData.email}</strong>. Bring your original CNIC to the venue.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PillButton variant="primary" size="md" href="/">
              Return to Event Homepage
            </PillButton>
            <PillButton
              variant="outline"
              size="md"
              onClick={() => {
                setIsSuccess(false);
                setSubmittedData(null);
                removeScreenshot();
              }}
            >
              Submit Another
            </PillButton>
          </div>
        </CardContainer>
      </div>
    );
  }

  // ACTIVE REGISTRATION FORM
  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 px-4">
      {/* Top Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-display font-semibold tracking-wider uppercase text-gray-400 hover:text-[#B4F23D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Event Details</span>
        </Link>
        <span className="font-mono text-[11px] text-[#B4F23D] bg-[#14180d] px-2.5 py-0.5 rounded-full border border-[#B4F23D]/30 uppercase">
          CSDS Verified Pass
        </span>
      </div>

      {/* Standout Fee & Payment Instructions Banner (Right above the form) */}
      <div className="mb-8 rounded-2xl sm:rounded-3xl bg-[#14180d] border border-[#B4F23D]/40 p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="font-mono text-xs font-bold text-[#B4F23D] uppercase tracking-wider block">
              REGISTRATION FEE
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display font-black text-3xl sm:text-4xl text-white">
                {EVENT_CONFIG.fee.formatted}
              </span>
              <span className="font-display text-xs text-gray-400 uppercase">
                / {EVENT_CONFIG.fee.unit}
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b2210] text-[#B4F23D] text-xs font-mono border border-[#B4F23D]/30 self-start sm:self-auto">
            <Sparkles className="w-3 h-3" />
            <span>All-Inclusive Pass</span>
          </div>
        </div>

        <p className="text-xs text-gray-300 font-normal mt-3">
          Transfer <strong>Rs. 2,200</strong> to any of the following official society accounts and upload your payment receipt below:
        </p>

        {/* Bank & Wallet Accounts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {EVENT_CONFIG.fee.accounts.map((acc, idx) => (
            <div
              key={idx}
              className="bg-[#0c0c0c] rounded-xl border border-[#262626] p-3 text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold text-[#B4F23D] uppercase">
                    {acc.type}
                  </span>
                  <CreditCard className="w-3 h-3 text-gray-500" />
                </div>
                <div className="font-mono font-bold text-white text-xs sm:text-sm">
                  {acc.accountNumber}
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5 truncate">
                  {acc.accountTitle}
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(acc.accountNumber, `acc-${idx}`)}
                className="mt-2 pt-2 border-t border-[#1f1f1f] flex items-center justify-center gap-1 text-[11px] font-mono text-[#B4F23D] hover:text-white transition-colors cursor-pointer"
              >
                {copiedAccount === `acc-${idx}` ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
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

      {/* Main Form Container */}
      <CardContainer variant="surface" className="p-6 sm:p-10 border border-[#262626]">
        <div className="mb-6 sm:mb-8 pb-5 border-b border-[#262626]">
          <span className="font-mono text-xs font-bold text-[#B4F23D] uppercase tracking-wider block mb-1">
            [ STEP 2: CREDENTIALS & PROOF ]
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
            REGISTER YOUR PASS
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Fill in your student credentials and attach your payment receipt screenshot.
          </p>
        </div>

        {/* Global Server Error Banner */}
        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="font-medium leading-snug">{serverError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Honeypot Spam Guard */}
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
            <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
              Full Name <span className="text-[#B4F23D]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Ahmad Shah Afridi"
              {...register("name")}
              className={`w-full px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#161616] text-sm text-white placeholder-gray-500 focus:bg-[#1a1a1a] focus:outline-none focus:border-[#B4F23D] transition-colors ${
                errors.name ? "border-rose-600 ring-1 ring-rose-600" : ""
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Row 2: Email Address */}
          <div>
            <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
              Email Address <span className="text-[#B4F23D]">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. yourname@csds.uop.edu.pk or personal email"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#161616] text-sm text-white placeholder-gray-500 focus:bg-[#1a1a1a] focus:outline-none focus:border-[#B4F23D] transition-colors ${
                errors.email ? "border-rose-600 ring-1 ring-rose-600" : ""
              }`}
            />
            <span className="block mt-1 text-[11px] text-gray-500">
              Your official digital entry pass and QR ticket will be sent to this email.
            </span>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Row 3: Section and Semester (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                Section <span className="text-[#B4F23D]">*</span>
              </label>
              <select
                {...register("section")}
                className="w-full px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#161616] text-sm text-white focus:outline-none focus:border-[#B4F23D] cursor-pointer"
              >
                {EVENT_CONFIG.sections.map((sec) => (
                  <option key={sec} value={sec} className="bg-[#161616]">
                    Section {sec}
                  </option>
                ))}
              </select>
              {errors.section && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.section.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                Semester <span className="text-[#B4F23D]">*</span>
              </label>
              <select
                {...register("semester", { valueAsNumber: true })}
                className="w-full px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#161616] text-sm text-white focus:outline-none focus:border-[#B4F23D] cursor-pointer"
              >
                {EVENT_CONFIG.semesters.map((sem) => (
                  <option key={sem} value={sem} className="bg-[#161616]">
                    Semester {sem} {sem === 1 ? "(Freshers)" : sem === 8 ? "(Graduating Seniors)" : ""}
                  </option>
                ))}
              </select>
              {errors.semester && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.semester.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 4: CNIC */}
          <div>
            <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
              CNIC Number (13 Digits) <span className="text-[#B4F23D]">*</span>
            </label>
            <input
              type="text"
              placeholder="12345-1234567-1"
              maxLength={15}
              value={watch("cnic") || ""}
              onChange={handleCnicChange}
              className={`w-full px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#161616] font-mono text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#B4F23D] ${
                errors.cnic ? "border-rose-600 ring-1 ring-rose-600" : ""
              }`}
            />
            <span className="block mt-1 text-[11px] text-gray-500">
              Kept confidential. Validated against your student card at entry gates.
            </span>
            {errors.cnic && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.cnic.message}
              </p>
            )}
          </div>

          {/* Row 5: Payment Screenshot Upload */}
          <div>
            <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
              Payment Screenshot <span className="text-[#B4F23D]">*</span>
            </label>

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

            {!screenshotPreview ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 sm:p-8 rounded-2xl border border-dashed border-[#333333] hover:border-[#B4F23D] bg-[#161616] hover:bg-[#1a1a1a] cursor-pointer text-center transition-colors flex flex-col items-center justify-center ${
                  fileError ? "border-rose-600 bg-rose-950/20" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#1b2210] border border-[#B4F23D]/40 flex items-center justify-center text-[#B4F23D] mb-3">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="font-display font-semibold text-xs sm:text-sm text-white uppercase tracking-wider">
                  Click to upload or drag & drop receipt
                </span>
                <span className="font-mono text-[11px] text-gray-400 mt-1">
                  JPG, PNG, or WebP (Max 5 MB)
                </span>
              </div>
            ) : (
              <div className="relative rounded-2xl border border-[#333333] bg-[#161616] p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-28 h-28 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black">
                  <Image
                    src={screenshotPreview}
                    alt="Payment screenshot preview"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#B4F23D] text-xs font-mono mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Receipt Attached</span>
                  </div>
                  <p className="text-xs text-white truncate">
                    {screenshotFile?.name}
                  </p>
                  <p className="text-[11px] font-mono text-gray-500 mt-0.5">
                    {screenshotFile ? (screenshotFile.size / 1024 / 1024).toFixed(2) : 0} MB
                  </p>

                  <button
                    type="button"
                    onClick={removeScreenshot}
                    className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono text-rose-400 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Change Screenshot</span>
                  </button>
                </div>
              </div>
            )}

            {fileError && (
              <p className="mt-1.5 text-xs text-rose-400">
                {fileError}
              </p>
            )}
          </div>

          {/* Privacy Note */}
          <div className="p-3.5 rounded-xl bg-[#0c0c0c] border border-white/10 flex items-start gap-2.5 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-[#B4F23D] shrink-0 mt-0.5" />
            <span>
              Single registration per CNIC. Proofs are uploaded to private encrypted Supabase storage.
            </span>
          </div>

          {/* Primary Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-wider px-8 py-4 rounded-full bg-[#B4F23D] text-black hover:bg-[#A3E635] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Submitting Registration...</span>
                </>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Complete Registration & Upload Receipt</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </span>
              )}
            </button>
          </div>
        </form>
      </CardContainer>
    </div>
  );
}
