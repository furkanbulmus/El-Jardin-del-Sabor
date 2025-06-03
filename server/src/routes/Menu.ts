import express, { Request, Response, Router } from 'express';
import Menu from '../models/Menu';

const router: Router = express.Router();

// Type definitions
interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

interface RequestParams {
  id: string;
}

// Custom request handler type
type RequestHandler = (req: Request, res: Response) => Promise<void>;

// Get all menu items
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error occurred';
    res.status(500).json({ error: 'Failed to fetch menus', details: error });
  }
});

// Create new menu item
router.post('/', async (req: Request<{}, {}, MenuItem>, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, available } = req.body;
    const newMenu = new Menu({ name, description, price, category, available });
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error occurred';
    res.status(400).json({ error: 'Failed to create menu', details: error });
  }
});

// Update menu item
router.put('/:id', async (req: Request<RequestParams, {}, Partial<MenuItem>>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMenu) {
      res.status(404).json({ error: 'Menu item not found' });
      return;
    }

    res.status(200).json(updatedMenu);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error occurred';
    res.status(400).json({ error: 'Failed to update menu', details: error });
  }
});

// Delete menu item
router.delete('/:id', async (req: Request<RequestParams>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      res.status(404).json({ error: 'Menu item not found' });
      return;
    }

    res.status(200).json({
      message: 'Menu item deleted successfully',
      deletedItem: deletedMenu
    });
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error occurred';
    res.status(400).json({ error: 'Failed to delete menu', details: error });
  }
});

export default router;