import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { validateEmail } from "@/lib/utils";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const createContactMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/contacts", data),
    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      toast({
        title: "¡Mensaje enviado!",
        description: "Hemos recibido su mensaje. Le responderemos pronto.",
      });
    },
    onError: () => {
      toast({
        title: "Error al enviar mensaje",
        description: "No se pudo enviar el mensaje. Inténtelo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingrese un email válido.",
        variant: "destructive",
      });
      return;
    }

    createContactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Dirección",
      content: "Calle Gran Vía 45, Madrid 28013",
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+34 911 234 567",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@jardindelsabor.es",
    },
    {
      icon: Clock,
      title: "Horarios",
      content: "Mar-Dom: 19:00 - 24:00\nLunes: Cerrado",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-dark-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-playfair font-bold mb-4">
            Contacto <span className="text-gold-400">y Ubicación</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Encuéntranos en el corazón de Madrid para vivir una experiencia gastronómica única
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-dark-700 border-gold-400/20">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair text-gold-400">
                Envíanos un Mensaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Nombre *</Label>
                    <Input
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-dark-600 border-dark-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-dark-600 border-dark-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact-subject">Asunto *</Label>
                  <Input
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="bg-dark-600 border-dark-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact-message">Mensaje *</Label>
                  <Textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-dark-600 border-dark-500"
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gold-400 text-dark-900 font-semibold hover:bg-gold-500"
                  disabled={createContactMutation.isPending}
                >
                  {createContactMutation.isPending
                    ? "Enviando..."
                    : "Enviar Mensaje"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <Card className="bg-dark-700 border-gold-400/20">
              <CardContent className="p-8">
                <CardTitle className="text-2xl font-playfair text-gold-400 mb-6">
                  Información de Contacto
                </CardTitle>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <info.icon className="text-gold-400 text-xl mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">{info.title}</div>
                        <div className="text-gray-300 whitespace-pre-line">
                          {info.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Restaurant Exterior Image */}
            <div className="rounded-xl overflow-hidden border border-gold-400/20">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                alt="Exterior del restaurante en Gran Vía, Madrid"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
