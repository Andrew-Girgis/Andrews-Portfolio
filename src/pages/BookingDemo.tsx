import CalBookingWidget from "@/components/ui/CalBookingWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Demo page for Cal.com booking widget
 * This page demonstrates the standalone usage of the CalBookingWidget component
 */
const BookingDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Book a Meeting</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule a conversation with Andrew to discuss opportunities, collaborations, or just to connect.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">30 Minutes</CardTitle>
              <CardDescription>Quick introduction call</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Perfect for initial discussions and getting to know each other.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Video Call</CardTitle>
              <CardDescription>Google Meet or Zoom</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Link will be provided after booking confirmation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Flexible</CardTitle>
              <CardDescription>Your timezone</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Calendar automatically adjusts to your local time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Booking Widget */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select a Time</CardTitle>
            <CardDescription>
              Choose a convenient time slot from the calendar below
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CalBookingWidget 
              calLink="andrew-girgis/30min"
              layout="month_view"
            />
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            You'll receive a confirmation email with meeting details after booking.
          </p>
          <p className="mt-2">
            Need to reschedule? You can do so via the confirmation email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDemo;
