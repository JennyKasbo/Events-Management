import { useThemeLocale } from "../../../Context/ThemeLocaleContext";
import { formatDateTime } from "../../../Utils/date";
import { useAuth } from "../../../Context/Authcontext";
import type { EventItem, EventListTab } from "../types";

interface EventCardProps {
  event: EventItem;
  tab: EventListTab;
  onViewDetails?: (eventId: string) => void;
}

const statusStyles: Record<string, string> = {
  APPROVED: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  REJECTED: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  PENDING: "bg-amber-500/15 text-amber-300 border-amber-500/30",
};

const lightStatusStyles: Record<string, string> = {
  APPROVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
};

export const EventCard = ({ event, tab, onViewDetails }: EventCardProps) => {
  const { theme, t, language } = useThemeLocale();
  const { isAdmin } = useAuth();
  const showStatus = !isAdmin && tab === "past" && event.userStatus;
  const statusClass = event.userStatus
    ? theme === "dark"
      ? statusStyles[event.userStatus]
      : lightStatusStyles[event.userStatus]
    : "";
  const formattedDate = formatDateTime(event.date, language, t("dateUnavailable"));

  return (
    <div
      className={`flex h-full flex-col justify-between rounded-2xl p-6 text-base shadow-[0_10px_30px_rgba(0,0,0,0.15)] ${
        theme === "dark" ? "bg-[#1A1C23] text-slate-100" : "bg-white text-slate-800"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-base ${
            theme === "dark"
              ? "border-white/10 bg-white/5 text-slate-300"
              : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          {event.type}
        </span>
        {showStatus && event.userStatus ? (
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-base ${statusClass}`}
          >
            {t(event.userStatus.toLowerCase())}
          </span>
        ) : null}
      </div>

      <div className="mt-5 space-y-3">
        <h3 className="text-xl font-semibold">{event.name}</h3>
        <div
          className={`flex flex-wrap items-center gap-4 text-base ${
            theme === "dark" ? "text-slate-300" : "text-slate-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-violet-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M8 3v4M16 3v4M3 10h18" />
            </svg>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-violet-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.8-4 6-6 8-6s6.2 2 8 6" />
            </svg>
            <span>
              {event.registeredCount}/{event.capacity}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onViewDetails?.(event.id)}
        className={`mt-6 inline-flex w-fit items-center gap-2 text-base font-semibold transition ${
          theme === "dark"
            ? "text-violet-300 hover:text-violet-200"
            : "text-violet-600 hover:text-violet-500"
        }`}
      >
        {t("viewDetails")}
        <span className="text-base">-&gt;</span>
      </button>
    </div>
  );
};
