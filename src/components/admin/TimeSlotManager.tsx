import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Trash2, Plus } from "lucide-react";

interface TimeSlot {
  id: string;
  workshop_type: "couture" | "linogravure";
  start_time: string;
  end_time: string;
  max_participants: number;
  is_available: boolean;
}

export const TimeSlotManager = () => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [workshopType, setWorkshopType] = useState<"couture" | "linogravure">("couture");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    const { data, error } = await supabase
      .from("time_slots")
      .select("*")
      .order("start_time", { ascending: true });

    if (error) {
      console.error("Error fetching slots:", error);
      return;
    }

    setSlots(data || []);
  };

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = `${startDate}T${startTime}:00`;
    const endDateTime = `${startDate}T${endTime}:00`;

    const { error } = await supabase.from("time_slots").insert({
      workshop_type: workshopType,
      start_time: startDateTime,
      end_time: endDateTime,
      max_participants: parseInt(maxParticipants),
      is_available: true,
    });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le créneau",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Créneau ajouté",
      description: "Le créneau a été ajouté avec succès",
    });

    // Reset form
    setStartDate("");
    setStartTime("");
    setEndTime("");
    setMaxParticipants("");
    fetchSlots();
  };

  const handleDeleteSlot = async (id: string) => {
    const { error } = await supabase.from("time_slots").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le créneau",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Créneau supprimé",
      description: "Le créneau a été supprimé avec succès",
    });

    fetchSlots();
  };

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("time_slots")
      .update({ is_available: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la disponibilité",
        variant: "destructive",
      });
      return;
    }

    fetchSlots();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Ajouter un créneau
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddSlot} className="space-y-4">
            <div>
              <Label>Type d'atelier</Label>
              <RadioGroup
                value={workshopType}
                onValueChange={(value: "couture" | "linogravure") =>
                  setWorkshopType(value)
                }
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="couture" id="type-couture" />
                  <label htmlFor="type-couture" className="cursor-pointer">
                    Couture
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="linogravure" id="type-linogravure" />
                  <label htmlFor="type-linogravure" className="cursor-pointer">
                    Linogravure
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="maxParticipants">Participants max</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  min="1"
                  max={workshopType === "couture" ? 3 : 8}
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Heure de début</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="endTime">Heure de fin</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Ajouter le créneau
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Créneaux existants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {slots.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aucun créneau créé pour le moment
              </p>
            ) : (
              slots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">
                      {slot.workshop_type === "couture"
                        ? "Atelier Couture"
                        : "Atelier Linogravure"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(slot.start_time), "PPP", { locale: fr })}{" "}
                      - {format(new Date(slot.start_time), "HH:mm")} à{" "}
                      {format(new Date(slot.end_time), "HH:mm")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Max: {slot.max_participants} participant(s)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={slot.is_available ? "outline" : "default"}
                      size="sm"
                      onClick={() =>
                        handleToggleAvailability(slot.id, slot.is_available)
                      }
                    >
                      {slot.is_available ? "Disponible" : "Réservé"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteSlot(slot.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
