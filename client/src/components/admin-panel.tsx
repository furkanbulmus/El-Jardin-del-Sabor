import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatPrice, formatDate } from "@/lib/utils";
import { ArrowLeft, Plus, Edit, Trash2, LogOut } from "lucide-react";
import type { MenuItem, Reservation, Contact } from "@shared/schema";

interface AdminPanelProps {
  onLogout: () => void;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form state for new menu item
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    available: true,
  });

  // Queries
  const { data: menuItems, isLoading: menuLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  const { data: reservations } = useQuery<Reservation[]>({
    queryKey: ["/api/reservations"],
  });

  const { data: contacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  // Mutations
  const createMenuItemMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/menu-items", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
        available: true,
      });
      toast({
        title: "Plato agregado",
        description: "El plato se ha agregado exitosamente al menú.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo agregar el plato al menú.",
        variant: "destructive",
      });
    },
  });

  const updateMenuItemMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      apiRequest("PUT", `/api/menu-items/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      setEditingItem(null);
      toast({
        title: "Plato actualizado",
        description: "El plato se ha actualizado exitosamente.",
      });
    },
  });

  const deleteMenuItemMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/menu-items/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({
        title: "Plato eliminado",
        description: "El plato se ha eliminado del menú.",
      });
    },
  });

  const updateReservationMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      apiRequest("PUT", `/api/reservations/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
      toast({
        title: "Reserva actualizada",
        description: "El estado de la reserva se ha actualizado.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceInCents = Math.round(parseFloat(formData.price) * 100);

    if (editingItem) {
      updateMenuItemMutation.mutate({
        id: editingItem.id,
        data: { ...formData, price: priceInCents },
      });
    } else {
      createMenuItemMutation.mutate({
        ...formData,
        price: priceInCents,
      });
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: (item.price / 100).toFixed(2),
      image: item.image || "",
      available: item.available,
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
      available: true,
    });
  };

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="text-gold-400 hover:text-gold-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al sitio
            </Button>
            <h1 className="text-3xl font-playfair font-bold text-gold-400">
              Panel de Administración
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-dark-900"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="bg-dark-800 border-gold-400/20">
            <TabsTrigger value="menu" className="data-[state=active]:bg-gold-400 data-[state=active]:text-dark-900">
              Menú
            </TabsTrigger>
            <TabsTrigger value="reservations" className="data-[state=active]:bg-gold-400 data-[state=active]:text-dark-900">
              Reservas
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-gold-400 data-[state=active]:text-dark-900">
              Contactos
            </TabsTrigger>
          </TabsList>

          {/* Menu Management Tab */}
          <TabsContent value="menu">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add/Edit Menu Item Form */}
              <Card className="bg-dark-800 border-gold-400/20">
                <CardHeader>
                  <CardTitle className="text-gold-400">
                    {editingItem ? "Editar Plato" : "Agregar Nuevo Plato"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre del Plato</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="bg-dark-700 border-dark-600"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Categoría</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger className="bg-dark-700 border-dark-600">
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="appetizers">Entrantes</SelectItem>
                          <SelectItem value="mains">Principales</SelectItem>
                          <SelectItem value="desserts">Postres</SelectItem>
                          <SelectItem value="beverages">Bebidas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="bg-dark-700 border-dark-600"
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Precio (€)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className="bg-dark-700 border-dark-600"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">URL de la Imagen</Label>
                      <Input
                        id="image"
                        type="url"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        className="bg-dark-700 border-dark-600"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        type="submit"
                        className="bg-gold-400 text-dark-900 hover:bg-gold-500"
                        disabled={createMenuItemMutation.isPending || updateMenuItemMutation.isPending}
                      >
                        {editingItem ? "Actualizar Plato" : "Agregar Plato"}
                      </Button>
                      {editingItem && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="border-gray-600 text-gray-400"
                        >
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Menu Items List */}
              <Card className="bg-dark-800 border-gold-400/20">
                <CardHeader>
                  <CardTitle className="text-gold-400">Platos Existentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {menuItems?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-dark-700 rounded-lg p-4"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-400 capitalize">
                            {item.category}
                          </p>
                          <p className="text-gold-400 font-bold">
                            {formatPrice(item.price)}
                          </p>
                          {!item.available && (
                            <Badge variant="destructive" className="mt-1">
                              No disponible
                            </Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(item)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteMenuItemMutation.mutate(item.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations">
            <Card className="bg-dark-800 border-gold-400/20">
              <CardHeader>
                <CardTitle className="text-gold-400">Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations?.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex items-center justify-between bg-dark-700 rounded-lg p-4"
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <h4 className="font-semibold">{reservation.name}</h4>
                          <p className="text-sm text-gray-400">{reservation.email}</p>
                          <p className="text-sm text-gray-400">{reservation.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Fecha y Hora</p>
                          <p className="font-medium">{reservation.date}</p>
                          <p className="font-medium">{reservation.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Comensales</p>
                          <p className="font-medium">{reservation.guests}</p>
                        </div>
                        <div>
                          <Badge
                            variant={
                              reservation.status === "confirmed"
                                ? "default"
                                : reservation.status === "cancelled"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {reservation.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            updateReservationMutation.mutate({
                              id: reservation.id,
                              status: "confirmed",
                            })
                          }
                          className="bg-green-600 hover:bg-green-700"
                          disabled={reservation.status === "confirmed"}
                        >
                          Confirmar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            updateReservationMutation.mutate({
                              id: reservation.id,
                              status: "cancelled",
                            })
                          }
                          disabled={reservation.status === "cancelled"}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card className="bg-dark-800 border-gold-400/20">
              <CardHeader>
                <CardTitle className="text-gold-400">Mensajes de Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts?.map((contact) => (
                    <div
                      key={contact.id}
                      className="bg-dark-700 rounded-lg p-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold">{contact.name}</h4>
                          <p className="text-sm text-gray-400">{contact.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">
                            {formatDate(contact.createdAt?.toString() || "")}
                          </p>
                          <p className="font-medium">{contact.subject}</p>
                        </div>
                      </div>
                      <p className="text-gray-300">{contact.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
