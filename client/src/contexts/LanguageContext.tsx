import { createContext, useContext, useState } from 'react';

type Language = 'tr' | 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  tr: {
    // Navbar
    home: 'Ana Sayfa',
    menu: 'Menü',
    reservations: 'Rezervasyon',
    about: 'Hakkımızda',
    contact: 'İletişim',
    gallery: 'Galeri',
    admin: 'Yönetici',
    
    // Hero Section
    heroTitle: 'El Jardín del Sabor',
    heroSubtitle: 'Geleneksel mutfağın modern inovasyonla buluştuğu yer',
    exploreMenu: 'Menüyü Keşfet',
    makeReservation: 'Rezervasyon Yap',
    
    // Menu Section
    ourMenu: 'Menümüz',
    menuDescription: 'Taze malzemeler ve yenilikçi mutfak teknikleriyle benzersiz bir gastronomi deneyimi keşfedin',
    all: 'Tümü',
    appetizers: 'Başlangıçlar',
    mains: 'Ana Yemekler',
    desserts: 'Tatlılar',
    beverages: 'İçecekler',
    notAvailable: 'Mevcut değil',
    
    // Restaurant info
    address: 'Calle Gran Vía 45, Madrid 28013',
    phone: '+34 911 234 567',
    hours: 'Sal-Paz: 19:00 - 24:00',
    priceRange: '€€€€ Yüksek Mutfak',
    
    // Form labels
    name: 'Ad',
    email: 'E-posta',
    phoneNumber: 'Telefon',
    date: 'Tarih',
    time: 'Saat',
    guests: 'Kişi Sayısı',
    comments: 'Özel İstekler',
    subject: 'Konu',
    message: 'Mesaj',
    
    // About
    ourStory: 'Hikayemiz',
    
    // Footer
    schedule: 'Çalışma Saatleri',
    quickLinks: 'Hızlı Linkler',
    rightsReserved: 'Tüm hakları saklıdır.'
  },
  en: {
    // Navbar
    home: 'Home',
    menu: 'Menu',
    reservations: 'Reservations',
    about: 'About',
    contact: 'Contact',
    gallery: 'Gallery',
    admin: 'Admin',
    
    // Hero Section
    heroTitle: 'El Jardín del Sabor',
    heroSubtitle: 'Where culinary tradition meets modern innovation in every bite',
    exploreMenu: 'Explore Menu',
    makeReservation: 'Make Reservation',
    
    // Menu Section
    ourMenu: 'Our Menu',
    menuDescription: 'Discover a unique gastronomic experience with fresh ingredients and innovative culinary techniques',
    all: 'All',
    appetizers: 'Appetizers',
    mains: 'Main Courses',
    desserts: 'Desserts',
    beverages: 'Beverages',
    notAvailable: 'Not available',
    
    // Restaurant info
    address: 'Calle Gran Vía 45, Madrid 28013',
    phone: '+34 911 234 567',
    hours: 'Tue-Sun: 19:00 - 24:00',
    priceRange: '€€€€ Fine Dining',
    
    // Form labels
    name: 'Name',
    email: 'Email',
    phoneNumber: 'Phone',
    date: 'Date',
    time: 'Time',
    guests: 'Guests',
    comments: 'Special Requests',
    subject: 'Subject',
    message: 'Message',
    
    // About
    ourStory: 'Our Story',
    
    // Footer
    schedule: 'Schedule',
    quickLinks: 'Quick Links',
    rightsReserved: 'All rights reserved.'
  },
  es: {
    // Navbar
    home: 'Inicio',
    menu: 'Menú',
    reservations: 'Reservas',
    about: 'Nosotros',
    contact: 'Contacto',
    gallery: 'Galería',
    admin: 'Admin',
    
    // Hero Section
    heroTitle: 'El Jardín del Sabor',
    heroSubtitle: 'Donde la tradición culinaria se encuentra con la innovación moderna en cada bocado',
    exploreMenu: 'Explorar Menú',
    makeReservation: 'Hacer Reserva',
    
    // Menu Section
    ourMenu: 'Nuestro Menú',
    menuDescription: 'Descubre una experiencia gastronómica única con ingredientes frescos y técnicas culinarias innovadoras',
    all: 'Todos',
    appetizers: 'Entrantes',
    mains: 'Principales',
    desserts: 'Postres',
    beverages: 'Bebidas',
    notAvailable: 'No disponible',
    
    // Restaurant info
    address: 'Calle Gran Vía 45, Madrid 28013',
    phone: '+34 911 234 567',
    hours: 'Mar-Dom: 19:00 - 24:00',
    priceRange: '€€€€ Alta Cocina',
    
    // Form labels
    name: 'Nombre',
    email: 'Email',
    phoneNumber: 'Teléfono',
    date: 'Fecha',
    time: 'Hora',
    guests: 'Comensales',
    comments: 'Comentarios especiales',
    subject: 'Asunto',
    message: 'Mensaje',
    
    // About
    ourStory: 'Nuestra Historia',
    
    // Footer
    schedule: 'Horarios',
    quickLinks: 'Enlaces Rápidos',
    rightsReserved: 'Todos los derechos reservados.'
  },
  fr: {
    // Navbar
    home: 'Accueil',
    menu: 'Menu',
    reservations: 'Réservations',
    about: 'À propos',
    contact: 'Contact',
    gallery: 'Galerie',
    admin: 'Admin',
    
    // Hero Section
    heroTitle: 'El Jardín del Sabor',
    heroSubtitle: 'Où la tradition culinaire rencontre l\'innovation moderne à chaque bouchée',
    exploreMenu: 'Explorer le Menu',
    makeReservation: 'Faire une Réservation',
    
    // Menu Section
    ourMenu: 'Notre Menu',
    menuDescription: 'Découvrez une expérience gastronomique unique avec des ingrédients frais et des techniques culinaires innovantes',
    all: 'Tous',
    appetizers: 'Entrées',
    mains: 'Plats Principaux',
    desserts: 'Desserts',
    beverages: 'Boissons',
    notAvailable: 'Non disponible',
    
    // Restaurant info
    address: 'Calle Gran Vía 45, Madrid 28013',
    phone: '+34 911 234 567',
    hours: 'Mar-Dim: 19:00 - 24:00',
    priceRange: '€€€€ Haute Cuisine',
    
    // Form labels
    name: 'Nom',
    email: 'Email',
    phoneNumber: 'Téléphone',
    date: 'Date',
    time: 'Heure',
    guests: 'Invités',
    comments: 'Demandes spéciales',
    subject: 'Sujet',
    message: 'Message',
    
    // About
    ourStory: 'Notre Histoire',
    
    // Footer
    schedule: 'Horaires',
    quickLinks: 'Liens Rapides',
    rightsReserved: 'Tous droits réservés.'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}