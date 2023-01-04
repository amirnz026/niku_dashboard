export type InventoryPageStateType = {
  // Table
  inventories: InventoryType[];
  isInventoriesLoading: boolean;
  errorInventories: string;
  inventorySelectedRows: InventoryType[];
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
  currentEditingInventory: InventoryType | null;
};
export type InventoryFormStateType = 'create' | 'edit' | null;

export type InventoryType = {
  name: string;
  category: string;
  status: string;
  users: string[];
};
