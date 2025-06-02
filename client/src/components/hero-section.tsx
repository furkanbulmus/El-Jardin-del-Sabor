import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-6 animate-fadeInUp">
          El Jardín del <span className="text-gold-400">Sabor</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto animate-fadeInUp opacity-0 animation-delay-200">
          Donde la tradición culinaria se encuentra con la innovación moderna en cada bocado
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp opacity-0 animation-delay-400">
          <Button
            onClick={() => scrollToSection("menu")}
            className="bg-gold-400 text-dark-900 px-8 py-4 text-lg font-semibold hover:bg-gold-500 transition-all animate-glow"
          >
            Explorar Menú
          </Button>
          <Button
            onClick={() => scrollToSection("reservations")}
            variant="outline"
            className="border-2 border-gold-400 text-gold-400 px-8 py-4 text-lg font-semibold hover:bg-gold-400 hover:text-dark-900 transition-all"
          >
            Hacer Reserva
          </Button>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: forwards;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}
