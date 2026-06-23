// app/api/contact/route.ts
// Proxies the contact form submission to Google Apps Script.
// This avoids CORS issues that occur when calling Apps Script directly from the browser.

import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    // ── Server-side validation ────────────────────────────────────────────────
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const appsScriptUrl = process.env.APPS_SCRIPT_URL; // server-only env var (no NEXT_PUBLIC_)
    if (!appsScriptUrl) {
      console.error("APPS_SCRIPT_URL env var is not set.");
      return NextResponse.json(
        { success: false, error: "Server misconfiguration." },
        { status: 500 }
      );
    }

    // ── Forward to Apps Script ────────────────────────────────────────────────
    const response = await fetch(appsScriptUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        name:    body.name.trim(),
        email:   body.email.trim().toLowerCase(),
        phone:   body.phone?.trim()   || "",
        subject: body.subject?.trim() || "",
        message: body.message.trim(),
      }),
      // Apps Script may redirect — follow it
      redirect: "follow",
    });

    const json = await response.json();

    if (!json.success) {
      return NextResponse.json(
        { success: false, error: json.error || "Submission failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[api/contact] Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}