import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Clock, Euro } from "lucide-react";
import { validateEmail, validatePhone } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ReservationsPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    comments: "",
  });

  const createReservationMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/reservations", data),
    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        comments: "",
      });
      toast({
        title: "¡Reserva enviada!",
        description: "Hemos recibido su reserva. Le confirmaremos por email pronto.",
      });
    },
    onError: () => {
      toast({
        title: "Error al enviar reserva",
        description: "No se pudo enviar la reserva. Inténtelo de nuevo.",
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

    if (!validatePhone(formData.phone)) {
      toast({
        title: "Teléfono inválido",
        description: "Por favor ingrese un número de teléfono válido.",
        variant: "destructive",
      });
      return;
    }

    createReservationMutation.mutate({
      ...formData,
      guests: parseInt(formData.guests),
    });
  };

  const availableTimes = [
    { time: "19:00", available: true },
    { time: "19:30", available: true },
    { time: "20:00", available: false },
    { time: "20:30", available: true },
    { time: "21:00", available: true },
    { time: "21:30", available: false },
    { time: "22:00", available: true },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <section className="pt-24 pb-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-playfair font-bold mb-4">
              {t('makeReservation').split(' ')[0]} <span className="text-gold-400">{t('makeReservation').split(' ')[1] || 'Rezervasyon'}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Reserve su mesa para una experiencia gastronómica inolvidable
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Reservation Form */}
              <Card className="bg-dark-800 border-gold-400/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-gold-400">
                    Detalles de la Reserva
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t('name')} *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="bg-dark-700 border-dark-600"
                          placeholder="Su nombre completo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">{t('phoneNumber')} *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="bg-dark-700 border-dark-600"
                          placeholder="+34 600 000 000"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">{t('email')} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-dark-700 border-dark-600"
                        placeholder="su@email.com"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="date">{t('date')} *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className="bg-dark-700 border-dark-600"
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">{t('time')} *</Label>
                        <Select
                          value={formData.time}
                          onValueChange={(value) =>
                            setFormData({ ...formData, time: value })
                          }
                        >
                          <SelectTrigger className="bg-dark-700 border-dark-600">
                            <SelectValue placeholder="Seleccionar hora" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="19:00">19:00</SelectItem>
                            <SelectItem value="19:30">19:30</SelectItem>
                            <SelectItem value="20:00">20:00</SelectItem>
                            <SelectItem value="20:30">20:30</SelectItem>
                            <SelectItem value="21:00">21:00</SelectItem>
                            <SelectItem value="21:30">21:30</SelectItem>
                            <SelectItem value="22:00">22:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="guests">{t('guests')} *</Label>
                        <Select
                          value={formData.guests}
                          onValueChange={(value) =>
                            setFormData({ ...formData, guests: value })
                          }
                        >
                          <SelectTrigger className="bg-dark-700 border-dark-600">
                            <SelectValue placeholder="Personas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 persona</SelectItem>
                            <SelectItem value="2">2 personas</SelectItem>
                            <SelectItem value="3">3 personas</SelectItem>
                            <SelectItem value="4">4 personas</SelectItem>
                            <SelectItem value="5">5 personas</SelectItem>
                            <SelectItem value="6">6+ personas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="comments">{t('comments')}</Label>
                      <Textarea
                        id="comments"
                        value={formData.comments}
                        onChange={(e) =>
                          setFormData({ ...formData, comments: e.target.value })
                        }
                        className="bg-dark-700 border-dark-600"
                        placeholder="Alergias, celebraciones, preferencias..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gold-400 text-dark-900 text-lg font-semibold hover:bg-gold-500 py-4"
                      disabled={createReservationMutation.isPending}
                    >
                      {createReservationMutation.isPending
                        ? "Enviando..."
                        : "Confirmar Reserva"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Restaurant Info */}
              <div className="space-y-8">
                <Card className="bg-dark-800 border-gold-400/20 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
                    alt="Interior elegante del restaurante"
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-playfair text-gold-400 mb-4">
                      Información del Restaurante
                    </CardTitle>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="text-gold-400 mr-3" size={18} />
                        <span>{t('address')}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="text-gold-400 mr-3" size={18} />
                        <span>{t('phone')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-gold-400 mr-3" size={18} />
                        <span>{t('hours')}</span>
                      </div>
                      <div className="flex items-center">
                        <Euro className="text-gold-400 mr-3" size={18} />
                        <span>{t('priceRange')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-800 border-gold-400/20">
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-playfair text-gold-400 mb-4">
                      Disponibilidad Hoy
                    </CardTitle>
                    <div className="grid grid-cols-3 gap-3">
                      {availableTimes.map(({ time, available }) => (
                        <Button
                          key={time}
                          variant={available ? "default" : "secondary"}
                          size="sm"
                          className={
                            available
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-gray-600 text-gray-400 cursor-not-allowed"
                          }
                          disabled={!available}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}