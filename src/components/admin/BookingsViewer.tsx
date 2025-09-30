import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CoutureBooking {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  snack_preference: string;
  created_at: string;
  time_slot_id: string;
}

interface LinogravureBooking {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  bring_support: string;
  support_type_detail: string | null;
  location: string;
  participant_address: string | null;
  created_at: string;
  time_slot_id: string;
}

export const BookingsViewer = () => {
  const [coutureBookings, setCoutureBookings] = useState<CoutureBooking[]>([]);
  const [linogravureBookings, setLinogravureBookings] = useState<LinogravureBooking[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data: couture } = await supabase
      .from("bookings_couture")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: linogravure } = await supabase
      .from("bookings_linogravure")
      .select("*")
      .order("created_at", { ascending: false });

    setCoutureBookings(couture || []);
    setLinogravureBookings(linogravure || []);
  };

  return (
    <Tabs defaultValue="couture" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="couture">
          Couture ({coutureBookings.length})
        </TabsTrigger>
        <TabsTrigger value="linogravure">
          Linogravure ({linogravureBookings.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="couture" className="mt-6">
        <div className="space-y-4">
          {coutureBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Aucune réservation pour l'atelier couture
              </CardContent>
            </Card>
          ) : (
            coutureBookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">
                    {booking.first_name} {booking.last_name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Email:</span> {booking.email}
                  </p>
                  <p>
                    <span className="font-medium">Préférence en-cas:</span>{" "}
                    {booking.snack_preference === "sucre" ? "Sucré" : "Salé"}
                  </p>
                  <p>
                    <span className="font-medium">Réservé le:</span>{" "}
                    {format(new Date(booking.created_at), "PPP à HH:mm", {
                      locale: fr,
                    })}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="linogravure" className="mt-6">
        <div className="space-y-4">
          {linogravureBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Aucune réservation pour l'atelier linogravure
              </CardContent>
            </Card>
          ) : (
            linogravureBookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">
                    {booking.first_name} {booking.last_name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Email:</span> {booking.email}
                  </p>
                  <p>
                    <span className="font-medium">Support textile:</span>{" "}
                    {booking.bring_support === "apporte"
                      ? "Apporté par le participant"
                      : "Fourni"}
                  </p>
                  {booking.support_type_detail && (
                    <p>
                      <span className="font-medium">Type de support:</span>{" "}
                      {booking.support_type_detail}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Lieu:</span>{" "}
                    {booking.location === "chez_moi"
                      ? "Chez ChloHal"
                      : "Chez le participant"}
                  </p>
                  {booking.participant_address && (
                    <p>
                      <span className="font-medium">Adresse:</span>{" "}
                      {booking.participant_address}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Réservé le:</span>{" "}
                    {format(new Date(booking.created_at), "PPP à HH:mm", {
                      locale: fr,
                    })}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
