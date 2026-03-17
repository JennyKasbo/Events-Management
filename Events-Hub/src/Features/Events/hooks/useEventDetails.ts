import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../Context/Authcontext";
import { getEventDetails, getEventSubmissions, mapRegistrationsResponse } from "../api/eventsApi";
import type { EventDetails, EventSubmission } from "../types";

export const useEventDetails = (eventId: string) => {
  const { isAdmin } = useAuth();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [submissions, setSubmissions] = useState<EventSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!eventId) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const eventDetails = await getEventDetails(eventId);
      setEvent(eventDetails);

      if (isAdmin) {
        const response = await getEventSubmissions(eventId, { page: 1, limit: 10 });
        const mapped = mapRegistrationsResponse(response);
        setSubmissions(mapped.attendees);
      } else {
        setSubmissions([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load event details");
    } finally {
      setIsLoading(false);
    }
  }, [eventId, isAdmin]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    event,
    submissions,
    isLoading,
    error,
    refresh: fetchDetails,
  };
};
