import { useThemeLocale } from "../../../Context/ThemeLocaleContext";
import type { EventFilters as EventFiltersType } from "../types";

interface EventFiltersProps {
  filters: EventFiltersType;
  types?: string[];
  onChange: (next: EventFiltersType) => void;
}

export const EventFilters = ({
  filters,
  types = ["All", "Conference", "Workshop", "Webinar"],
  onChange,
}: EventFiltersProps) => {
  const { theme, t } = useThemeLocale();

  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-2xl p-4 text-base ${
        theme === "dark" ? "bg-[#151821] text-slate-200" : "bg-white text-slate-700"
      }`}
    >
      <select
        value={filters.type}
        onChange={(event) => onChange({ ...filters, type: event.target.value })}
        className={`rounded-xl border px-3 py-2 text-base outline-none ${
          theme === "dark"
            ? "border-white/10 bg-[#0F1117] text-slate-200"
            : "border-slate-200 bg-slate-50 text-slate-700"
        }`}
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type === "All" ? t("allTypes") : type}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={filters.date}
        onChange={(event) => onChange({ ...filters, date: event.target.value })}
        className={`rounded-xl border px-3 py-2 text-base outline-none ${
          theme === "dark"
            ? "border-white/10 bg-[#0F1117] text-slate-200"
            : "border-slate-200 bg-slate-50 text-slate-700"
        }`}
      />
    </div>
  );
};
