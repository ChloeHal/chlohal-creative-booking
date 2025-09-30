import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Scissors, Palette } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary mb-6">
            Bienvenue chez ChloHal
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
Hello, j'ai 27 ans et une passion dévorante pour tout ce qui touche au créatif et à ce que je peux faire de mes dix doigts. Ce que j'aime encore plus, c'est de transmettre ma passion et de rendre quelque chose perçu d'inaccessible à la portée de tous.            
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
            A votre service
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Je vous propose des ateliers de couture et de linogravure, entre potes, où chaque groupe bénéficie d'une activité sur mesure. 
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Chaque atelier est un moment unique où vous apprendrez les techniques fondamentales tout en créant votre propre projet.             
            Que vous soyez débutant ou que vous souhaitiez perfectionner vos compétences, vous trouverez ici un espace pour créer, vous amuser, découvrir des passions et vous créer des souvenirs.

          </p>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Mes Ateliers
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Couture Workshop */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-primary/20">
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <Scissors className="w-20 h-20 text-primary" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                  Atelier Couture
                </h3>
                <p className="text-muted-foreground mb-4">
                  Découvrez les bases de la couture et créez votre premier projet textile. 
                  En petit comité (1 à 3 personnes), apprenez les points essentiels et 
                  repartez avec votre création unique.
                </p>
                <div className="flex gap-2 mb-4 text-sm text-muted-foreground">
                  <span className="font-medium">Durée :</span>
                  <span>3 heures</span>
                </div>
                <Link to="/couture">
                  <Button className="w-full">
                    Découvrir et réserver
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Linogravure Workshop */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-primary/20">
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <Palette className="w-20 h-20 text-primary" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                  Atelier Linogravure
                </h3>
                <p className="text-muted-foreground mb-4">
                  Explorez la linogravure. Créez une fresque grâce aux motifs 
                  que vous aurez imaginés et créés. Un atelier convivial pour 1 à 8 personnes, 
                  chez moi ou chez vous.
                </p>
                <div className="flex gap-2 mb-4 text-sm text-muted-foreground">
                  <span className="font-medium">Durée :</span>
                  <span>3 heures</span>
                </div>
                <Link to="/linogravure">
                  <Button className="w-full">
                    Découvrir et réserver
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 ChloHal - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
