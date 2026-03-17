import { useState } from "react";
import {
  createEvent,
  deleteEvent,
  registerForEvent,
  toggleStatus,
} from "../api/eventsApi";
import type { CreateEventPayload, RegisterPayload } from "../types";

export const useEventActions = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async <T>(action: () => Promise<T>) => {
    setIsWorking(true);
    setError(null);
    try {
      return await action();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
      throw err;
    } finally {
      setIsWorking(false);
    }
  };

  const register = async (eventId: string, payload: RegisterPayload) => {
    return await handleAction(() => registerForEvent(eventId, payload));
  };

  const toggleSubmissionStatus = async (submissionId: string) => {
    setActiveId(submissionId);
    try {
      return await handleAction(() => toggleStatus(submissionId));
    } finally {
      setActiveId(null);
    }
  };

  const removeEvent = async (eventId: string) => {
    return await handleAction(() => deleteEvent(eventId));
  };

  const createNewEvent = async (payload: CreateEventPayload) => {
    return await handleAction(() => createEvent(payload));
  };

  return {
    isWorking,
    activeId,
    error,
    register,
    toggleSubmissionStatus,
    removeEvent,
    createNewEvent,
  };
};
