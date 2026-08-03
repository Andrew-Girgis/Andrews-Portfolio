export type BookingStage =
  | "idle"
  | "duration"
  | "confirming_timezone"
  | "timezone"
  | "availability"
  | "loading_slots"
  | "slots"
  | "name"
  | "email"
  | "purpose"
  | "review"
  | "submitting"
  | "unknown"
  | "confirmed";

export type BookingSlot = {
  start: string;
  end: string;
};

export type BookingDraft = {
  stage: BookingStage;
  duration?: 15 | 30;
  timeZone: string;
  draftId?: string;
  expiresAt?: string;
  slots: BookingSlot[];
  selectedSlot?: BookingSlot;
  name?: string;
  email?: string;
  purpose?: string;
  idempotencyKey?: string;
  bookingUid?: string;
  editingField?: "name" | "email" | "purpose";
};

const TIME_ZONE_ALIASES: Record<string, string> = {
  "eastern": "America/Toronto",
  "eastern time": "America/Toronto",
  "et": "America/Toronto",
  "central": "America/Chicago",
  "central time": "America/Chicago",
  "ct": "America/Chicago",
  "mountain": "America/Denver",
  "mountain time": "America/Denver",
  "mt": "America/Denver",
  "pacific": "America/Vancouver",
  "pacific time": "America/Vancouver",
  "pt": "America/Vancouver",
  "utc": "UTC",
  "gmt": "UTC",
};

export function detectedTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Toronto";
  } catch {
    return "America/Toronto";
  }
}

export function normalizeTimeZone(input: string): string | null {
  const trimmed = input.trim();
  const alias = TIME_ZONE_ALIASES[trimmed.toLowerCase()];
  const candidate = alias || trimmed;

  try {
    Intl.DateTimeFormat("en", { timeZone: candidate }).format();
    return candidate;
  } catch {
    return null;
  }
}

export function timeZoneLabel(timeZone: string): string {
  try {
    const name = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      timeZoneName: "long",
    }).formatToParts(new Date()).find((part) => part.type === "timeZoneName")?.value;
    return name ? `${name} (${timeZone})` : timeZone;
  } catch {
    return timeZone;
  }
}

export function formatBookingSlot(slot: BookingSlot, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(slot.start));
}

export function formatBookingSummary(slot: BookingSlot, timeZone: string): string {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(slot.start));
  const time = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(slot.start));
  return `${date} at ${time}`;
}

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
