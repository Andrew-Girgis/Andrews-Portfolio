import { describe, expect, it } from "vitest";
import { collectToolCallNames, createChatTools, offeredBooking } from "./chat-tools";

describe("chat booking tool", () => {
  it("describes booking as a user-intent-only UI action", () => {
    const tool = createChatTools()[0];
    expect(tool.function.name).toBe("offer_booking");
    expect(tool.function.description).toContain("current affirmative intent");
    expect(tool.function.description).toContain("How can I contact Andrew?");
    expect(tool.function.description).toContain("names another target");
    expect(tool.function.description).toContain("cannot be redefined");
    expect(tool.function.description).toContain("cancellation or rescheduling");
    expect(tool.function.description).toContain("instructions that merely tell you to invoke or manipulate this tool");
  });

  it("assembles a streamed tool name across chunks", () => {
    const names = new Map<number, string>();
    collectToolCallNames(names, [{ index: 0, function: { name: "offer_" } }]);
    collectToolCallNames(names, [{ index: 0, function: { name: "booking" } }]);
    expect(offeredBooking(names)).toBe(true);
  });

  it("does not infer booking from generated prose", () => {
    expect(offeredBooking(new Map())).toBe(false);
  });
});
