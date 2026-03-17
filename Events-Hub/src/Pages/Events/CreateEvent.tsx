import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Authcontext";
import { useThemeLocale } from "../../Context/ThemeLocaleContext";
import { EventForm } from "../../Features/Events/components/EventForm";
import { useEventActions } from "../../Features/Events/hooks/useEventActions";

const CreateEvent: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { createNewEvent, isWorking, error } = useEventActions();
  const { theme, t } = useThemeLocale();

  if (!isAdmin) {
    return (
      <div
        className={`rounded-2xl border p-6 text-base ${
          theme === "dark"
            ? "border-rose-500/30 bg-rose-500/10 text-rose-200"
            : "border-rose-200 bg-rose-50 text-rose-700"
        }`}
      >
        {t("noPermissionCreate")}
      </div>
    );
  }

  return (
    <section
      className={`min-h-screen px-4 py-6 text-base sm:px-6 sm:py-8 ${
        theme === "dark" ? "bg-[#0F1117] text-slate-100" : "bg-slate-50 text-slate-800"
      }`}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{t("createEvent")}</h1>
          <button
            type="button"
            onClick={() => navigate("/events")}
            className={`rounded-full border px-4 py-2 text-base transition ${
              theme === "dark"
                ? "border-white/10 text-slate-300 hover:text-white"
                : "border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("backToEvents")}
          </button>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-base text-rose-200">
            {error}
          </div>
        ) : null}

        <EventForm
          isSubmitting={isWorking}
          onSubmit={async (payload) => {
            await createNewEvent(payload);
            navigate("/events");
          }}
        />
      </div>
    </section>
  );
};

export default CreateEvent;
