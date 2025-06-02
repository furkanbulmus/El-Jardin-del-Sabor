import { 
  menuItems, 
  reservations, 
  contacts,
  type MenuItem, 
  type InsertMenuItem,
  type Reservation,
  type InsertReservation,
  type Contact,
  type InsertContact,
  type User,
  type InsertUser
} from "@shared/schema";

export interface IStorage {
  // Menu Items
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getMenuItemById(id: number): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem | undefined>;
  deleteMenuItem(id: number): Promise<boolean>;

  // Reservations
  getReservations(): Promise<Reservation[]>;
  getReservationById(id: number): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservationStatus(id: number, status: string): Promise<Reservation | undefined>;

  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;

  // Users (for admin auth)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private menuItems: Map<number, MenuItem>;
  private reservations: Map<number, Reservation>;
  private contacts: Map<number, Contact>;
  private users: Map<number, User>;
  private currentMenuId: number;
  private currentReservationId: number;
  private currentContactId: number;
  private currentUserId: number;

  constructor() {
    this.menuItems = new Map();
    this.reservations = new Map();
    this.contacts = new Map();
    this.users = new Map();
    this.currentMenuId = 1;
    this.currentReservationId = 1;
    this.currentContactId = 1;
    this.currentUserId = 1;

    // Initialize with sample menu items
    this.initializeMenuItems();
    this.initializeAdminUser();
  }

  private initializeMenuItems() {
    const sampleItems: Omit<MenuItem, 'id' | 'createdAt'>[] = [
      {
        name: "Foie Gras Trufado",
        description: "Con reducción de vino tinto y microvegetales de temporada",
        category: "appetizers",
        price: 2400,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true
      },
      {
        name: "Tartar de Atún",
        description: "Atún rojo con aguacate, lima y aceite de sésamo",
        category: "appetizers",
        price: 2200,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true
      },
      {
        name: "Beef Wellington",
        description: "Solomillo envuelto en hojaldre con duxelles de champiñones y paté",
        category: "mains",
        price: 4500,
        image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true
      },
      {
        name: "Langosta Thermidor",
        description: "Langosta gratinada con salsa de brandy y queso gruyère",
        category: "mains",
        price: 6500,
        image: "https://images.unsplash.com/photo-1559847844-d98a0601900a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true
      },
      {
        name: "Soufflé de Chocolate",
        description: "Chocolate belga 70% con helado artesanal de vainilla bourbon",
        category: "desserts",
        price: 1600,
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true
      },
      {
        name: "Tarta de Limón",
        description: "Con merengue italiano y crumble de almendra",
        category: "desserts",
        price: 1400,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true
      },
      {
        name: "Rioja Gran Reserva",
        description: "Cosecha 2015, crianza en barrica de roble francés",
        category: "beverages",
        price: 1200,
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true
      },
      {
        name: "Champagne Brut",
        description: "Champagne francés con notas florales y cítricas",
        category: "beverages",
        price: 1800,
        image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true
      }
    ];

    sampleItems.forEach(item => {
      const menuItem: MenuItem = {
        ...item,
        id: this.currentMenuId++,
        createdAt: new Date()
      };
      this.menuItems.set(menuItem.id, menuItem);
    });
  }

  private initializeAdminUser() {
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin123" // In production, this would be hashed
    };
    this.users.set(adminUser.id, adminUser);
  }

  // Menu Items
  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(item => item.category === category);
  }

  async getMenuItemById(id: number): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const id = this.currentMenuId++;
    const menuItem: MenuItem = {
      ...item,
      id,
      createdAt: new Date()
    };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem | undefined> {
    const existing = this.menuItems.get(id);
    if (!existing) return undefined;

    const updated: MenuItem = {
      ...existing,
      ...item
    };
    this.menuItems.set(id, updated);
    return updated;
  }

  async deleteMenuItem(id: number): Promise<boolean> {
    return this.menuItems.delete(id);
  }

  // Reservations
  async getReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }

  async getReservationById(id: number): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const id = this.currentReservationId++;
    const newReservation: Reservation = {
      ...reservation,
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.reservations.set(id, newReservation);
    return newReservation;
  }

  async updateReservationStatus(id: number, status: string): Promise<Reservation | undefined> {
    const existing = this.reservations.get(id);
    if (!existing) return undefined;

    const updated: Reservation = {
      ...existing,
      status
    };
    this.reservations.set(id, updated);
    return updated;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const newContact: Contact = {
      ...contact,
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }
}

export const storage = new MemStorage();
