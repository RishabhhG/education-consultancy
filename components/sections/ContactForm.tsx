"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { contactSchema, type ContactFormData, COURSE_OPTIONS } from "@/schemas/contact";
import { cn } from "@/lib/utils";
import { submitToSheet } from "@/lib/submitToSheet";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
  const result = await submitToSheet({
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.course,  // maps your "course" field → "subject" column in the sheet
    message: data.message || "",
  });

  if (!result.success) {
    toast.error(result.error || "Submission failed. Please try again.");
    return;
  }

  setSubmitted(true);
  toast.success("Enquiry submitted! We'll reach out within 24 hours.");
  reset();
};

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground/60",
      "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200",
      hasError
        ? "border-red-500/50 focus:ring-red-500"
        : "border-border hover:border-brand-500/30"
    );

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-emerald-500" />
        </div>
        <h3 className="font-display font-bold text-xl text-foreground mb-2">
          We received your message!
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
          A career advisor will contact you within 24 hours to schedule your free consultation.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
        >
          Submit another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Enter your Name"
            className={inputClass(!!errors.name)}
            autoComplete="name"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Enter Phone number"
            className={inputClass(!!errors.phone)}
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@email.com"
          className={inputClass(!!errors.email)}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Course */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Course / Area of Interest <span className="text-red-500">*</span>
        </label>
        <select
          {...register("course")}
          className={cn(inputClass(!!errors.course), "cursor-pointer")}
          defaultValue=""
        >
          <option value="" disabled>
            Select a course or topic
          </option>
          {COURSE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.course && (
          <p className="text-xs text-red-500 mt-1">{errors.course.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us a bit about your background, goals, or any specific questions…"
          className={cn(inputClass(!!errors.message), "resize-none")}
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-brand w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Send Enquiry <Send size={16} />
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        We respond within 24 hours. Your information is never shared with third parties.
      </p>
    </form>
  );
}
