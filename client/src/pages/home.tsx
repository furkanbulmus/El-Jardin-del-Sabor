import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          }}
        />
        
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-6 animate-fadeInUp">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto animate-fadeInUp opacity-0 animation-delay-200">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp opacity-0 animation-delay-400">
            <Link href="/menu">
              <Button className="bg-gold-400 text-dark-900 px-8 py-4 text-lg font-semibold hover:bg-gold-500 transition-all animate-glow">
                {t('exploreMenu')}
              </Button>
            </Link>
            <Link href="/reservations">
              <Button
                variant="outline"
                className="border-2 border-gold-400 text-gold-400 px-8 py-4 text-lg font-semibold hover:bg-gold-400 hover:text-dark-900 transition-all"
              >
                {t('makeReservation')}
              </Button>
            </Link>
          </div>
        </div>


      </section>
      
      <Footer />
    </div>
  );
}
