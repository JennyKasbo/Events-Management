export type EventStatus = "PENDING" | "APPROVED" | "REJECTED";

export type EventListTab = "upcoming" | "past";

export interface EventItem {
  id: string;
  name: string;
  type: string;
  date: string;
  capacity: number;
  registeredCount: number;
  description?: string;
  userStatus?: EventStatus;
}

export interface EventDetails extends EventItem {
  longDescription?: string;
}

export interface EventSubmission {
  id: string;
  name?: string;
  email: string;
  linkedinUrl?: string;
  educationLevel?: string;
  motivation?: string;
  status: EventStatus;
  submittedAt?: string;
}

export interface ApiRegistration {
  id: number;
  status: EventStatus;
  registered_at: string;
  linkedin_profile?: string;
  education_level?: string;
  motivation?: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

export interface RegisterPayload {
  linkedinProfile: string;
  educationLevel: string;
  motivation: string;
}

export interface RegistrationsResponse {
  message: string;
  attendees: ApiRegistration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface EventFilters {
  search: string;
  type: string;
  date: string;
}

export interface CreateEventPayload {
  name: string;
  type: string;
  date: string;
  capacity: number;
  description?: string;
}

export interface ApiEvent {
  id: number;
  name: string;
  description: string;
  max_attendees: number;
  event_date: string;
  event_type: string;
  registrationCount: number;
}

export interface ApiEventDetails {
  id: number;
  name: string;
  description: string;
  max_attendees: number;
  event_date: string;
  event_type: string;
  registrationCount: number;
}

export interface EventsListResponse {
  message: string;
  items: ApiEvent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface UserRegistrationsResponse {
  message: string;
  events: Array<{
    event: ApiEvent;
    registrationStatus: EventStatus;
    attendanceStatus: string;
  }>;
}
