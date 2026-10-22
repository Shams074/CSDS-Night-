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
import { formatShortId } from "@/lib/id";
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

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setFileError("Please upload an image in JPG, PNG, or WebP format.");
      return;
    }

    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeFile = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#0B253A", "#D4A03D", "#CBD5E1"],
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
    const shortCode = formatShortId(submittedData.registrationId);

    return (
      <div className="max-w-xl mx-auto py-6 sm:py-10 px-4 animate-in zoom-in-95 duration-200">
        <CardContainer variant="surface" className="text-center p-6 sm:p-8 border border-[#E2E8F0] shadow-md">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FEF9EE] border border-[#D4A03D] flex items-center justify-center mx-auto mb-4 text-[#D4A03D]">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0B253A] bg-[#FEF9EE] px-3 py-1 rounded-full border border-[#D4A03D]/40 inline-block mb-2.5">
            [ REGISTRATION RECEIVED ]
          </span>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B253A] uppercase leading-tight">
            YOU&apos;RE ON THE LIST.
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#475569] max-w-md mx-auto font-normal leading-relaxed">
            We received your registration and payment proof. Computer Cell (CC) will verify your submission within <strong>12–24 hours</strong>.
          </p>

          {/* Reference Card with 6-char Short ID */}
          <div className="my-5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-left max-w-sm mx-auto space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
              <span className="text-[#64748B] uppercase tracking-wider text-[11px]">
                Pass ID (6-Char):
              </span>
              <span className="font-bold text-base text-[#D4A03D] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                {shortCode}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#64748B]">Name:</span>
              <span className="font-bold text-[#0B253A]">{submittedData.name}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#64748B]">CNIC:</span>
              <span className="text-[#0B253A]">{submittedData.cnic}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#64748B]">Venue & Date:</span>
              <span className="text-[#0B253A]">UET Civil Lawn • 12 Nov</span>
            </div>
          </div>

          <p className="text-xs text-[#64748B] mb-5">
            An email with your official entry ticket and QR code will be sent to <strong>{submittedData.email}</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PillButton variant="primary" size="sm" href="/">
              Return to Home
            </PillButton>
            <PillButton
              variant="outline"
              size="sm"
              onClick={() => {
                setIsSuccess(false);
                setSubmittedData(null);
                setScreenshotFile(null);
                setScreenshotPreview(null);
              }}
            >
              Register Another Student
            </PillButton>
          </div>
        </CardContainer>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      {/* Step 1: Payment Instructions Card */}
      <div className="mb-6 p-5 sm:p-7 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 shrink-0">
              <Image
                src="/images/cc-logo.png"
                alt="CC Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold text-[#D4A03D] uppercase tracking-wider block">
                STEP 1: TRANSFER FEE
              </span>
              <span className="font-display font-bold text-sm uppercase text-[#0B253A]">
                FEE: {EVENT_CONFIG.fee.formatted} / PERSON
              </span>
            </div>
          </div>

          <span className="text-[11px] font-mono text-[#0B253A] bg-[#FEF9EE] px-2.5 py-1 rounded-full border border-[#D4A03D]/40 font-semibold self-start sm:self-auto">
            UET Civil Lawn • 12 Nov 2026
          </span>
        </div>

        <p className="text-xs text-[#64748B] mt-3 leading-relaxed">
          Transfer Rs. 2,200 via SadaPay to the official CC Treasurer account below and take a screenshot of the receipt:
        </p>

        {/* Single Account Card */}
        <div className="mt-4">
          {EVENT_CONFIG.fee.accounts.map((acc, idx) => (
            <div
              key={acc.type}
              className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#64748B] mb-1">
                  <span className="text-[#0B253A] font-bold text-xs uppercase">{acc.type}</span>
                  <span className="text-[10px] text-[#D4A03D] bg-[#FEF9EE] px-2 py-0.5 rounded-full border border-[#D4A03D]/30 font-semibold">
                    Treasurer CC
                  </span>
                </div>
                <div className="font-mono font-bold text-[#0B253A] text-base sm:text-lg tracking-wide">
                  {acc.accountNumber}
                </div>
                <div className="text-xs text-[#475569] mt-0.5">
                  <strong>{acc.accountTitle}</strong> — {acc.note}
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(acc.accountNumber, `acc-${idx}`)}
                className="px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#0B253A] flex items-center justify-center gap-1.5 text-xs font-mono text-[#0B253A] hover:text-[#D4A03D] transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                {copiedAccount === `acc-${idx}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Number</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Container */}
      <CardContainer variant="surface" className="p-5 sm:p-8 border border-[#E2E8F0] shadow-sm">
        <div className="mb-5 pb-4 border-b border-[#E2E8F0]">
          <span className="font-mono text-[11px] font-bold text-[#D4A03D] uppercase tracking-wider block mb-1">
            [ STEP 2: CREDENTIALS & PROOF ]
          </span>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-[#0B253A] uppercase">
            STUDENT REGISTRATION
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Fill in your credentials and attach your payment receipt screenshot.
          </p>
        </div>

        {/* Global Server Error Banner */}
        {serverError && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="font-medium leading-snug">{serverError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <label className="block text-xs font-mono uppercase text-[#0B253A] font-bold mb-1">
              Full Name <span className="text-[#D4A03D]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Muhammad Zaryab Khan"
              {...register("name")}
              className={`w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs sm:text-sm text-[#0B253A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#D4A03D] transition-colors ${
                errors.name ? "border-rose-500 ring-1 ring-rose-500" : ""
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
            )}
          </div>

          {/* Row 2: Email */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#0B253A] font-bold mb-1">
              Email Address <span className="text-[#D4A03D]">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. yourname@gmail.com"
              {...register("email")}
              className={`w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs sm:text-sm text-[#0B253A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#D4A03D] transition-colors ${
                errors.email ? "border-rose-500 ring-1 ring-rose-500" : ""
              }`}
            />
            <span className="block mt-1 text-[11px] text-[#64748B]">
              Your official digital entry ticket and QR code will be emailed here.
            </span>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
            )}
          </div>

          {/* Row 3: Section and Semester (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-mono uppercase text-[#0B253A] font-bold mb-1">
                Class Section <span className="text-[#D4A03D]">*</span>
              </label>
              <select
                {...register("section")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs sm:text-sm text-[#0B253A] focus:bg-white focus:outline-none focus:border-[#D4A03D] cursor-pointer"
              >
                {EVENT_CONFIG.sections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec.length === 1 ? `Section ${sec}` : sec}
                  </option>
                ))}
              </select>
              {errors.section && (
                <p className="mt-1 text-xs text-rose-600">{errors.section.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#0B253A] font-bold mb-1">
                Semester <span className="text-[#D4A03D]">*</span>
              </label>
              <select
                {...register("semester", { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs sm:text-sm text-[#0B253A] focus:bg-white focus:outline-none focus:border-[#D4A03D] cursor-pointer"
              >
                {EVENT_CONFIG.semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem} {sem === 1 ? "(Freshers)" : sem === 8 ? "(Graduating)" : ""}
                  </option>
                ))}
              </select>
              {errors.semester && (
                <p className="mt-1 text-xs text-rose-600">{errors.semester.message}</p>
              )}
            </div>
          </div>

          {/* Row 4: CNIC Number */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#0B253A] font-bold mb-1">
              CNIC Number (13 digits) <span className="text-[#D4A03D]">*</span>
            </label>
            <input
              type="text"
              placeholder="17301-1234567-1"
              maxLength={15}
              onChange={handleCnicChange}
              className={`w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs sm:text-sm font-mono text-[#0B253A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#D4A03D] transition-colors ${
                errors.cnic ? "border-rose-500 ring-1 ring-rose-500" : ""
              }`}
            />
            <span className="block mt-1 text-[11px] text-[#64748B]">
              Format: 12345-1234567-1. Each student may register only once.
            </span>
            {errors.cnic && (
              <p className="mt-1 text-xs text-rose-600">{errors.cnic.message}</p>
            )}
          </div>

          {/* Row 5: Payment Screenshot Upload */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#0B253A] font-bold mb-1">
              Payment Screenshot <span className="text-[#D4A03D]">*</span>
            </label>

            {!screenshotPreview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#F8FAFC] hover:bg-slate-50 ${
                  fileError
                    ? "border-rose-500 bg-rose-50/50"
                    : "border-[#CBD5E1] hover:border-[#D4A03D]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />
                <div className="w-10 h-10 rounded-full bg-[#FEF9EE] border border-[#D4A03D]/40 text-[#D4A03D] flex items-center justify-center mx-auto mb-2">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="font-display font-semibold text-xs text-[#0B253A]">
                  Click to upload or drag receipt here
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  JPG, PNG, or WebP (max 5 MB)
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#CBD5E1] shrink-0 bg-white">
                  <Image
                    src={screenshotPreview}
                    alt="Receipt preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-grow">
                  <div className="font-medium text-xs text-[#0B253A] truncate">
                    {screenshotFile?.name}
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    {screenshotFile && (screenshotFile.size / 1024).toFixed(0)} KB • Ready
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-[#64748B] hover:text-[#0B253A] transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {fileError && (
              <p className="mt-1 text-xs text-rose-600">{fileError}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <PillButton
              type="submit"
              variant="gold"
              size="md"
              disabled={isSubmitting}
              className="w-full justify-center"
              icon={
                isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowUpRight className="w-4 h-4" />
                )
              }
            >
              {isSubmitting ? "Submitting Registration..." : "Complete Registration — Rs. 2,200"}
            </PillButton>

            <p className="text-center text-[11px] text-[#64748B] mt-2">
              Protected by spam guard. Computer Cell committee verifies all submissions.
            </p>
          </div>
        </form>
      </CardContainer>
    </div>
  );
}
