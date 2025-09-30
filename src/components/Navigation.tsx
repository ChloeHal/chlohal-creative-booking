import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          isActive("/") ? "text-primary" : "text-foreground"
        }`}
      >
        Accueil
      </Link>
      <Link
        to="/couture"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          isActive("/couture") ? "text-primary" : "text-foreground"
        }`}
      >
        Atelier Couture
      </Link>
      <Link
        to="/linogravure"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          isActive("/linogravure") ? "text-primary" : "text-foreground"
        }`}
      >
        Atelier Linogravure
      </Link>
      <Link
        to="/admin"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          isActive("/admin") ? "text-primary" : "text-foreground"
        }`}
      >
        Admin
      </Link>
    </>
  );

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl font-bold text-primary">
            ChloHal
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
