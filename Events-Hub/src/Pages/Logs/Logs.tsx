import React, { useMemo } from "react";
import { useAuth } from "../../Context/Authcontext";
import { useThemeLocale } from "../../Context/ThemeLocaleContext";
import Loading from "../../Components/Loading/Loading";
import { useAuditLogs } from "../../Features/Logs/hooks/useAuditLogs";
import { formatDateTime } from "../../Utils/date";

const Logs: React.FC = () => {
  const { isAdmin } = useAuth();
  const { theme, t, language } = useThemeLocale();
  const { logs, isLoading, error } = useAuditLogs();

  const formatted = useMemo(
    () =>
      logs.map((log) => ({
        ...log,
        formattedDate: formatDateTime(log.created_at, language, "-"),
      })),
    [logs, language]
  );

  if (!isAdmin) {
    return (
      <div
        className={`rounded-2xl border p-6 text-base ${
          theme === "dark"
            ? "border-rose-500/30 bg-rose-500/10 text-rose-200"
            : "border-rose-200 bg-rose-50 text-rose-700"
        }`}
      >
        {t("noPermissionLogs")}
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section
      className={`min-h-screen px-4 py-6 text-base sm:px-6 sm:py-8 ${
        theme === "dark" ? "bg-[#0F1117] text-slate-100" : "bg-slate-50 text-slate-800"
      }`}
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">{t("logsTitle")}</h1>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-base text-rose-200">
            {error}
          </div>
        ) : formatted.length === 0 ? (
          <div
            className={`rounded-2xl border p-6 text-base ${
              theme === "dark"
                ? "border-white/5 bg-[#151821] text-slate-400"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            {t("noLogs")}
          </div>
        ) : (
          <div
            className={`overflow-hidden rounded-2xl border ${
              theme === "dark" ? "border-white/5" : "border-slate-200"
            }`}
          >
            <div
              className={`grid grid-cols-1 gap-0 text-sm font-semibold ${
                theme === "dark" ? "bg-[#151821] text-slate-300" : "bg-slate-100 text-slate-600"
              } md:grid-cols-5`}
            >
              <div className="px-4 py-3">{t("logsAction")}</div>
              <div className="px-4 py-3">{t("logsEntity")}</div>
              <div className="px-4 py-3">{t("logsEntityId")}</div>
              <div className="px-4 py-3">{t("logsAdminId")}</div>
              <div className="px-4 py-3">{t("logsCreatedAt")}</div>
            </div>
            <div className={`${theme === "dark" ? "bg-[#10131a]" : "bg-white"}`}>
              {formatted.map((log) => (
                <div
                  key={log.id}
                  className={`grid grid-cols-1 border-t px-4 py-3 text-base ${
                    theme === "dark"
                      ? "border-white/5 text-slate-200"
                      : "border-slate-200 text-slate-700"
                  } md:grid-cols-5`}
                >
                  <div className="py-1">{log.action}</div>
                  <div className="py-1">{log.entity}</div>
                  <div className="py-1">{log.entity_id ?? "-"}</div>
                  <div className="py-1">{log.admin_id ?? "-"}</div>
                  <div className="py-1">{log.formattedDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Logs;
