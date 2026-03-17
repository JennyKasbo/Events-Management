import api, { safeRequest } from "../../../Api/ApiConfig";
import type {
  ApiEvent,
  ApiEventDetails,
  CreateEventPayload,
  EventDetails,
  EventItem,
  EventsListResponse,
  EventSubmission,
  RegistrationsResponse,
  ApiRegistration,
  UserRegistrationsResponse,
  RegisterPayload,
} from "../types";

const adminEventsBase = "/events";
const userEventsBase = "/events";

const mapApiEvent = (event: ApiEvent): EventItem => {
  const parsedDate = new Date(event.event_date);
  const normalizedDate = Number.isNaN(parsedDate.getTime())
    ? ""
    : parsedDate.toISOString();
  return {
    id: String(event.id),
    name: event.name,
    type: event.event_type,
    date: normalizedDate,
    capacity: event.max_attendees,
    registeredCount: event.registrationCount ?? 0,
    description: event.description,
  };
};

export const getAllEvents = async (params: {
  page: number;
  limit: number;
  search?: string;
}): Promise<EventsListResponse> => {
  return await safeRequest<EventsListResponse>("GET", adminEventsBase, null, {
    params,
  });
};

export const getUpcomingEvents = async (params: {
  page: number;
  limit: number;
  search?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<EventsListResponse> => {
  return await safeRequest<EventsListResponse>("GET", `${userEventsBase}/upcoming`, null, {
    params,
  });
};

export const getPastSubmittedEvents = async (): Promise<UserRegistrationsResponse> => {
  return await safeRequest<UserRegistrationsResponse>("GET", `${userEventsBase}/attended`);
};

export const createEvent = async (
  payload: CreateEventPayload
): Promise<EventItem> => {
  const normalizedDate = payload.date.includes("T")
    ? payload.date
    : `${payload.date}T00:00:00Z`;
  const body = {
    name: payload.name,
    description: payload.description,
    max_attendees: payload.capacity,
    event_date: normalizedDate,
    event_type: payload.type.toUpperCase(),
  };
  const response = await safeRequest<{ message: string; event: ApiEvent }>(
    "POST",
    adminEventsBase,
    body
  );
  return mapApiEvent(response.event);
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.request({
    method: "DELETE",
    url: `${adminEventsBase}/${id}`,
    responseType: "text",
    transformResponse: [(data) => data],
  });
};

const mapRegistration = (registration: ApiRegistration): EventSubmission => {
  return {
    id: String(registration.id),
    email: registration.user?.email || "",
    linkedinUrl: registration.linkedin_profile,
    educationLevel: registration.education_level,
    motivation: registration.motivation,
    status: registration.status,
    submittedAt: registration.registered_at,
  };
};

export const getEventSubmissions = async (
  eventId: string,
  params?: { page?: number; limit?: number }
): Promise<RegistrationsResponse> => {
  return await safeRequest<RegistrationsResponse>(
    "GET",
    `/registrations/event/${eventId}`,
    null,
    { params }
  );
};

export const toggleStatus = async (
  submissionId: string
): Promise<EventSubmission> => {
  const response = await api.request({
    method: "PATCH",
    url: `/registrations/${submissionId}/approve`,
    responseType: "json",
    transformResponse: [(data) => (data ? JSON.parse(data) : {})],
  });
  const payload = response.data as { message: string; registration: ApiRegistration };
  return mapRegistration(payload.registration);
};

export const getEventDetails = async (
  eventId: string
): Promise<EventDetails> => {
  const response = await safeRequest<ApiEventDetails>("GET", `${userEventsBase}/${eventId}`);
  return mapApiEvent(response);
};

export const registerForEvent = async (
  eventId: string,
  payload: RegisterPayload
): Promise<void> => {
  const body = {
    ...(payload.linkedinProfile ? { linkedinProfile: payload.linkedinProfile } : {}),
    ...(payload.educationLevel ? { educationLevel: payload.educationLevel } : {}),
    ...(payload.motivation ? { motivation: payload.motivation } : {}),
  };
  await safeRequest<void>("POST", `/registrations/${eventId}`, body);
};

export const mapEventsListResponse = (response: EventsListResponse) => {
  return {
    items: response.items.map(mapApiEvent),
    totalPages: response.totalPages,
    hasNext: response.hasNext,
    hasPrev: response.hasPrev,
    page: response.page,
  };
};

export const mapRegistrationsResponse = (response: RegistrationsResponse) => {
  return {
    attendees: response.attendees.map(mapRegistration),
    totalPages: response.totalPages,
    hasNext: response.hasNext,
    hasPrev: response.hasPrev,
    page: response.page,
  };
};

export const mapUserRegistrationsResponse = (response: UserRegistrationsResponse) => {
  return response.events.map((entry) => {
    const mapped = mapApiEvent(entry.event);
    return {
      ...mapped,
      userStatus: entry.registrationStatus,
    };
  });
};
