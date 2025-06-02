export default function GallerySection() {
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
  ];

  return (
    <section className="py-20 bg-dark-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-playfair font-bold mb-4">
            Galería <span className="text-gold-400">Visual</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre el ambiente y los platos que hacen de El Jardín del Sabor una experiencia única
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg card-hover cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
