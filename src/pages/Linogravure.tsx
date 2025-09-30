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
            <p className="text-muted-foreground leading-relaxed mb-4">
              Découvrez l'art fascinant de la linogravure, une technique d'impression ancestrale 
              qui permet de créer des motifs uniques et personnalisés. Cet atelier vous guidera 
              pas à pas dans la création de votre propre tampon en linoleum et son impression 
              sur textile.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Au cours de cet atelier, vous apprendrez à dessiner votre motif, à le graver dans 
              le linoleum, et à l'imprimer sur le support textile de votre choix. Que vous 
              souhaitiez personnaliser un tote bag, un t-shirt, ou tout autre support textile, 
              vous repartirez avec une création unique et le savoir-faire pour recommencer chez vous.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              L'atelier peut se dérouler chez moi dans un cadre inspirant, ou je peux me déplacer 
              chez vous pour une expérience personnalisée (idéal pour les groupes ou événements 
              spéciaux).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">
              Informations pratiques
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Durée :</span>
                <span>3 à 4 heures</span>
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
                <span>Outils de gravure fournis</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Support textile :</span>
                <span>Vous pouvez apporter le vôtre ou je peux le fournir</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-[120px]">Lieu :</span>
                <span>Chez moi ou à votre domicile</span>
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
      </div>
    </div>
  );
};

export default Linogravure;
