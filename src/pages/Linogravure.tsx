import { Navigation } from "@/components/Navigation";
import { Reviews } from "@/components/Reviews";
import { ReviewForm } from "@/components/ReviewForm";
import {
  Clock,
  Users,
  MapPin,
  Coffee,
  Package,
  CheckCircle2,
  Info,
} from "lucide-react";
import { useState } from "react";

const Linogravure = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="py-16 px-4 bg-base-200 text-center">
        <h1 className="text-3xl font-bold font-serif text-primary mb-2">
          Atelier Linogravure
        </h1>
        <p className="text-base mb-6">
          Découvrez la linogravure et créez une fresque ensemble !
        </p>
        <a
          href="https://calendar.app.google/qXQQJ4ghfSfR6bG49"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
        >
          Réserver votre atelier
        </a>
      </section>

      {/* Quick info */}
      <section className="py-6 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-8 text-center text-sm">
          <div>
            <p className="opacity-60">Durée</p>
            <p className="text-lg font-bold">3 heures</p>
          </div>
          <div>
            <p className="opacity-60">Participants</p>
            <p className="text-lg font-bold">
              1-8 <span className="font-normal text-sm">pers.</span>
            </p>
          </div>
          <div>
            <p className="opacity-60">À partir de</p>
            <p className="text-lg font-bold text-primary">50€</p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold font-serif text-primary mb-3">
            Le principe
          </h2>
          <p className="leading-relaxed">
            La linogravure est une technique d'impression artisanale : on grave
            le négatif d'un motif dans une plaque de linoléum (le tampon), puis
            on l'encre pour le transférer sur un textile. Chaque impression est
            unique et donne un rendu artistique et authentique.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-10 px-4 bg-base-200">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold font-serif text-primary mb-6 text-center">
            Le déroulé
          </h2>

          <ul className="steps steps-vertical lg:steps-horizontal w-full mb-6 text-sm">
            <li className="step step-primary">Formation</li>
            <li className="step step-primary">Création</li>
            <li className="step step-primary">Impression</li>
            <li className="step step-primary">Fresque</li>
          </ul>

          <div className="space-y-3">
            {[
              "Petite formation accompagnée d'un livret pour connaitre les bases",
              "Chacun.e crée son propre tampon",
              "On imprime ensemble tous les motifs sur le textile de chacun.e pour réaliser une fresque collective",
              "Repartez avec une création personnalisée et pleine de souvenirs !",
            ].map((step, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold font-serif text-primary mb-6 text-center">
            Informations pratiques
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Clock, title: "Durée", text: "3 heures" },
              { icon: Users, title: "Participants", text: "1 à 8 personnes" },
              {
                icon: Package,
                title: "Matériel",
                text: "Tout le matériel de linogravure est fourni (plaque, gouges, encre)",
              },
              {
                icon: Coffee,
                title: "Collation",
                text: "Thé et café à volonté ainsi qu'une petite pause gourmande prévue : sucré ou salé, à décider ensemble à l'avance.",
              },
              {
                icon: MapPin,
                title: "Lieu",
                text: "À domicile (Bruxelles uniquement) ou chez moi (quartier La Chasse à Etterbeek, max 6)",
              },
              {
                icon: CheckCircle2,
                title: "Niveau",
                text: "Tous niveaux, débutants bienvenus",
              },
            ].map(({ icon: Icon, title, text }, idx) => (
              <div
                key={idx}
                className="flex gap-3 items-start p-3 rounded-lg bg-base-200"
              >
                <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-sm opacity-80">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Support textile */}
          <div className="alert mt-6 text-sm">
            <Info className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Support textile</p>
              <p>
                Tote bag, coussin, tee-shirt, ex libris ... (à choisir à
                l'avance). Vous pouvez aussi apporter un textile de seconde main
                (lavé). J'ai simplement besoin d'être briefée en amont sur les
                supports textiles choisis ou apportés.
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-6 p-4 rounded-lg bg-primary text-primary-content text-center">
            <h3 className="font-bold mb-2">Tarifs</h3>
            <p className="text-sm">
              À partir de <span className="font-bold text-lg">50€</span> pour 3
              personnes
            </p>
            <p className="text-sm">+10€ par personne supplémentaire</p>
            <p className="text-xs opacity-70 mt-1">
              (prix variable en fonction des suppléments de supports)
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-10 px-4 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold font-serif text-primary mb-6 text-center">
            Galerie
          </h2>
          <div className="carousel carousel-center max-w-full space-x-3 p-2">
            {[
              "/lino1.png",
              "/lino2.png",
              "/lino3.png",
              "/lino4.png",
              "/lino5.png",
              "/lino6.png",
              "/lino7.png",
            ].map((src, idx) => (
              <div key={idx} className="carousel-item">
                <img
                  src={src}
                  alt={`Linogravure ${idx + 1}`}
                  className="rounded-lg w-64 h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
            <h2 className="text-xl font-bold font-serif text-primary">Avis</h2>
            <button
              className="btn btn-outline btn-primary btn-sm"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              Laisser un avis
            </button>
          </div>

          {showReviewForm && (
            <div className="card bg-base-100 border border-base-300 mb-6">
              <div className="card-body">
                <ReviewForm
                  workshopType="linogravure"
                  onSuccess={() => setShowReviewForm(false)}
                />
              </div>
            </div>
          )}

          <Reviews workshopType="linogravure" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-primary text-primary-content text-center">
        <h2 className="text-xl font-bold font-serif mb-4">
          Prêt à découvrir la linogravure ?
        </h2>
        <a
          href="https://calendar.app.google/qXQQJ4ghfSfR6bG49"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-secondary"
        >
          Réserver votre atelier
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-base-200 border-t border-base-300 text-center text-sm">
        <p className="font-serif font-bold text-primary">ChloHal</p>
        <p className="mt-1 opacity-70">©2026 ChloHal - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default Linogravure;
