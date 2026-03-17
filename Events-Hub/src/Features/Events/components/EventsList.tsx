import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useThemeLocale } from "../../../Context/ThemeLocaleContext";
import { useEvents } from "../hooks/useEvents";
import type { EventListTab } from "../types";
import { EventCard } from "./EventCard";
import { EventFilters } from "./EventFilters";
import Loading from "../../../Components/Loading/Loading";

interface EventsListProps {
  onSelectEvent?: (eventId: string) => void;
}

export const EventsList = ({ onSelectEvent }: EventsListProps) => {
  const { theme, t, language } = useThemeLocale();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const {
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    events,
    isLoading,
    error,
    page,
    setPage,
    totalPages,
    hasNext,
    hasPrev,
  } = useEvents();

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchQuery }));
  }, [searchQuery, setFilters]);

  const updateTab = (nextTab: EventListTab) => {
    setActiveTab(nextTab);
  };


  return (
    <section
      className={`min-h-screen overflow-hidden px-4 py-6 text-base sm:px-6 sm:py-8 ${
        theme === "dark" ? "bg-[#0F1117] text-slate-100" : "bg-slate-50 text-slate-800"
      }`}
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <EventFilters filters={filters} onChange={setFilters} />
          <div
            className={`inline-flex rounded-full p-1 ${
              theme === "dark" ? "bg-[#151821]" : "bg-white shadow-sm"
            }`}
          >
            {(["upcoming", "past"] as EventListTab[]).map((tabValue) => (
              <button
                key={tabValue}
                type="button"
                onClick={() => updateTab(tabValue)}
                className={`rounded-full px-5 py-2 text-base font-semibold transition ${
                  activeTab === tabValue
                    ? "bg-violet-500 text-white"
                    : theme === "dark"
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tabValue === "upcoming" ? t("upcomingEvents") : t("pastEvents")}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-base text-rose-200">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div
            className={`rounded-2xl border p-6 text-base ${
              theme === "dark"
                ? "border-white/5 bg-[#151821] text-slate-400"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            {t("noEvents")}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                tab={activeTab}
                onViewDetails={onSelectEvent}
              />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-base text-slate-400">
              {language === "ar"
                ? `${totalPages} ${t("ofLabel")} ${page}`
                : `${t("pageLabel")} ${page} ${t("ofLabel")} ${totalPages}`}
            </span>
            <div
              className="flex items-center gap-2"
              dir={language === "ar" ? "ltr" : "rtl"}
            >
              <button
                type="button"
                disabled={!hasPrev}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                className={`rounded-full border px-4 py-2 text-base transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  theme === "dark"
                    ? "border-white/10 text-slate-300 hover:text-white"
                    : "border-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                {t("prev")}
              </button>
              <button
                type="button"
                disabled={!hasNext}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                className={`rounded-full border px-4 py-2 text-base transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  theme === "dark"
                    ? "border-white/10 text-slate-300 hover:text-white"
                    : "border-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                {t("next")}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
