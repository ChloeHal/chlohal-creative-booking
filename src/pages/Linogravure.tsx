import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const Linogravure = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
          Atelier Linogravure
        </h1>
        
        <div className="prose prose-lg max-w-none mb-12">
         <section className="mb-8">
  <h2 className="font-serif text-2xl font-bold text-primary mb-4">
    Description de l'atelier
  </h2>
  
  <h3 className="font-serif text-2xl font-bold text-primary mb-3">Le principe :</h3>
  <p className="text-muted-foreground leading-relaxed mb-4">
    Cet atelier vous initie aux techniques basiques de la couture à travers un apprentissage progressif et bienveillant. Entre potes (1 à 3 personnes), vous découvrirez les gestes essentiels pour réaliser votre premier projet couture, de la préparation du tissu jusqu'aux finitions. Chaque participant repart avec sa création personnalisée et les bases solides pour continuer à coudre en autonomie.
  </p>
  
  <h3 className="font-serif text-2xl font-bold text-primary mb-3">Le déroulé :</h3>
  <p className="text-muted-foreground leading-relaxed mb-4">
    <ul>
      <li>Introduction aux outils et au matériel de couture (tissus, machine, aiguilles, fils, ciseaux...)</li>
      <li>Apprentissage des points de base et manipulation de la machine à coudre</li>
      <li>Choix de votre projet personnel et sélection des tissus dans vos couleurs préférées</li>
      <li>Réalisation guidée étape par étape : découpe, assemblage, couture et finitions</li>
      <li>Pause conviviale autour d'un en-cas sucré ou salé</li>
      <li>Repartez avec votre création terminée !</li>
    </ul>
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
                <span>1 à 8 personnes</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Niveau :</span>
                <span>Tous niveaux, débutants bienvenus</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Matériel :</span>
                <span>Tout le matériel de linogravure est fourni (plaque, gouges, encre)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Collation :</span>
                <span>Thé et café à volonté ainsi qu’une petite pause gourmande prévue : sucré ou salé, à décider ensemble à l’avance.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Support textile :</span>
                <span>Tote bag, coussin, tee-shirt, ex libris ... (à choisir à l’avance).<br />
Vous pouvez aussi apporter un textile de seconde main (lavé).<br />
J’ai simplement besoin d’être briefée en amont sur les supports textiles choisis ou apportés.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Lieu :</span>
                <span>À domicile (Bruxelles uniquement) ou chez moi (quartier La Chasse à Etterbeek, max 6)
</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Tarif :</span>
                <span>À partir de 50€ pour un groupe de 3 personnes (prix variable en fonction des suppléments de supports) et +10€ par personne supplémentaire
</span>
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
         {/* Galerie de photos  */}
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6 text-center">Galerie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <img src="/lino1.png" alt="Couture 1" className="rounded-lg shadow-md object-cover w-full h-64" />
              <img src="/lino2.png" alt="Couture 2" className="rounded-lg shadow-md object-cover w-full h-64" />
              <img src="/lino3.png" alt="Couture 3" className="rounded-lg shadow-md object-cover w-full h-64" />
              <img src="/lino4.png" alt="Couture 4" className="rounded-lg shadow-md object-cover w-full h-64" /> 
              <img src="/lino5.png" alt="Couture 5" className="rounded-lg shadow-md object-cover w-full h-64" />
              <img src="/lino6.png" alt="Couture 6" className="rounded-lg shadow-md object-cover w-full h-64" />
              <img src="/lino7.png" alt="Couture 7" className="rounded-lg shadow-md object-cover w-full h-64" /> 
            </div>
          </section>
      </div>
    </div>
  );
};

export default Linogravure;
