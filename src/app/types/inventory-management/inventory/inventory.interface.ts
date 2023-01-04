import { InventoryCategoryInterface } from './inventoryCategory.interface';
import { InventoryUserInterface } from './inventoryUser.interface';

export interface InventoryInterface {
  name: string;
  category: string;
  status: string;
  users: string[];
}
