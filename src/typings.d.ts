declare var ClipboardJS: any;

type AppStateType = {
  tabsState: TabsStateType;
  inventoryManagement: InventoryManagementStateType;
};

interface InventoryManagementStateType {
  inventoryPage: InventoryPageStateType;
  categoryPage: CategoryPageStateType;
  unitPage: UnitPageStateType;
  productPage: ProductPageStateType;
}

type InventoryPageStateType = {
  // Table
  inventories: InventoryType[];
  isInventoriesLoading: boolean;
  errorInventories: string;
  inventorySelectedRows: InventoryType[];
  currentEditingInventory: InventoryType | null;
  inventorySearchFilter: string;
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
  setInventorySearchFilter: any;
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
type CategoryPageStateType = {
  // Table
  categories: CategoryType[];
  isCategoriesLoading: boolean;
  errorCategories: string;
  categorySelectedRows: CategoryType[];
  currentEditingCategory: CategoryType | null;
  categorySearchFilter: string;
  // Form
  isCategoryFormOpen: boolean;
  categoryNameForm: string | null;
  categoryStatusForm: boolean | null;
  categoryDescForm: string | null;
};

type CategoryActionsType = {
  // Get
  getCategories: any;
  getCategoriesSuccess: any;
  getCategoriesFailure: any;
  // Post
  submitCategoryCreationForm: any;
  submitCategoryCreationFormSuccess: any;
  submitCategoryCreationFormFailure: any;
  // Table
  setCategorySelectedRows: any;
  setCurrentEditingCategory: any;
  setCategorySearchFilter: any;
  // Form
  openCategoryForm: any;
  closeCategoryForm: any;
  categoryNameFormUpdate: any;
  categoryStatusFormUpdate: any;
  categoryDescFormUpdate: any;
};

type CategoryType = {
  name: string;
  status: string;
  desc: string;
};

type UnitPageStateType = {
  // Table
  units: UnitType[];
  isUnitsLoading: boolean;
  errorUnits: string;
  unitSelectedRows: UnitType[];
  currentEditingUnit: UnitType | null;
  unitSearchFilter: string;
  // Form
  isUnitFormOpen: boolean;
  unitNameForm: string | null;
  unitStatusForm: boolean | null;
};

type UnitActionsType = {
  // Get
  getUnits: any;
  getUnitsSuccess: any;
  getUnitsFailure: any;
  // Post
  submitUnitCreationForm: any;
  submitUnitCreationFormSuccess: any;
  submitUnitCreationFormFailure: any;
  // Table
  setUnitSelectedRows: any;
  setCurrentEditingUnit: any;
  setUnitSearchFilter: any;
  // Form
  openUnitForm: any;
  closeUnitForm: any;
  unitNameFormUpdate: any;
  unitStatusFormUpdate: any;
};

type UnitType = {
  name: string;
  status: string;
};

type ProductPageStateType = {
  // Table
  products: ProductType[];
  isProductsLoading: boolean;
  errorProducts: string;
  productSelectedRows: UnitType[];
  currentEditingProduct: UnitType | null;
  productSearchFilter: string;
  // Form
  isProductFormOpen: boolean;
  productNameForm: string | null;
  productStatusForm: boolean | null;
};

type ProductActionsType = {
  // Get
  getProducts: any;
  getProductsSuccess: any;
  getProductsFailure: any;
  // Post
  submitProductCreationForm: any;
  submitProductCreationFormSuccess: any;
  submitProductCreationFormFailure: any;
  // Table
  setProductSelectedRows: any;
  setCurrentEditingProduct: any;
  setProductSearchFilter: any;
  // Form
  openProductForm: any;
  closeProductForm: any;
  productNameFormUpdate: any;
  productStatusFormUpdate: any;
};

type ProductType = {
  name: string;
  status: string;
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
