import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader2 } from "lucide-react";

interface TimeSlotSelectorProps {
  workshopType: "couture" | "linogravure";
  value: string;
  onChange: (value: string) => void;
}

interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export const TimeSlotSelector = ({
  workshopType,
  value,
  onChange,
}: TimeSlotSelectorProps) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimeSlots();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("time_slots_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "time_slots",
          filter: `workshop_type=eq.${workshopType}`,
        },
        () => {
          fetchTimeSlots();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workshopType]);

  const fetchTimeSlots = async () => {
    try {
      const { data, error } = await supabase
        .from("time_slots")
        .select("*")
        .eq("workshop_type", workshopType)
        .eq("is_available", true)
        .gte("start_time", new Date().toISOString())
        .order("start_time", { ascending: true });

      if (error) throw error;
      setSlots(data || []);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center p-6 bg-muted rounded-lg">
        <p className="text-muted-foreground">
          Aucun créneau disponible pour le moment. Veuillez vérifier plus tard.
        </p>
      </div>
    );
  }

  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
      {slots.map((slot) => (
        <div
          key={slot.id}
          className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
        >
          <RadioGroupItem value={slot.id} id={slot.id} />
          <label
            htmlFor={slot.id}
            className="flex-1 cursor-pointer font-medium"
          >
            {format(new Date(slot.start_time), "EEEE d MMMM yyyy", {
              locale: fr,
            })}{" "}
            -{" "}
            {format(new Date(slot.start_time), "HH:mm", { locale: fr })} à{" "}
            {format(new Date(slot.end_time), "HH:mm", { locale: fr })}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
};
