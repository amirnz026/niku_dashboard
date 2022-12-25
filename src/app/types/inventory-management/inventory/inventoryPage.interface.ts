import { InventoryInterface } from './inventory.interface';
import { InventoryCategoryInterface } from './inventoryCategory.interface';

export interface InventoryPageInterface {
  // Table
  inventories: InventoryInterface[];
  isInventoriesLoading: boolean;
  errorInventories: string;
  // Form
  isInventoryForm: boolean;
  inventoryCategories: InventoryCategoryInterface[];
  isInventoriesCategoriesLoading: boolean;
  errorInventoriesCategories: string;
}
