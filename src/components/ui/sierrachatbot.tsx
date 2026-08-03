import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, ExternalLink, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookingDraft,
  BookingSlot,
  detectedTimeZone,
  formatBookingSlot,
  formatBookingSummary,
  isValidEmail,
  normalizeTimeZone,
  timeZoneLabel,
} from "@/lib/sierra-booking";

const sierraAvatarSrc = "/sierra/Sierra_AI_agent_new.png";
const sierraThinkingSrc = "/sierra/Sierra_AI_agent_thinking.png";

type HeroTypingWindow = Window & {
  __heroTypingComplete?: boolean;
};

const SIERRA_WAVE_STORAGE_KEY = "hasSeenSierraWave";
const API_BASE_URL = import.meta.env.DEV ? "http://localhost:8788/api" : "/api";
const CHAT_API_URL = `${API_BASE_URL}/chat`;
const SIERRA_WAVE_VIDEO_SRC = "/sierra-wave.webm";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  isStreaming?: boolean;
  sensitive?: boolean;
  bookingRelated?: boolean;
}

/**
 * Generate or retrieve a persistent anonymous user ID.
 * This ID persists across page refreshes and browser sessions.
 * @returns A stable UUID for this browser.
 */
function getOrCreateUserId(): string {
  const key = "sierra_user_id";

  if (typeof window === "undefined") {
    return "server-side-placeholder";
  }

  let userId = window.localStorage.getItem(key);
  if (userId) {
    return userId;
  }

  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    userId = window.crypto.randomUUID();
  } else {
    userId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  window.localStorage.setItem(key, userId);
  return userId;
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "server-side-placeholder";
  const key = "sierra_session_id";
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;
  const sessionId = `session_${window.crypto.randomUUID()}`;
  window.sessionStorage.setItem(key, sessionId);
  return sessionId;
}

function createMessage(content: string, isUser: boolean, sensitive = false): Message {
  return { id: window.crypto.randomUUID(), content, isUser, sensitive };
}

function extractPageContext() {
  return {
    currentPage: window.location.pathname,
    pageTitle: document.title,
  };
}

const SierraChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLauncherVideo, setShowLauncherVideo] = useState(false);
  const [sessionId] = useState(getOrCreateSessionId);
  const [booking, setBooking] = useState<BookingDraft>(() => ({
    stage: "idle",
    timeZone: "America/Toronto",
    slots: [],
  }));

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const launcherVideoRef = useRef<HTMLVideoElement>(null);
  const requestLockRef = useRef(false);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const supportsLauncherVideo = (() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return false;
      }

      const userAgent = window.navigator.userAgent;
      const isSafari =
        /^((?!chrome|android).)*safari/i.test(userAgent) &&
        !/CriOS|FxiOS|EdgiOS/.test(userAgent);
      if (isSafari) {
        return false;
      }

      const video = document.createElement("video");
      return video.canPlayType('video/webm; codecs="vp9"') !== "";
    })();

    if (!supportsLauncherVideo) {
      return;
    }

    const navigationEntry = window.performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    const isReload = navigationEntry?.type === "reload";
    const hasSeenWave =
      sessionStorage.getItem(SIERRA_WAVE_STORAGE_KEY) === "true";

    if (!hasSeenWave || isReload) {
      setShowLauncherVideo(true);
    }
  }, []);

  useEffect(() => {
    if (!showLauncherVideo) return;

    const video = launcherVideoRef.current;
    if (!video) return;

    video.currentTime = 0;
    void video.play().catch(() => {
      sessionStorage.setItem(SIERRA_WAVE_STORAGE_KEY, "true");
      setShowLauncherVideo(false);
    });
  }, [showLauncherVideo]);

  // Show welcome popup after the hero typing finishes, with a fallback for non-hero pages.
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
    const heroWindow = window as HeroTypingWindow;

    if (hasSeenWelcome) {
      return;
    }

    const openWelcome = () => {
      setShowWelcome(true);
    };

    const handleHeroTypingComplete = () => {
      clearTimeout(fallbackTimer);
      heroWindow.__heroTypingComplete = true;
      openWelcome();
    };

    if (heroWindow.__heroTypingComplete) {
      openWelcome();
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      openWelcome();
    }, 15000);

    window.addEventListener("hero-typing-complete", handleHeroTypingComplete);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener(
        "hero-typing-complete",
        handleHeroTypingComplete,
      );
    };
  }, []);

  // Auto-dismiss welcome popup after 10 seconds
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        sessionStorage.setItem("hasSeenWelcome", "true");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const dismissWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem("hasSeenWelcome", "true");
  };

  const openChatFromWelcome = () => {
    dismissWelcome();
    setIsOpen(true);
  };

  const finishLauncherVideo = () => {
    sessionStorage.setItem(SIERRA_WAVE_STORAGE_KEY, "true");
    const video = launcherVideoRef.current;
    if (video) {
      video.pause();
    }
    setShowLauncherVideo(false);
  };

  const fallbackToStaticLauncher = () => {
    sessionStorage.setItem(SIERRA_WAVE_STORAGE_KEY, "true");
    setShowLauncherVideo(false);
  };

  const renderMessageText = (text: string) => text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (!/^https?:\/\//.test(part)) return <span key={index}>{part}</span>;
    const cleanUrl = part.replace(/[.,;!?]+$/, "");
    const trailing = part.slice(cleanUrl.length);
    return (
      <span key={index}>
        <a href={cleanUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
          {cleanUrl}
        </a>
        {trailing}
      </span>
    );
  });

  const appendUser = (content: string, sensitive = false) => {
    setMessages((prev) => [...prev, createMessage(content, true, sensitive)]);
  };

  const appendAssistant = (content: string) => {
    setMessages((prev) => [...prev, createMessage(content, false)]);
  };

  const appendBookingUser = (content: string, sensitive = false) => {
    const message = createMessage(content, true, sensitive);
    message.bookingRelated = true;
    setMessages((prev) => [...prev, message]);
  };

  const appendBookingAssistant = (content: string, sensitive = false) => {
    const message = createMessage(content, false, sensitive);
    message.bookingRelated = true;
    setMessages((prev) => [...prev, message]);
  };

  const cleanAssistantText = (text: string) => text.replace(/\[BOOK_MEETING\]/gi, "").trim();

  const readApiError = async (response: Response, fallback: string) => {
    try {
      const body = await response.json() as { error?: string };
      return body.error || fallback;
    } catch {
      return fallback;
    }
  };

  const beginBooking = () => {
    if (booking.stage !== "idle" && booking.stage !== "confirmed") return;
    setBooking({ stage: "duration", timeZone: detectedTimeZone(), slots: [] });
    appendBookingAssistant("How long would you like to meet with Andrew?");
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || requestLockRef.current) return;
    requestLockRef.current = true;

    const fallbackHistory = messages
      .filter((item) => !item.sensitive && !item.bookingRelated && !item.isStreaming && item.content.trim())
      .slice(-20)
      .map((item) => ({
        role: item.isUser ? "user" : "assistant",
        content: item.content,
      }));
    const assistantMessage = createMessage("", false);
    assistantMessage.isStreaming = true;

    appendUser(message);
    setMessages((prev) => [...prev, assistantMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const pageContext = extractPageContext();
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sendMessage",
          user_id: getOrCreateUserId(),
          sessionId,
          chatInput: message,
          currentPage: pageContext.currentPage,
          pageTitle: pageContext.pageTitle,
          history: fallbackHistory,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(await readApiError(response, "I'm having trouble connecting right now. Please try again later."));
      }

      let fullResponse = "";
      let bookingIntent = false;
      let receivedDone = false;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6).trim()) as {
              type: string;
              content?: string;
              bookingIntent?: boolean;
              error?: string;
            };
            if (event.type === "token" && event.content) {
              fullResponse += event.content;
              const visibleResponse = cleanAssistantText(fullResponse);
              setMessages((prev) => prev.map((item) => item.id === assistantMessage.id
                ? { ...item, content: visibleResponse, isStreaming: true }
                : item));
            } else if (event.type === "done") {
              bookingIntent = Boolean(event.bookingIntent);
              receivedDone = true;
            } else if (event.type === "error") {
              throw new Error(event.error || "I'm sorry, something went wrong. Please try again.");
            }
          } catch (error) {
            if (error instanceof SyntaxError) continue;
            throw error;
          }
        }
      }

      if (!receivedDone) throw new Error("The response ended early. Please try again.");

      setMessages((prev) => prev.map((item) => item.id === assistantMessage.id
        ? { ...item, content: cleanAssistantText(fullResponse), isStreaming: false }
        : item));
      if (bookingIntent) beginBooking();
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "I'm having trouble connecting right now. Please try again later.";
      setMessages((prev) => prev.map((item) => item.id === assistantMessage.id
        ? { ...item, content: errorMessage, isStreaming: false }
        : item));
    } finally {
      requestLockRef.current = false;
      setIsTyping(false);
    }
  };

  const chooseDuration = (duration: 15 | 30) => {
    appendBookingUser(`${duration} minutes`);
    const timeZone = detectedTimeZone();
    setBooking((current) => ({ ...current, duration, timeZone, stage: "confirming_timezone" }));
    appendBookingAssistant(`It looks like your timezone is ${timeZoneLabel(timeZone)}. Should I use that?`);
  };

  const acceptTimeZone = (timeZone: string) => {
    appendBookingUser(`Use ${timeZone}`);
    setBooking((current) => ({ ...current, timeZone, stage: "availability" }));
    appendBookingAssistant("When would you prefer to meet? Choose an option or describe the days and times that work for you.");
  };

  const requestDifferentTimeZone = () => {
    appendBookingUser("Change timezone");
    setBooking((current) => ({ ...current, stage: "timezone" }));
    appendBookingAssistant("Which timezone should I use? You can say something like Pacific Time or America/Vancouver.");
  };

  const searchAvailability = async (
    label: string,
    preference: { preset?: string; text?: string },
  ) => {
    if (requestLockRef.current) return;
    requestLockRef.current = true;
    appendBookingUser(label);
    setBooking((current) => ({ ...current, stage: "loading_slots", slots: [] }));
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/booking/drafts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          userId: getOrCreateUserId(),
          timeZone: booking.timeZone,
          duration: booking.duration,
          preference,
        }),
      });
      if (!response.ok) throw new Error(await readApiError(response, "I couldn't load Andrew's availability."));
      const result = await response.json() as {
        draftId: string;
        expiresAt: string;
        slots: BookingSlot[];
      };

      if (!result.slots.length) {
        setBooking((current) => ({ ...current, draftId: result.draftId, expiresAt: result.expiresAt, stage: "availability" }));
        appendBookingAssistant("I couldn't find an opening in that range. Try another day or a broader time window.");
        return;
      }

      setBooking((current) => ({
        ...current,
        draftId: result.draftId,
        expiresAt: result.expiresAt,
        slots: result.slots,
        stage: "slots",
      }));
      appendBookingAssistant(`Here are Andrew's available times in ${timeZoneLabel(booking.timeZone)}.`);
    } catch (error) {
      setBooking((current) => ({ ...current, stage: "availability" }));
      appendBookingAssistant(error instanceof Error ? error.message : "I couldn't load Andrew's availability.");
    } finally {
      requestLockRef.current = false;
      setIsTyping(false);
    }
  };

  const selectSlot = async (slot: BookingSlot) => {
    if (!booking.draftId || requestLockRef.current) return;
    requestLockRef.current = true;
    appendBookingUser(formatBookingSlot(slot, booking.timeZone));
    setIsTyping(true);
    try {
      const response = await fetch(`${API_BASE_URL}/booking/drafts/${booking.draftId}/slot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, userId: getOrCreateUserId(), start: slot.start }),
      });
      if (!response.ok) throw new Error(await readApiError(response, "That time is no longer available."));
      setBooking((current) => ({ ...current, selectedSlot: slot, stage: "name" }));
      appendBookingAssistant("Great choice. What's your name?");
    } catch (error) {
      appendBookingAssistant(error instanceof Error ? error.message : "That time is no longer available.");
      setBooking((current) => ({ ...current, stage: "availability" }));
    } finally {
      requestLockRef.current = false;
      setIsTyping(false);
    }
  };

  const showReview = (purpose?: string) => {
    setBooking((current) => ({ ...current, purpose, editingField: undefined, stage: "review", idempotencyKey: crypto.randomUUID() }));
    appendBookingAssistant("Please review the details below. I won't book anything until you confirm.");
  };

  const confirmBooking = async () => {
    if (!booking.draftId || !booking.selectedSlot || !booking.name || !booking.email || !booking.idempotencyKey || requestLockRef.current) return;
    requestLockRef.current = true;
    setBooking((current) => ({ ...current, stage: "submitting" }));
    setIsTyping(true);
    try {
      const response = await fetch(`${API_BASE_URL}/booking/drafts/${booking.draftId}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          userId: getOrCreateUserId(),
          idempotencyKey: booking.idempotencyKey,
          attendee: { name: booking.name, email: booking.email, timeZone: booking.timeZone },
          purpose: booking.purpose,
        }),
      });
      if (!response.ok) throw new Error(await readApiError(response, "I couldn't confirm the booking."));
      const result = await response.json() as { booking: { uid: string } };
      setBooking((current) => ({
        ...current,
        stage: "confirmed",
        bookingUid: result.booking.uid,
        name: undefined,
        email: undefined,
        purpose: undefined,
      }));
      appendBookingAssistant(`You're booked for ${formatBookingSummary(booking.selectedSlot, booking.timeZone)}. Cal.com will send the invitation to your email.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "I couldn't confirm the booking.";
      const outcomeUnknown = /may have completed|already being processed|check your email/i.test(message);
      setBooking((current) => ({ ...current, stage: outcomeUnknown ? "unknown" : "review" }));
      appendBookingAssistant(message);
    } finally {
      requestLockRef.current = false;
      setIsTyping(false);
    }
  };

  const cancelBookingFlow = async () => {
    if (requestLockRef.current) return;
    requestLockRef.current = true;
    if (booking.draftId) {
      await fetch(`${API_BASE_URL}/booking/drafts/${booking.draftId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, userId: getOrCreateUserId() }),
      }).catch(() => undefined);
    }
    requestLockRef.current = false;
    setBooking({ stage: "idle", timeZone: detectedTimeZone(), slots: [] });
    appendBookingAssistant("No problem. I cancelled the booking setup. What else can I help with?");
  };

  const handleBookingInput = async (value: string) => {
    const message = value.trim();
    setInputValue("");

    if (/^(cancel|stop|never mind|nevermind)$/i.test(message)) {
      appendBookingUser(message);
      await cancelBookingFlow();
      return;
    }

    if (booking.stage === "duration") {
      const duration = message.match(/\b(15|30)\b/)?.[1];
      if (duration === "15" || duration === "30") chooseDuration(Number(duration) as 15 | 30);
      else appendBookingAssistant("Please choose either 15 or 30 minutes.");
      return;
    }
    if (booking.stage === "confirming_timezone" || booking.stage === "timezone") {
      if (booking.stage === "confirming_timezone" && /^(yes|yep|correct|use it)$/i.test(message)) {
        acceptTimeZone(booking.timeZone);
        return;
      }
      const timeZone = normalizeTimeZone(message);
      appendBookingUser(message);
      if (!timeZone) {
        appendBookingAssistant("I couldn't recognize that timezone. Try an IANA timezone such as America/Toronto.");
        return;
      }
      setBooking((current) => ({ ...current, timeZone, stage: "availability" }));
      appendBookingAssistant("When would you prefer to meet? Choose an option or describe the days and times that work for you.");
      return;
    }
    if (booking.stage === "availability" || booking.stage === "slots") {
      await searchAvailability(message, { text: message });
      return;
    }
    if (booking.stage === "name") {
      appendBookingUser(message, true);
      if (message.length < 2 || message.length > 100) {
        appendBookingAssistant("Please enter the name you'd like on the invitation.");
        return;
      }
      if (booking.editingField === "name") {
        setBooking((current) => ({ ...current, name: message, editingField: undefined, stage: "review" }));
        appendBookingAssistant("I've updated the name. Please review the booking again.");
      } else {
        setBooking((current) => ({ ...current, name: message, stage: "email" }));
        appendBookingAssistant("Thanks. What email address should receive the invitation?");
      }
      return;
    }
    if (booking.stage === "email") {
      appendBookingUser(message, true);
      if (!isValidEmail(message)) {
        appendBookingAssistant("That email doesn't look complete. Could you check it and send it again?");
        return;
      }
      if (booking.editingField === "email") {
        setBooking((current) => ({ ...current, email: message.trim(), editingField: undefined, stage: "review" }));
        appendBookingAssistant("I've updated the email. Please review the booking again.");
      } else {
        setBooking((current) => ({ ...current, email: message.trim(), stage: "purpose" }));
        appendBookingAssistant("Is there anything you'd like Andrew to know before the meeting? You can also skip this.");
      }
      return;
    }
    if (booking.stage === "purpose") {
      appendBookingUser(message, true);
      if (message.length > 500) {
        appendBookingAssistant("Please keep the meeting purpose under 500 characters.");
        return;
      }
      showReview(message);
      return;
    }
    if (booking.stage === "review" && /^(confirm|yes|book it)$/i.test(message)) {
      appendBookingUser(message);
      await confirmBooking();
      return;
    }

    appendBookingAssistant("Please use one of the booking options below, or cancel the booking setup to return to chat.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    if (booking.stage === "idle" || booking.stage === "confirmed") await sendMessage(inputValue);
    else await handleBookingInput(inputValue);
  };

  const bookingButtonClass = "h-auto min-h-9 whitespace-normal px-3 py-2 text-left text-xs";

  const renderBookingControls = () => {
    if (booking.stage === "duration") {
      return (
        <div className="ml-11 grid grid-cols-2 gap-2" aria-label="Choose meeting duration">
          <Button variant="outline" className={bookingButtonClass} onClick={() => chooseDuration(15)}>
            <Clock className="h-3.5 w-3.5" /> 15 minutes
          </Button>
          <Button variant="outline" className={bookingButtonClass} onClick={() => chooseDuration(30)}>
            <Clock className="h-3.5 w-3.5" /> 30 minutes
          </Button>
        </div>
      );
    }

    if (booking.stage === "confirming_timezone") {
      return (
        <div className="ml-11 grid gap-2">
          <Button variant="outline" className={bookingButtonClass} onClick={() => acceptTimeZone(booking.timeZone)}>
            Use {timeZoneLabel(booking.timeZone)}
          </Button>
          <Button variant="ghost" className={bookingButtonClass} onClick={requestDifferentTimeZone}>
            Change timezone
          </Button>
        </div>
      );
    }

    if (booking.stage === "availability") {
      return (
        <div className="ml-11 grid grid-cols-2 gap-2" aria-label="Choose preferred availability">
          <Button variant="outline" className={bookingButtonClass} onClick={() => void searchAvailability("This week", { preset: "this_week" })}>This week</Button>
          <Button variant="outline" className={bookingButtonClass} onClick={() => void searchAvailability("Next week", { preset: "next_week" })}>Next week</Button>
          <Button variant="outline" className={bookingButtonClass} onClick={() => void searchAvailability("Mornings", { preset: "morning" })}>Mornings</Button>
          <Button variant="outline" className={bookingButtonClass} onClick={() => void searchAvailability("Afternoons", { preset: "afternoon" })}>Afternoons</Button>
        </div>
      );
    }

    if (booking.stage === "slots") {
      return (
        <div className="ml-11 grid gap-2" aria-label="Available meeting times">
          {booking.slots.map((slot) => (
            <Button
              key={slot.start}
              variant="outline"
              className={`justify-start ${bookingButtonClass}`}
              onClick={() => void selectSlot(slot)}
            >
              <Calendar className="h-3.5 w-3.5" />
              {formatBookingSlot(slot, booking.timeZone)}
            </Button>
          ))}
          <Button
            variant="ghost"
            className={bookingButtonClass}
            onClick={() => {
              setBooking((current) => ({ ...current, stage: "availability" }));
              appendBookingAssistant("What other days or times should I check?");
            }}
          >
            Try different dates
          </Button>
        </div>
      );
    }

    if (booking.stage === "purpose") {
      return (
        <div className="ml-11">
          <Button
            variant="outline"
            className={bookingButtonClass}
            onClick={() => {
              appendBookingUser("Skip");
              showReview();
            }}
          >
            Skip
          </Button>
        </div>
      );
    }

    if (booking.stage === "review" && booking.selectedSlot) {
      return (
        <div className="ml-11 space-y-3 rounded-lg border border-border bg-card p-3 text-xs">
          <div className="space-y-1">
            <p className="font-semibold text-foreground">Meeting with Andrew</p>
            <p>{booking.duration} minutes</p>
            <p>{formatBookingSummary(booking.selectedSlot, booking.timeZone)}</p>
            <p>{booking.name}</p>
            <p>{booking.email}</p>
            <p>{booking.purpose || "No meeting purpose provided"}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" onClick={() => void confirmBooking()}>Confirm booking</Button>
            <Button size="sm" variant="outline" onClick={() => {
              setBooking((current) => ({ ...current, stage: "availability" }));
              appendBookingAssistant("What other days or times should I check?");
            }}>Change time</Button>
            <Button size="sm" variant="ghost" onClick={() => {
              setBooking((current) => ({ ...current, editingField: "name", stage: "name" }));
              appendBookingAssistant("What name should I use instead?");
            }}>Edit name</Button>
            <Button size="sm" variant="ghost" onClick={() => {
              setBooking((current) => ({ ...current, editingField: "email", stage: "email" }));
              appendBookingAssistant("What email address should I use instead?");
            }}>Edit email</Button>
            <Button size="sm" variant="ghost" onClick={() => {
              setBooking((current) => ({ ...current, editingField: "purpose", stage: "purpose" }));
              appendBookingAssistant("What would you like Andrew to know?");
            }}>Edit purpose</Button>
            <Button size="sm" variant="ghost" onClick={() => void cancelBookingFlow()}>Cancel</Button>
          </div>
        </div>
      );
    }

    if (booking.stage === "confirmed") {
      return (
        <div className="ml-11 grid gap-2">
          <Button variant="outline" className={bookingButtonClass} asChild>
            <a href="https://cal.com/andrew-girgis/1on1" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" /> Open Cal.com
            </a>
          </Button>
          <Button variant="ghost" className={bookingButtonClass} onClick={() => {
            setBooking({ stage: "duration", timeZone: detectedTimeZone(), slots: [] });
            appendBookingAssistant("How long would you like to meet with Andrew?");
          }}>Book another meeting</Button>
        </div>
      );
    }

    if (booking.stage === "unknown") {
      return (
        <div className="ml-11 space-y-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs">
          <p>Cal.com may have received the booking. Check your email before trying again to avoid a duplicate.</p>
          <Button variant="outline" className={bookingButtonClass} asChild>
            <a href="https://cal.com/andrew-girgis/1on1" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" /> Open Cal.com
            </a>
          </Button>
        </div>
      );
    }

    return null;
  };

  const inputPlaceholder = booking.stage === "idle" || booking.stage === "confirmed"
    ? "Type your message..."
    : booking.stage === "name"
      ? "Enter your name..."
      : booking.stage === "email"
        ? "Enter your email..."
        : booking.stage === "purpose"
          ? "What should Andrew know?"
          : "Type an answer or choose below...";

  return (
    <>
      {/* Welcome Popup */}
      {showWelcome && !isOpen && (
        <div
          onClick={openChatFromWelcome}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") openChatFromWelcome();
          }}
          role="button"
          tabIndex={0}
          className="fixed bottom-24 right-4 sm:right-6 z-[10000] w-[90vw] sm:w-[420px] bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 rounded-xl shadow-2xl border border-primary cursor-pointer hover:shadow-primary/30 transition-all hover:-translate-y-1 animate-in slide-in-from-bottom-5 duration-500"
        >
          <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-primary bg-gray-800" />
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <img
                loading="eager"
                src={sierraAvatarSrc}
                alt="Sierra"
                className="w-10 h-10 rounded-full flex-shrink-0 object-contain scale-90"
              />
              <div className="flex-1">
                <div className="font-bold text-sm mb-0.5">Sierra</div>
                <div className="text-sm text-gray-200">
                  Hey! I'm Sierra, Andrew's AI chatbot. Let me know if you have
                  any questions about Andrew.
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0 hover:bg-white/10"
              aria-label="Dismiss Sierra welcome"
              onClick={(e) => {
                e.stopPropagation();
                dismissWelcome();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat with Sierra"
          className="fixed bottom-20 right-4 z-50 flex h-[min(500px,calc(100dvh-6rem))] w-[90vw] flex-col overflow-hidden rounded-lg border border-border bg-background shadow-2xl animate-in slide-in-from-bottom-5 duration-300 sm:bottom-24 sm:right-6 sm:w-96"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <img
                loading="lazy"
                src={sierraAvatarSrc}
                alt="Sierra"
                className="w-10 h-10 rounded-full object-contain scale-90"
              />
              <h3 className="font-semibold text-foreground">
                Chat with Sierra
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
              aria-label="Close Sierra chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div
            ref={chatMessagesRef}
            aria-live="polite"
            className="flex-1 p-4 overflow-y-auto space-y-4"
          >
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm mt-8">
                <p className="mb-4">
                  👋 Hi! I'm Sierra, Andrew's AI assistant.
                </p>
                <p>
                  Ask me anything about Andrew's experience, projects, or
                  skills!
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  {!message.isUser && (
                    <img
                      loading="lazy"
                      src={
                        message.isStreaming
                          ? sierraThinkingSrc
                          : sierraAvatarSrc
                      }
                      alt="Sierra"
                      className="w-10 h-10 rounded-full flex-shrink-0 object-contain scale-90"
                    />
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.isUser ? (
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    ) : <div className="whitespace-pre-wrap text-sm">{renderMessageText(message.content)}</div>}
                    {!message.isUser && message.isStreaming && (
                      <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {renderBookingControls()}

            {booking.stage !== "idle" && booking.stage !== "confirmed" && booking.stage !== "unknown" && booking.stage !== "review" && (
              <div className="ml-11 flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isTyping}
                  onClick={() => void cancelBookingFlow()}
                >
                  Cancel booking
                </Button>
                <Button variant="link" size="sm" asChild>
                  <a href="https://cal.com/andrew-girgis/1on1" target="_blank" rel="noopener noreferrer">
                    Open calendar instead
                  </a>
                </Button>
              </div>
            )}

            {isTyping && !messages.at(-1)?.isStreaming && (
              <div className="flex gap-3">
                <img
                  loading="lazy"
                  src={sierraThinkingSrc}
                  alt="Sierra thinking"
                  className="w-12 h-12 rounded-full flex-shrink-0 object-contain scale-90"
                />
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputPlaceholder}
                aria-label="Message Sierra"
                disabled={isTyping || booking.stage === "loading_slots" || booking.stage === "submitting" || booking.stage === "unknown"}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping || booking.stage === "loading_slots" || booking.stage === "submitting" || booking.stage === "unknown"}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        aria-label={isOpen ? "Close Sierra chat" : "Open Sierra chat"}
        variant="ghost"
        className={`fixed z-[9999] h-auto w-auto rounded-none border-0 bg-transparent p-0 shadow-none hover:bg-transparent ${showLauncherVideo ? "bottom-[-32px] right-[-100px] sm:right-2" : "bottom-4 right-20 sm:right-12"}`}
        size="icon"
      >
        {showLauncherVideo ? (
          <video
            ref={launcherVideoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={finishLauncherVideo}
            onError={fallbackToStaticLauncher}
            className="block h-40 w-auto object-contain"
            aria-label="Sierra waving"
          >
            <source src={SIERRA_WAVE_VIDEO_SRC} type="video/webm" />
          </video>
        ) : (
          <img
            loading="eager"
            src={sierraAvatarSrc}
            alt="Sierra"
            className="block h-16 w-auto object-contain"
            aria-hidden="true"
          />
        )}
      </Button>
    </>
  );
};

export default SierraChatbot;
