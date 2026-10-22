import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const DEFAULT_URL = "https://yfrvflntswkzgtwkjade.supabase.co";
  const DEFAULT_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcnZmbG50c3dremd0d2tqYWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2Nzc1NTcsImV4cCI6MjEwODI1MzU1N30._Ce9PsLOXSteZEsAxlZQOQVGKrvNNyc85CPlxU3ZjMc";

  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
  const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
  const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY).trim();

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
