import { useState } from "react";
import { useThemeLocale } from "../../../Context/ThemeLocaleContext";
import type { EventSubmission } from "../types";
import { formatDateTime } from "../../../Utils/date";

interface AdminSubmissionsProps {
  submissions: EventSubmission[];
  isUpcoming: boolean;
  activeId?: string | null;
  onToggleStatus: (submissionId: string) => void;
}

const statusStyles: Record<string, string> = {
  APPROVED: "border-emerald-500/30 text-emerald-300",
  REJECTED: "border-rose-500/30 text-rose-300",
  PENDING: "border-amber-500/30 text-amber-300",
};

const lightStatusStyles: Record<string, string> = {
  APPROVED: "border-emerald-200 text-emerald-700",
  REJECTED: "border-rose-200 text-rose-700",
  PENDING: "border-amber-200 text-amber-700",
};

export const AdminSubmissions = ({
  submissions,
  isUpcoming,
  activeId,
  onToggleStatus,
}: AdminSubmissionsProps) => {
  const { theme, t, language } = useThemeLocale();
  const [openId, setOpenId] = useState<string | null>(null);

  if (!submissions.length) {
    return (
      <div
        className={`rounded-2xl border p-6 text-base ${
          theme === "dark"
            ? "border-white/5 bg-[#151821] text-slate-400"
            : "border-slate-200 bg-white text-slate-500"
        }`}
      >
        {t("noSubmissions")}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {submissions.map((submission) => (
        <div key={submission.id} className="space-y-3">
          <div
            className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-5 text-base ${
              theme === "dark"
                ? "border-white/5 bg-[#151821] text-slate-100"
                : "border-slate-200 bg-white text-slate-800"
            }`}
            dir={language === "ar" ? "ltr" : "rtl"}
          >
            <div className="space-y-1">
              <p className="text-base font-semibold">{submission.name}</p>
              <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                {submission.email}
              </p>
              {submission.linkedinUrl ? (
                <p className={`${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                  {submission.linkedinUrl}
                </p>
              ) : null}
              {submission.educationLevel ? (
                <p className={`${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                  {submission.educationLevel}
                </p>
              ) : null}
              {submission.motivation ? (
                <p className={`${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                  {submission.motivation}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-base ${
                theme === "dark"
                  ? statusStyles[submission.status]
                  : lightStatusStyles[submission.status]
              }`}
            >
              {t(submission.status.toLowerCase())}
            </span>
              <button
                type="button"
                onClick={() =>
                  setOpenId((prev) => (prev === submission.id ? null : submission.id))
                }
                className={`rounded-full border px-4 py-2 text-base transition ${
                  theme === "dark"
                    ? "border-white/10 text-slate-300 hover:text-white"
                    : "border-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                {openId === submission.id ? t("hideDetails") : t("viewDetails")}
              </button>
              {isUpcoming && submission.status === "PENDING" ? (
                <button
                  type="button"
                  disabled={activeId === submission.id}
                  onClick={() => onToggleStatus(submission.id)}
                className={`rounded-full px-4 py-2 text-base font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  theme === "dark"
                    ? "bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                }`}
              >
                  {activeId === submission.id ? t("updating") : t("accept")}
                </button>
              ) : null}
            </div>
          </div>
          {openId === submission.id ? (
            <div
              className={`rounded-2xl border p-4 text-base ${
                theme === "dark"
                  ? "border-white/5 bg-[#151821] text-slate-300"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <span className="text-sm text-slate-500">{t("registeredAt")}</span>
                  <p className="text-base">
                    {submission.submittedAt
                      ? formatDateTime(submission.submittedAt, language, "-")
                      : "-"}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-slate-500">{t("educationLevel")}</span>
                  <p className="text-base">{submission.educationLevel || "-"}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm text-slate-500">{t("motivation")}</span>
                  <p className="text-base">{submission.motivation || "-"}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm text-slate-500">{t("linkedinProfile")}</span>
                  <p className="text-base">{submission.linkedinUrl || "-"}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
