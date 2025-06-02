import { Link } from "wouter";
import { Leaf } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function Footer() {
  const navItems = [
    { label: "Menú", href: "#menu" },
    { label: "Reservas", href: "#reservations" },
    { label: "Nosotros", href: "#about" },
    { label: "Contacto", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    const sectionId = href.replace("#", "");
    scrollToSection(sectionId);
  };

  return (
    <footer className="bg-dark-900 border-t border-gold-400/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="text-gold-400 text-2xl" />
              <span className="text-2xl font-playfair font-bold text-gold-400">
                El Jardín del Sabor
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Donde la tradición culinaria se encuentra con la innovación moderna.
              Una experiencia gastronómica única en el corazón de Madrid.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gold-400 hover:text-gold-500 text-xl transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gold-400 hover:text-gold-500 text-xl transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-gold-400 hover:text-gold-500 text-xl transition-colors"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gold-400 hover:text-gold-500 text-xl transition-colors"
                aria-label="TripAdvisor"
              >
                <i className="fab fa-tripadvisor"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gold-400 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-300 hover:text-gold-400 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gold-400 mb-4">Horarios</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Lunes: Cerrado</li>
              <li>Mar-Jue: 19:00 - 24:00</li>
              <li>Vie-Sáb: 19:00 - 01:00</li>
              <li>Domingo: 19:00 - 23:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 El Jardín del Sabor. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
