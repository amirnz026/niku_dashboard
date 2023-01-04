import { InventoryInterface } from './inventory.interface';

export interface InventoryPageInterface {
  // Table
  inventories: InventoryInterface[];
  isInventoriesLoading: boolean;
  errorInventories: string;
  inventorySelectedRows: InventoryInterface[];
  inventoryFormState: 'edit' | 'create' | null;
  // Form
  isInventoryFormOpen: boolean;
  // Inventory Categories
  inventoryCategories: string[];
  isInventoriesCategoriesLoading: boolean;
  errorInventoriesCategories: string;
  // Inventory Users
  inventoryUsers: string[];
  isInventoryUsersLoading: boolean;
  errorInventoryUsers: string;
  // Form Elements
  inventoryNameForm: string | null;
  inventoryCategoryForm: string | null;
  inventoryUsersForm: string[];
  inventoryStatusForm: boolean | null;
  // Editing
  currentEditingInventory: InventoryInterface | null;
}
export type InventoryFormStateType = 'create' | 'edit' | null;
