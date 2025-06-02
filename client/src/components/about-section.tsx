import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  const stats = [
    { number: "5+", label: "Años de Experiencia" },
    { number: "15k+", label: "Clientes Satisfechos" },
    { number: "2", label: "Estrellas Michelin" },
    { number: "50+", label: "Platos Únicos" },
  ];

  return (
    <section id="about" className="py-20 bg-dark-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-playfair font-bold mb-6">
              Nuestra <span className="text-gold-400">Historia</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              En El Jardín del Sabor, cada plato cuenta una historia. Fundado en 2018 por el chef Miguel Rodríguez,
              nuestro restaurante nace de la pasión por fusionar la tradición culinaria española con técnicas
              innovadoras de la alta cocina internacional.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Ubicados en el corazón de Madrid, ofrecemos una experiencia gastronómica única donde cada
              ingrediente es cuidadosamente seleccionado y cada preparación es una obra de arte culinario.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Chef Miguel Rodríguez en la cocina"
              className="w-full rounded-xl shadow-lg"
            />

            <Card className="bg-dark-700 border-gold-400/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-playfair font-semibold mb-3 text-gold-400">
                  Chef Miguel Rodríguez
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "La cocina es mi lienzo y cada plato es una pintura. Mi filosofía se basa en respetar
                  los sabores tradicionales mientras exploro nuevas fronteras culinarias."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
