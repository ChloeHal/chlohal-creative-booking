import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TimeSlotSelector } from "./TimeSlotSelector";

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  snackPreference: z.enum(["sucre", "sale"], {
    required_error: "Veuillez choisir une préférence",
  }),
  timeSlotId: z.string().min(1, "Veuillez sélectionner un créneau"),
});

export const CoutureBookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      snackPreference: undefined,
      timeSlotId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("bookings_couture").insert({
        time_slot_id: values.timeSlotId,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        snack_preference: values.snackPreference,
      });

      if (error) throw error;

      // Send notification email
      await supabase.functions.invoke("send-booking-notification", {
        body: {
          workshopType: "couture",
          bookingData: values,
        },
      });

      toast({
        title: "Réservation confirmée !",
        description: "Vous recevrez bientôt un email de confirmation.",
      });

      form.reset();
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="votre@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="snackPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Préférence pour l'en-cas</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sucre" id="sucre" />
                    <label htmlFor="sucre" className="cursor-pointer">
                      Sucré
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sale" id="sale" />
                    <label htmlFor="sale" className="cursor-pointer">
                      Salé
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeSlotId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choisir un créneau</FormLabel>
              <FormControl>
                <TimeSlotSelector
                  workshopType="couture"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Réserver"}
        </Button>
      </form>
    </Form>
  );
};
