import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";

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
                <span>3 heures</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Participants :</span>
                <span>1 à 3 personnes (on peut compter plus si vous apportez votre machine à coudre)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Niveau :</span>
                <span>Tous niveaux, débutants bienvenus</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Matériel :</span>
                <span>Tout le matériel de couture est fourni (machine à coudre, patrons, tissus, mercerie, ....)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Collation :</span>
                <span>Thé et café à volonté ainsi qu’une petite pause gourmande prévue : sucré ou salé, à décider ensemble à l’avance.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Lieu :</span>
                <span>Chez moi (quartier La Chasse à Etterbeek)
</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Tarif :</span>
                <span><ul>
                  <li>50€ pour 1 personne</li>
                  <li>60€ pour un groupe de 2 personnes</li>
                  <li>70€ pour un groupe de 3 personnes</li></ul></span>

              </li>
            </ul>
          </section>
        </div>

        <section className="flex justify-center">
          <Button 
            asChild 
            size="lg" 
            className="text-lg px-8 py-6"
          >
            <a 
              href="https://calendar.app.google/qXQQJ4ghfSfR6bG49" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Réserver votre atelier
            </a>
          </Button>
        </section>
          {/* Galerie de photos */}
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6 text-center">Galerie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             <img src="/couture1.jpg" alt="Couture 1" className="rounded-lg shadow-md object-cover w-full h-64" />
              <img src="/couture2.jpg" alt="Couture 2" className="rounded-lg shadow-md object-cover w-full h-64" />
              <img src="/couture3.jpg" alt="Couture 3" className="rounded-lg shadow-md object-cover w-full h-64" />
              <img src="/couture4.jpg" alt="Couture 4" className="rounded-lg shadow-md object-cover w-full h-64" /> 
              <img src="/couture5.jpg" alt="Couture 5" className="rounded-lg shadow-md object-cover w-full h-64" />
            </div>
          </section>
      </div>
    </div>
  );
};

export default Couture;
