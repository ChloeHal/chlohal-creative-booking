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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TimeSlotSelector } from "./TimeSlotSelector";

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  bringSupport: z.enum(["apporte", "fourni"], {
    required_error: "Veuillez choisir une option",
  }),
  supportType: z.string().optional(),
  location: z.enum(["chez_moi", "chez_participant"], {
    required_error: "Veuillez choisir un lieu",
  }),
  participantAddress: z.string().optional(),
  timeSlotId: z.string().min(1, "Veuillez sélectionner un créneau"),
}).refine(
  (data) => {
    if (data.location === "chez_participant" && !data.participantAddress) {
      return false;
    }
    return true;
  },
  {
    message: "L'adresse est requise si l'atelier a lieu chez vous",
    path: ["participantAddress"],
  }
);

export const LinogravureBookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bringSupport: undefined,
      supportType: "",
      location: undefined,
      participantAddress: "",
      timeSlotId: "",
    },
  });

  const watchLocation = form.watch("location");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("bookings_linogravure").insert({
        time_slot_id: values.timeSlotId,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        bring_support: values.bringSupport,
        support_type_detail: values.supportType || null,
        location: values.location,
        participant_address: values.participantAddress || null,
      });

      if (error) throw error;

      // Send notification email
      await supabase.functions.invoke("send-booking-notification", {
        body: {
          workshopType: "linogravure",
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
          name="bringSupport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Support textile</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apporte" id="apporte" />
                    <label htmlFor="apporte" className="cursor-pointer">
                      J'apporte mon propre support textile
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fourni" id="fourni" />
                    <label htmlFor="fourni" className="cursor-pointer">
                      Je souhaite que le support soit fourni
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
          name="supportType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de support souhaité (optionnel)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: tote bag, t-shirt, coussin..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Précisez le type de support textile que vous souhaitez utiliser
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu de l'atelier</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chez_moi" id="chez_moi" />
                    <label htmlFor="chez_moi" className="cursor-pointer">
                      Chez ChloHal
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="chez_participant"
                      id="chez_participant"
                    />
                    <label htmlFor="chez_participant" className="cursor-pointer">
                      À mon domicile
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchLocation === "chez_participant" && (
          <FormField
            control={form.control}
            name="participantAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre adresse complète</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Numéro, rue, code postal, ville..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="timeSlotId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choisir un créneau</FormLabel>
              <FormControl>
                <TimeSlotSelector
                  workshopType="linogravure"
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
