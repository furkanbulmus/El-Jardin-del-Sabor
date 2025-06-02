import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import AdminPanel from "@/components/admin-panel";
import { ArrowLeft } from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/auth/login", {
        username,
        password
      });

      if (response.ok) {
        setIsAuthenticated(true);
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        });
      }
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: "Credenciales incorrectas. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-dark-800 border-gold-400/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/")}
                className="absolute left-6 top-6 text-gold-400 hover:text-gold-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </div>
            <CardTitle className="text-2xl font-playfair text-gold-400">
              Panel de Administración
            </CardTitle>
            <p className="text-gray-300 text-sm">
              Acceso exclusivo para administradores
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-dark-700 border-dark-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-dark-700 border-dark-600"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gold-400 text-dark-900 hover:bg-gold-500"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
            <div className="mt-4 p-3 bg-dark-700 rounded-lg border border-gold-400/20">
              <p className="text-xs text-gray-400 text-center">
                <strong>Credenciales de prueba:</strong><br />
                Usuario: admin<br />
                Contraseña: admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminPanel onLogout={() => setIsAuthenticated(false)} />;
}
