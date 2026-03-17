import { useCallback, useEffect, useState } from "react";
import {
  getAllEvents,
  mapEventsListResponse,
  getUpcomingEvents,
  getPastSubmittedEvents,
  mapUserRegistrationsResponse,
  getEventDetails,
} from "../api/eventsApi";
import { useAuth } from "../../../Context/Authcontext";
import type { EventFilters, EventItem, EventListTab } from "../types";

const defaultFilters: EventFilters = {
  search: "",
  type: "All",
  date: "",
};

const normalize = (value: string) => value.trim().toLowerCase();

const isPastEvent = (dateValue: string) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return false;
  }
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return date.getTime() < today.getTime();
};

const matchesFilters = (event: EventItem, filters: EventFilters) => {
  const searchValue = normalize(filters.search);
  const typeValue = normalize(filters.type);

  const matchesSearch =
    !searchValue ||
    normalize(event.name).includes(searchValue) ||
    normalize(event.description || "").includes(searchValue);

  const matchesType = typeValue === "all" || normalize(event.type) === typeValue;

  const filterDate = filters.date ? new Date(filters.date) : null;
  const eventDate = new Date(event.date);
  const matchesDate = !filterDate
    ? true
    : eventDate instanceof Date &&
      !Number.isNaN(eventDate.getTime()) &&
      eventDate.getFullYear() === filterDate.getFullYear() &&
      eventDate.getMonth() === filterDate.getMonth() &&
      eventDate.getDate() === filterDate.getDate();

  return matchesSearch && matchesType && matchesDate;
};

export const useEvents = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<EventListTab>("upcoming");
  const [filters, setFilters] = useState<EventFilters>(defaultFilters);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const pageSize = 6;

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isAdmin) {
        const response = await getAllEvents({
          page,
          limit: pageSize,
          search: filters.search || undefined,
        });
        const { items, totalPages: serverTotalPages, hasNext, hasPrev } =
          mapEventsListResponse(response);
        const filteredByTab = items.filter((event) =>
          activeTab === "past" ? isPastEvent(event.date) : !isPastEvent(event.date)
        );
        const filteredEvents = filteredByTab.filter((event) =>
          matchesFilters(event, filters)
        );
        setEvents(filteredEvents);
        setTotalPages(serverTotalPages || 1);
        setHasNext(hasNext);
        setHasPrev(hasPrev);
        return;
      }

      if (activeTab === "past") {
        const response = await getPastSubmittedEvents();
        const mapped = mapUserRegistrationsResponse(response);
        const filtered = mapped.filter((event) => matchesFilters(event, filters));
        const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
        const start = (page - 1) * pageSize;
        const pageItems = filtered.slice(start, start + pageSize);
        const enriched = await Promise.all(
          pageItems.map(async (event) => {
            try {
              const details = await getEventDetails(event.id);
              return {
                ...event,
                registeredCount: details.registeredCount,
                capacity: details.capacity,
              };
            } catch {
              return event;
            }
          })
        );
        setEvents(enriched);
        setTotalPages(pages);
        setHasNext(page < pages);
        setHasPrev(page > 1);
      } else {
        const response = await getUpcomingEvents({
          page,
          limit: pageSize,
          search: filters.search || undefined,
          type: filters.type === "All" ? undefined : filters.type,
          dateFrom: filters.date || undefined,
          dateTo: filters.date || undefined,
        });
        const { items, totalPages: serverTotalPages, hasNext, hasPrev } =
          mapEventsListResponse(response);
        const filtered = items.filter((event) => matchesFilters(event, filters));
        setEvents(filtered);
        setTotalPages(serverTotalPages || 1);
        setHasNext(hasNext);
        setHasPrev(hasPrev);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, isAdmin, filters, page]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  useEffect(() => {
    setPage(1);
  }, [activeTab, filters.type, filters.date, filters.search]);

  return {
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    events,
    isLoading,
    error,
    refresh: fetchEvents,
    page,
    setPage,
    totalPages,
    hasNext,
    hasPrev,
    pageSize,
  };
};
