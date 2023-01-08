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

type InventoryActionsType = {
  getInventories: any;
  getInventoriesSuccess: any;
  getInventoriesFailure: any;
  getInventoryCategories: any;
  getInventoryCategoriesSuccess: any;
  getInventoryCategoriesFailure: any;
  getInventoryUsers: any;
  getInventoryUsersSuccess: any;
  getInventoryUsersFailure: any;
  // Post
  submitInventoryCreationForm: any;
  submitInventoryCreationFormSuccess: any;
  submitInventoryCreationFormFailure: any;
  // Table
  setInventorySelectedRows: any;
  setCurrentEditingInventory: any;
  // Form
  openInventoryForm: any;
  closeInventoryForm: any;
  inventoryNameFormUpdate: any;
  inventoryCategoryFormUpdate: any;
  inventoryStatusFormUpdate: any;
  inventoryUsersFormUpdate: any;
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
