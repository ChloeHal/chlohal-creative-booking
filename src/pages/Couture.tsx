import { Navigation } from "@/components/Navigation";
import { CoutureBookingForm } from "@/components/CoutureBookingForm";

const Couture = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
          Atelier Couture
        </h1>
        
        <div className="prose prose-lg max-w-none mb-12">
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">
              Description de l'atelier
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Plongez dans l'univers de la couture lors de cet atelier intimiste et convivial. 
              Que vous soyez débutant absolu ou que vous souhaitiez rafraîchir vos connaissances, 
              cet atelier est fait pour vous.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Au programme : découverte de la machine à coudre, apprentissage des points de base, 
              et réalisation d'un petit projet textile que vous emporterez avec vous. Tout le 
              matériel est fourni, vous n'avez qu'à venir avec votre bonne humeur et votre 
              créativité !
            </p>
            <p className="text-muted-foreground leading-relaxed">
              L'atelier se déroule dans une ambiance détendue, propice aux échanges et à 
              l'apprentissage. Vous repartirez avec les bases nécessaires pour continuer à 
              pratiquer chez vous.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">
              Informations pratiques
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Durée :</span>
                <span>2 à 3 heures</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Participants :</span>
                <span>1 à 3 personnes maximum</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Niveau :</span>
                <span>Tous niveaux, débutants bienvenus</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Matériel :</span>
                <span>Tout le matériel est fourni</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Lieu :</span>
                <span>Chez ChloHal</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Pause :</span>
                <span>En-cas sucré ou salé inclus</span>
              </li>
            </ul>
          </section>
        </div>

        <section>
          <h2 className="font-serif text-3xl font-bold text-primary mb-6">
            Réserver votre atelier
          </h2>
          <CoutureBookingForm />
        </section>
      </div>
    </div>
  );
};

export default Couture;
