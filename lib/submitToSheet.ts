// lib/submitToSheet.ts
// Submits contact form data to Google Sheets via Apps Script Web App.
// Set NEXT_PUBLIC_APPS_SCRIPT_URL in your .env.local

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitToSheet(data: ContactFormData): Promise<SubmitResult> {

  // Sanitise before sending
  const payload: ContactFormData = {
    name:    data.name.trim(),
    email:   data.email.trim().toLowerCase(),
    phone:   data.phone?.trim()   || "",
    subject: data.subject?.trim() || "",
    message: data.message.trim(),
  };

  try {
    // Apps Script Web Apps require no-cors when called from a browser
    // BUT with no-cors we can't read the response body.
    // Solution: use a Next.js API proxy route (/api/contact) which calls
    // the Apps Script URL server-side — avoids CORS entirely.
    const res = await fetch("/api/contact", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      return { success: false, error: json.error || "Submission failed. Try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("[submitToSheet]", err);
    return { success: false, error: "Network error. Please check your connection." };
  }
}