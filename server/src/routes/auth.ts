import { Router, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Signup endpoint
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, surname, email, password, role } = req.body;

    // Kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email zaten kayıtlı.' });
      return;
    }

    // Şifre hash'leniyor mu kontrol et (User modelinde pre-save hook olmalı)
    const user = new User({ name, surname, email, password, role });
    await user.save();

    res.status(201).json({ message: 'Kullanıcı oluşturuldu.' });
  } catch (err) {
    console.error(err); // Hata loglama
    res.status(500).json({ error: 'Kayıt sırasında hata oluştu.' });
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: 'Geçersiz email veya şifre.' });
      return;
    }

    // Parolayı karşılaştır
    // comparePassword fonksiyonunun User modelinde tanımlı olduğundan emin ol
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ error: 'Geçersiz email veya şifre.' });
      return;
    }

    // JWT token üret
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err); // Hata loglama
    res.status(500).json({ error: 'Giriş sırasında hata oluştu.' });
  }
});

export default router;
