import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeSlotManager } from "@/components/admin/TimeSlotManager";
import { BookingsViewer } from "@/components/admin/BookingsViewer";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnexion",
      description: "À bientôt !",
    });
    navigate("/");
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-primary">
            Administration
          </h1>
          <Button onClick={handleLogout} variant="outline">
            Se déconnecter
          </Button>
        </div>

        <Tabs defaultValue="slots" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="slots">Gérer les créneaux</TabsTrigger>
            <TabsTrigger value="bookings">Voir les réservations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="slots" className="mt-6">
            <TimeSlotManager />
          </TabsContent>
          
          <TabsContent value="bookings" className="mt-6">
            <BookingsViewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
