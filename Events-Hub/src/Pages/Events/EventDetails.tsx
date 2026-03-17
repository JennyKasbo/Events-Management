import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useThemeLocale } from "../../Context/ThemeLocaleContext";
import { EventDetailsView } from "../../Features/Events/components/EventDetails";

const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { theme, t } = useThemeLocale();

  if (!eventId) {
    return (
      <div
        className={`rounded-2xl border p-4 text-base sm:p-6 ${
          theme === "dark"
            ? "border-rose-500/30 bg-rose-500/10 text-rose-200"
            : "border-rose-200 bg-rose-50 text-rose-700"
        }`}
      >
        {t("missingEventId")}
      </div>
    );
  }

  return (
    <EventDetailsView
      eventId={eventId}
      onBack={() => navigate("/events")}
    />
  );
};

export default EventDetails;
