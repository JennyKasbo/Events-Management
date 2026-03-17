import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Authcontext";
import { useThemeLocale } from "../../Context/ThemeLocaleContext";
import { EventsList } from "../../Features/Events/components/EventsList";

const Events: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { t } = useThemeLocale();

  return (
    <div className="relative">
      {isAdmin ? (
        <div className="absolute right-6 top-8 z-10">
          <button
            type="button"
            onClick={() => navigate("/events/create")}
            className="rounded-full bg-violet-500 px-5 py-2 text-base font-semibold text-white transition hover:bg-violet-400"
          >
            {t("createEvent")}
          </button>
        </div>
      ) : null}
      <EventsList
        onSelectEvent={(eventId) => navigate(`/events/${eventId}`)}
      />
    </div>
  );
};

export default Events;
