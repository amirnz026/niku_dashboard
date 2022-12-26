import { InventoryInterface } from './inventory.interface';
import { InventoryCategoryInterface } from './inventoryCategory.interface';
import { InventoryUserInterface } from './inventoryUser.interface';

export interface InventoryPageInterface {
  // Table
  inventories: InventoryInterface[];
  isInventoriesLoading: boolean;
  errorInventories: string;
  // Form
  isInventoryForm: boolean;
  // Inventory Categories
  inventoryCategories: InventoryCategoryInterface[];
  isInventoriesCategoriesLoading: boolean;
  errorInventoriesCategories: string;
  // Inventory Users
  inventoryUsers: InventoryUserInterface[];
  inInventoryUsersLoading: boolean;
  errorInventoryUsers: string;
}
