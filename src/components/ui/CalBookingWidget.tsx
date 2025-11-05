/**
 * Cal.com Booking Widget Component
 * 
 * A React component that embeds a Cal.com calendar for scheduling appointments.
 * Features:
 * - Automatic theme detection (light/dark mode)
 * - Responsive design
 * - Loading states with smooth transitions
 * - Error handling with fallback to direct Cal.com link
 * - Theme synchronization with document class changes
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <CalBookingWidget calLink="andrew-girgis/30min" />
 * 
 * // With custom layout
 * <CalBookingWidget 
 *   calLink="andrew-girgis/30min"
 *   layout="week_view"
 * />
 * 
 * // In chatbot context
 * {message.hasBookingWidget && (
 *   <CalBookingWidget calLink="andrew-girgis/30min" />
 * )}
 * ```
 * 
 * @requires Cal.com account with active event type
 * @see https://cal.com/docs for Cal.com API documentation
 */

import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";

interface CalBookingWidgetProps {
  /** Cal.com username and event type slug (e.g., "username/30min") */
  calLink?: string;
  /** Theme override - auto-detects from document if not provided */
  theme?: "light" | "dark";
  /** Calendar layout style */
  layout?: "month_view" | "week_view" | "column_view";
}

declare global {
  interface Window {
    Cal?: any;
  }
}

const CalBookingWidget = ({ 
  calLink = "andrew-girgis/30min",
  theme,
  layout = "month_view"
}: CalBookingWidgetProps) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    theme || (document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  );
  const widgetId = useRef(`cal-widget-${Date.now()}`);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      setCurrentTheme(newTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!widgetRef.current) return;

    // Use iframe embed for better reliability
    const embedUrl = `https://cal.com/${calLink}?embed=true&theme=${currentTheme}&layout=${layout}`;
    
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: inherit;
      position: absolute;
      top: 0;
      left: 0;
    `;
    iframe.frameBorder = '0';
    iframe.allow = 'payment';
    iframe.title = 'Book a meeting with Andrew';
    
    // Clear existing content
    widgetRef.current.innerHTML = '';
    widgetRef.current.appendChild(iframe);
    
    // Hide loading after iframe loads
    iframe.onload = () => {
      setTimeout(() => setIsLoading(false), 500);
    };
    
    iframe.onerror = () => {
      setError(true);
      setIsLoading(false);
    };

    console.log('✅ Cal.com iframe initialized:', embedUrl);

    // Cleanup function
    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, [calLink, layout, currentTheme]);

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto border border-border rounded-xl overflow-hidden bg-card shadow-lg">
        <div className="p-8 text-center space-y-4">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Calendar Unavailable</h3>
            <p className="text-sm text-muted-foreground">
              Unable to load the booking calendar.
            </p>
          </div>
          <a 
            href={`https://cal.com/${calLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            <Calendar className="h-4 w-4" />
            Open Calendar
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto my-4">
      <div 
        className="relative border border-border rounded-xl overflow-hidden bg-card shadow-lg"
        style={{ height: '600px' }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-10">
            <Calendar className="h-8 w-8 text-primary animate-pulse mb-3" />
            <p className="text-sm text-muted-foreground">Loading calendar...</p>
          </div>
        )}
        <div
          ref={widgetRef}
          id={widgetId.current}
          className="w-full h-full relative"
          style={{ 
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </div>
    </div>
  );
};

export default CalBookingWidget;
