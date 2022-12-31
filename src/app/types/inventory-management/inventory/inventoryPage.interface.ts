import { InventoryInterface } from './inventory.interface';
import { InventoryCategoryInterface } from './inventoryCategory.interface';
import { InventoryUserInterface } from './inventoryUser.interface';

export interface InventoryPageInterface {
  // Table
  inventories: InventoryInterface[];
  isInventoriesLoading: boolean;
  errorInventories: string;
  inventorySelectedRows: InventoryInterface[];
  inventoryFormState: 'edit' | 'create' | null;
  // Form
  // isInventoryForm: boolean;
  // Inventory Categories
  inventoryCategories: InventoryCategoryInterface[];
  isInventoriesCategoriesLoading: boolean;
  errorInventoriesCategories: string;
  // Inventory Users
  inventoryUsers: InventoryUserInterface[];
  isInventoryUsersLoading: boolean;
  errorInventoryUsers: string;
  // Form Elements
  inventoryNameForm: string | null;
  inventoryCategoryForm: InventoryCategoryInterface[];
  inventoryUsersForm: InventoryUserInterface | null;
  inventoryStatusForm: boolean | null;
}
