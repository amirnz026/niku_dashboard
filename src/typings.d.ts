declare var ClipboardJS: any;

type AppStateType = {
  tabsState: TabsStateType;
  inventoryManagement: InventoryManagementType;
};

interface InventoryManagementType {
  inventoryPage: InventoryPageStateType;
}

type InventoryPageStateType = {
  // Table
  inventories: InventoryType[];
  isInventoriesLoading: boolean;
  errorInventories: string;
  inventorySelectedRows: InventoryType[];
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

type InventoryType = {
  name: string;
  category: string;
  status: string;
  users: string[];
};

type TabsStateType = {
  tabs: TabType[];
  activeTab: TabType;
};

type TabType = {
  tabName: string;
  tabRoute: string;
  order: number;
};

type InventoryFormStateType = 'create' | 'edit' | null;
