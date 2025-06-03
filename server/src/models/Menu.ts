import mongoose, { Schema, Document } from 'mongoose';

export interface IMenu extends Document {
  name: string;
  description?: string;
  price: number;
  category: string; // Örn: 'İçecek', 'Ana Yemek', 'Tatlı' gibi
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMenu>('Menu', MenuSchema);
