import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function GalleryPage() {
  const { t } = useLanguage();
  
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Plato gourmet con presentación artística",
    },
    {
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Ambiente romántico con velas y copas de vino",
    },
    {
      src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Bodega con selección de vinos premium",
    },
    {
      src: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Postre moderno con técnicas de alta cocina",
    },
    {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Comedor elegante del restaurante",
    },
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Mesa preparada para cena romántica",
    },
    {
      src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Chef trabajando en la cocina",
    },
    {
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      alt: "Exterior del restaurante",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <section className="pt-24 pb-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-playfair font-bold mb-4">
              {t('gallery').split(' ')[0]} <span className="text-gold-400">Visual</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Descubre el ambiente y los platos que hacen de El Jardín del Sabor una experiencia única
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg card-hover cursor-pointer group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}