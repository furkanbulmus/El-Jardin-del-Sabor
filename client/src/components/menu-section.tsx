import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@shared/schema";

const categories = [
  { id: "all", label: "Todos" },
  { id: "appetizers", label: "Entrantes" },
  { id: "mains", label: "Principales" },
  { id: "desserts", label: "Postres" },
  { id: "beverages", label: "Bebidas" },
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  const filteredItems = menuItems?.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <section id="menu" className="py-20 bg-dark-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-playfair font-bold mb-4">
            Nuestro <span className="text-gold-400">Menú</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre una experiencia gastronómica única con ingredientes frescos y técnicas culinarias innovadoras
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={
                activeCategory === category.id
                  ? "bg-gold-400 text-dark-900 font-semibold"
                  : "border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-dark-900"
              }
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-dark-700 border-gold-400/20">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-10 w-10 rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems?.map((item) => (
              <Card
                key={item.id}
                className="bg-dark-700 border-gold-400/20 card-hover overflow-hidden"
              >
                {item.image && (
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    {!item.available && (
                      <Badge
                        variant="destructive"
                        className="absolute top-2 right-2"
                      >
                        No disponible
                      </Badge>
                    )}
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-playfair font-semibold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gold-400">
                      {formatPrice(item.price)}
                    </span>
                    <Button
                      size="icon"
                      className="bg-gold-400 text-dark-900 hover:bg-gold-500"
                      disabled={!item.available}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredItems?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No hay platos disponibles en esta categoría.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
