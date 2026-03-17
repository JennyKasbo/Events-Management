import { useState } from "react";
import { useThemeLocale } from "../../../Context/ThemeLocaleContext";
import type { CreateEventPayload } from "../types";

interface EventFormProps {
  isSubmitting?: boolean;
  onSubmit: (payload: CreateEventPayload) => void;
}

export const EventForm = ({ isSubmitting, onSubmit }: EventFormProps) => {
  const { theme, t } = useThemeLocale();
  const [formState, setFormState] = useState<CreateEventPayload>({
    name: "",
    type: "Conference",
    date: "",
    capacity: 0,
    description: "",
  });

  const updateField = <K extends keyof CreateEventPayload>(
    key: K,
    value: CreateEventPayload[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form
      className={`space-y-4 rounded-2xl border p-6 text-base ${
        theme === "dark"
          ? "border-white/5 bg-[#151821] text-slate-100"
          : "border-slate-200 bg-white text-slate-800"
      }`}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formState);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder={t("eventTitle")}
          value={formState.name}
          onChange={(event) => updateField("name", event.target.value)}
          className={`w-full rounded-xl border px-4 py-3 text-base outline-none ${
            theme === "dark"
              ? "border-white/10 bg-[#0F1117] text-slate-200"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        />
        <select
          value={formState.type}
          onChange={(event) => updateField("type", event.target.value)}
          className={`w-full rounded-xl border px-4 py-3 text-base outline-none ${
            theme === "dark"
              ? "border-white/10 bg-[#0F1117] text-slate-200"
            : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          <option value="Conference">CONFERENCE</option>
          <option value="Workshop">WORKSHOP</option>
          <option value="Webinar">WEBINAR</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="date"
          value={formState.date}
          onChange={(event) => updateField("date", event.target.value)}
          className={`w-full rounded-xl border px-4 py-3 text-base outline-none ${
            theme === "dark"
              ? "border-white/10 bg-[#0F1117] text-slate-200"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        />
        <input
          type="number"
          min={1}
          value={formState.capacity}
          onChange={(event) => updateField("capacity", Number(event.target.value))}
          className={`w-full rounded-xl border px-4 py-3 text-base outline-none ${
            theme === "dark"
              ? "border-white/10 bg-[#0F1117] text-slate-200"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        />
      </div>


      <textarea
        placeholder={t("eventDescription")}
        value={formState.description}
        onChange={(event) => updateField("description", event.target.value)}
        className={`min-h-[120px] w-full rounded-xl border px-4 py-3 text-base outline-none ${
          theme === "dark"
            ? "border-white/10 bg-[#0F1117] text-slate-200"
            : "border-slate-200 bg-slate-50 text-slate-700"
        }`}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-violet-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? t("creating") : t("createEvent")}
      </button>
    </form>
  );
};
