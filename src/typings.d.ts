declare var ClipboardJS: any;

type AppStateType = {
  tabsState: TabsStateType;
  inventoryManagement: InventoryManagementStateType;
};

interface InventoryManagementStateType {
  inventoryPage: InventoryPageStateType;
}

type InventoryPageStateType = {
  // Table
  inventories: InventoryType[];
  isInventoriesLoading: boolean;
  errorInventories: string;
  inventorySelectedRows: InventoryType[];
  currentEditingInventory: InventoryType | null;
  // Form
  isInventoryFormOpen: boolean;
  inventoryNameForm: string | null;
  inventoryStatusForm: boolean | null;
  // Inventory Categories
  inventoryCategories: string[];
  isInventoriesCategoriesLoading: boolean;
  errorInventoriesCategories: string;
  inventoryCategoryForm: string | null;
  // Inventory Users
  inventoryUsers: string[];
  isInventoryUsersLoading: boolean;
  errorInventoryUsers: string;
  inventoryUsersForm: string[];
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
