import { afterEach, describe, expect, it, vi } from "vitest";
import { createCalBooking, getCalSlots } from "./cal";
import { Env } from "./types";

const env = {
  CAL_USERNAME: "andrew-girgis",
  CAL_EVENT_TYPE_SLUG: "1on1",
} as Env;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Cal.com client", () => {
  it("uses the documented slot contract and normalizes slot timestamps", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: "success",
      data: {
        "2026-08-03": [{
          start: "2026-08-03T19:00:00.000-04:00",
          end: "2026-08-03T19:30:00.000-04:00",
        }],
      },
    }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const slots = await getCalSlots(env, {
      start: "2026-08-03",
      end: "2026-08-04",
      duration: 30,
      timeZone: "America/Toronto",
    });

    expect(slots).toEqual([{
      start: "2026-08-03T23:00:00.000Z",
      end: "2026-08-03T23:30:00.000Z",
    }]);
    const [url, options] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("eventTypeSlug=1on1");
    expect(String(url)).toContain("duration=30");
    expect(new Headers(options.headers).get("cal-api-version")).toBe("2024-09-04");
  });

  it("sends duration and optional purpose without exposing a required API key", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: "success",
      data: {
        uid: "booking-123",
        status: "accepted",
        start: "2026-08-03T23:00:00.000Z",
        end: "2026-08-03T23:30:00.000Z",
        duration: 30,
      },
    }), { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    await createCalBooking(env, {
      draftId: "draft-123",
      start: "2026-08-03T23:00:00.000Z",
      duration: 30,
      attendee: { name: "Test User", email: "test@example.com", timeZone: "America/Toronto" },
      purpose: "Portfolio discussion",
    });

    const [, options] = fetchMock.mock.calls[0];
    const headers = new Headers(options.headers);
    const body = JSON.parse(String(options.body));
    expect(headers.get("Authorization")).toBeNull();
    expect(headers.get("cal-api-version")).toBe("2026-02-25");
    expect(body.lengthInMinutes).toBe(30);
    expect(body.bookingFieldsResponses).toEqual({ notes: "Portfolio discussion" });
    expect(body.metadata).toEqual({ source: "sierra", draftId: "draft-123", meetingPurpose: "Portfolio discussion" });
  });
});
