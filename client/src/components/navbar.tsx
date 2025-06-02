import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, Leaf, Settings, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t('home'), href: "/" },
    { label: t('menu'), href: "/menu" },
    { label: t('reservations'), href: "/reservations" },
    { label: t('about'), href: "/about" },
    { label: t('gallery'), href: "/gallery" },
    { label: t('contact'), href: "/contact" },
  ];

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-dark-900 backdrop-blur-md border-b border-gold-400/20"
          : "bg-dark-900/95 backdrop-blur-md border-b border-gold-400/20"
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Leaf className="text-gold-400 text-2xl" />
              <span className="text-2xl font-playfair font-bold text-gold-400">
                El Jardín del Sabor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  className={cn(
                    "hover:text-gold-400 transition-colors",
                    location === item.href ? "text-gold-400" : "text-gray-100"
                  )}
                >
                  {item.label}
                </button>
              </Link>
            ))}
            
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[120px] bg-dark-800 border-gold-400/20">
                <Globe className="h-4 w-4 mr-2 text-gold-400" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center">
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Link href="/admin">
              <Button className="bg-gold-400 text-dark-900 hover:bg-gold-500 transition-colors">
                <Settings className="mr-2 h-4 w-4" />
                {t('admin')}
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gold-400">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-dark-800 border-l border-gold-400/20"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "text-left text-lg hover:text-gold-400 transition-colors w-full",
                          location === item.href ? "text-gold-400" : "text-gray-100"
                        )}
                      >
                        {item.label}
                      </button>
                    </Link>
                  ))}
                  
                  {/* Mobile Language Selector */}
                  <div className="mt-4">
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full bg-dark-700 border-gold-400/20">
                        <Globe className="h-4 w-4 mr-2 text-gold-400" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <span className="flex items-center">
                              <span className="mr-2">{lang.flag}</span>
                              {lang.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Link href="/admin">
                    <Button className="w-full bg-gold-400 text-dark-900 hover:bg-gold-500 mt-4">
                      <Settings className="mr-2 h-4 w-4" />
                      {t('admin')}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
