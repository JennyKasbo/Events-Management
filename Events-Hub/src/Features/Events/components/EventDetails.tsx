import { useMemo, useState } from "react";
import { useThemeLocale } from "../../../Context/ThemeLocaleContext";
import { useAuth } from "../../../Context/Authcontext";
import { useEventActions } from "../hooks/useEventActions";
import { useEventDetails } from "../hooks/useEventDetails";
import type { EventListTab } from "../types";
import { AdminSubmissions } from "./Submissions";
import { RegistrationModal } from "./RegistrationForm";
import Loading from "../../../Components/Loading/Loading";
import PopUp from "../../../Components/PopUp/PopUp";
import { formatDateTimeParts } from "../../../Utils/date";

interface EventDetailsViewProps {
  eventId: string;
  currentTab?: EventListTab;
  onBack?: () => void;
}

const isUpcomingEvent = (dateValue?: string) => {
  if (!dateValue) {
    return false;
  }
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return false;
  }
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return date.getTime() >= today.getTime();
};

const getDateTimeParts = (value: string, language: string, fallback: string) => {
  return formatDateTimeParts(value, language, fallback);
};

export const EventDetailsView = ({
  eventId,
  currentTab,
  onBack,
}: EventDetailsViewProps) => {
  const { theme, t, language } = useThemeLocale();
  const { isAdmin } = useAuth();
  const { event, submissions, isLoading, error, refresh } = useEventDetails(
    eventId
  );
  const {
    isWorking,
    activeId,
    error: actionError,
    register,
    toggleSubmissionStatus,
    removeEvent,
  } = useEventActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const isUpcoming = useMemo(() => {
    if (currentTab) {
      return currentTab === "upcoming";
    }
    return isUpcomingEvent(event?.date);
  }, [currentTab, event?.date]);

  const dateTimeParts = useMemo(() => {
    if (!event?.date) {
      return { date: t("dateUnavailable"), time: t("dateUnavailable") };
    }
    return getDateTimeParts(event.date, language, t("dateUnavailable"));
  }, [event?.date, language, t]);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !event) {
    return (
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-base text-rose-200">
        {error || t("eventNotFound")}
      </div>
    );
  }

  const dateOnly = dateTimeParts.date;
  const timeOnly = dateTimeParts.time;

  return (
    <section
      className={`min-h-screen px-4 py-6 text-base sm:px-6 sm:py-8 ${
        theme === "dark" ? "bg-[#0F1117] text-slate-100" : "bg-slate-50 text-slate-800"
      }`}
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className={`rounded-full border px-4 py-2 text-base transition ${
              theme === "dark"
                ? "border-white/10 text-slate-300 hover:text-white"
                : "border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("back")}
          </button>
          {isAdmin ? (
            <button
              type="button"
              onClick={() => setShowDeletePopup(true)}
              disabled={isWorking}
              className={`rounded-full px-4 py-2 text-base font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                theme === "dark"
                  ? "bg-rose-500/20 text-rose-200 hover:bg-rose-500/30"
                  : "bg-rose-100 text-rose-700 hover:bg-rose-200"
              }`}
            >
              {t("deleteEvent")}
            </button>
          ) : null}
        </div>

        <div
          className={`rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] ${
            theme === "dark" ? "bg-[#151821]" : "bg-white"
          }`}
        >
          <div className="space-y-4">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-base ${
                theme === "dark"
                  ? "border-white/10 bg-white/5 text-slate-300"
                  : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              {event.type}
            </span>
            <h1 className="text-3xl font-semibold">{event.name}</h1>
            {event.description || event.longDescription ? (
              <p
                className={`text-base leading-relaxed ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {event.longDescription || event.description}
              </p>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div
              className={`rounded-2xl border p-4 ${
                theme === "dark"
                  ? "border-white/5 bg-[#1E2230] text-slate-200"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M8 3v4M16 3v4M3 10h18" />
                  </svg>
                </span>
                {t("dateLabel")}
              </div>
              <div className="text-base font-semibold">{dateOnly}</div>
            </div>
            <div
              className={`rounded-2xl border p-4 ${
                theme === "dark"
                  ? "border-white/5 bg-[#1E2230] text-slate-200"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                {t("timeLabel")}
              </div>
              <div className="text-base font-semibold">{timeOnly || "-"}</div>
            </div>
            <div
              className={`rounded-2xl border p-4 ${
                theme === "dark"
                  ? "border-white/5 bg-[#1E2230] text-slate-200"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c1.8-4 6-6 8-6s6.2 2 8 6" />
                  </svg>
                </span>
                {t("capacityLabel")}
              </div>
              <div className="text-base font-semibold">
                {event.registeredCount ?? 0}/{event.capacity ?? "-"}
              </div>
            </div>
            <div
              className={`rounded-2xl border p-4 ${
                theme === "dark"
                  ? "border-white/5 bg-[#1E2230] text-slate-200"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M7 4h7l5 5v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    <path d="M14 4v5h5" />
                  </svg>
                </span>
                {t("typeLabel")}
              </div>
              <div className="text-base font-semibold">{event.type}</div>
            </div>
          </div>

          {!isAdmin && isUpcoming && event.registeredCount < event.capacity ? (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full rounded-2xl bg-violet-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-violet-400"
            >
              {t("register")}
            </button>
          ) : null}
        </div>

        {actionError ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-base text-rose-200">
            {actionError}
          </div>
        ) : null}

        {isAdmin ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{t("submissions")}</h2>
              <span className="text-base text-slate-400">
                {t("applicants")}: {submissions.length}
              </span>
            </div>
            <AdminSubmissions
              submissions={submissions}
              isUpcoming={isUpcoming}
              activeId={activeId}
              onToggleStatus={async (submissionId) => {
                await toggleSubmissionStatus(submissionId);
                await refresh();
              }}
            />
          </div>
        ) : null}
      </div>

      <RegistrationModal
        isOpen={isModalOpen}
        isSubmitting={isWorking}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (payload) => {
          await register(event.id, payload);
          setIsModalOpen(false);
          await refresh();
        }}
      />
      <PopUp
        isShow={showDeletePopup}
        setIshow={setShowDeletePopup}
        del
        onConfirm={async () => {
          await removeEvent(event.id);
          setShowDeletePopup(false);
          onBack?.();
        }}
      />
    </section>
  );
};
