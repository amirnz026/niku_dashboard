import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import {
  categoryActions,
  inventoryActions,
  productActions,
  unitActions,
} from './inventoryManagement.actions';

export const initialState: InventoryManagementStateType = {
  inventoryPage: {
    // Table
    inventories: [],
    isInventoriesLoading: false,
    errorInventories: '',
    inventorySelectedRows: [],
    currentEditingInventory: null,
    inventorySearchFilter: '',
    // Form
    isInventoryFormOpen: false,
    inventoryNameForm: null,
    inventoryStatusForm: null,
    // Inventory Categories
    inventoryCategories: [],
    isInventoriesCategoriesLoading: false,
    errorInventoriesCategories: '',
    inventoryCategoryForm: null,
    // Inventory Users
    inventoryUsers: [],
    isInventoryUsersLoading: false,
    errorInventoryUsers: '',
    inventoryUsersForm: [],
  },
  categoryPage: {
    categories: [],
    isCategoriesLoading: false,
    errorCategories: '',
    categorySelectedRows: [],
    currentEditingCategory: null,
    categorySearchFilter: '',
    // Form
    isCategoryFormOpen: false,
    categoryNameForm: null,
    categoryStatusForm: null,
    categoryDescForm: null,
  },
  unitPage: {
    units: [],
    isUnitsLoading: false,
    errorUnits: '',
    unitSelectedRows: [],
    currentEditingUnit: null,
    unitSearchFilter: '',
    // Form
    isUnitFormOpen: false,
    unitNameForm: null,
    unitStatusForm: null,
  },
  productPage: {
    products: [],
    isProductsLoading: false,
    errorProducts: '',
    productSelectedRows: [],
    currentEditingProduct: null,
    productSearchFilter: '',
    // Form
    isProductFormOpen: true,
    productNameForm: null,
    productStatusForm: null,
  },
};

export const inventoryManagementReducers = createReducer(
  // Inventory-Start
  // Get
  initialState,
  immerOn(inventoryActions.getInventories, (state) => {
    state.inventoryPage.isInventoriesLoading = true;
  }),
  immerOn(inventoryActions.getInventoriesSuccess, (state, action) => {
    state.inventoryPage.inventories = action.inventories;
    state.inventoryPage.isInventoriesLoading = false;
  }),
  immerOn(inventoryActions.getInventoriesFailure, (state, action) => {
    state.inventoryPage.errorInventories = action.error;
    state.inventoryPage.isInventoriesLoading = false;
  }),
  immerOn(inventoryActions.getInventoryCategories, (state) => {
    state.inventoryPage.isInventoriesCategoriesLoading = true;
  }),
  immerOn(inventoryActions.getInventoryCategoriesSuccess, (state, action) => {
    state.inventoryPage.inventoryCategories = action.inventoryCategories;
    state.inventoryPage.isInventoriesCategoriesLoading = false;
  }),
  immerOn(inventoryActions.getInventoryCategoriesFailure, (state, action) => {
    state.inventoryPage.errorInventoriesCategories = action.error;
    state.inventoryPage.isInventoriesCategoriesLoading = false;
  }),
  immerOn(inventoryActions.getInventoryUsers, (state, action) => {
    state.inventoryPage.isInventoryUsersLoading = true;
  }),
  immerOn(inventoryActions.getInventoryUsersSuccess, (state, action) => {
    state.inventoryPage.inventoryUsers = action.inventoryUsers;
    state.inventoryPage.isInventoryUsersLoading = false;
  }),
  immerOn(inventoryActions.getInventoryUsersFailure, (state, action) => {
    state.inventoryPage.errorInventoryUsers = action.error;
    state.inventoryPage.isInventoryUsersLoading = false;
  }),
  // Table
  immerOn(inventoryActions.setInventorySelectedRows, (state, action) => {
    state.inventoryPage.inventorySelectedRows = action.rows;
  }),
  immerOn(inventoryActions.setCurrentEditingInventory, (state, action) => {
    state.inventoryPage.currentEditingInventory = action.row;
  }),
  immerOn(inventoryActions.setInventorySearchFilter, (state, action) => {
    state.inventoryPage.inventorySearchFilter = action.input;
  }),
  // Form
  immerOn(inventoryActions.openInventoryForm, (state) => {
    state.inventoryPage.isInventoryFormOpen = true;
    state.inventoryPage.currentEditingInventory = null;
    state.inventoryPage.inventoryNameForm = '';
    state.inventoryPage.inventoryStatusForm = true;
    state.inventoryPage.inventoryCategoryForm = null;
    state.inventoryPage.inventoryUsersForm = [];
  }),
  immerOn(inventoryActions.closeInventoryForm, (state) => {
    state.inventoryPage.isInventoryFormOpen = false;
    state.inventoryPage.currentEditingInventory = null;
  }),

  immerOn(inventoryActions.inventoryNameFormUpdate, (state, action) => {
    state.inventoryPage.inventoryNameForm = action.inventoryName;
  }),
  immerOn(inventoryActions.inventoryCategoryFormUpdate, (state, action) => {
    state.inventoryPage.inventoryCategoryForm = action.inventoryCategoryName;
  }),
  immerOn(inventoryActions.inventoryStatusFormUpdate, (state, action) => {
    state.inventoryPage.inventoryStatusForm = action.status;
  }),
  immerOn(inventoryActions.inventoryUsersFormUpdate, (state, action) => {
    state.inventoryPage.inventoryUsersForm = action.inventoryUsers;
  }),
  // Inventory-End
  // Category-Start
  // Get
  immerOn(categoryActions.getCategories, (state) => {
    state.categoryPage.isCategoriesLoading = true;
  }),
  immerOn(categoryActions.getCategoriesSuccess, (state, action) => {
    state.categoryPage.categories = action.items;
    state.categoryPage.isCategoriesLoading = false;
  }),
  immerOn(categoryActions.getCategoriesFailure, (state, action) => {
    state.categoryPage.errorCategories = action.error;
    state.categoryPage.isCategoriesLoading = false;
  }),
  // Table
  immerOn(categoryActions.setCategorySelectedRows, (state, action) => {
    state.categoryPage.categorySelectedRows = action.rows;
  }),
  immerOn(categoryActions.setCurrentEditingCategory, (state, action) => {
    state.categoryPage.currentEditingCategory = action.row;
  }),
  immerOn(categoryActions.setCategorySearchFilter, (state, action) => {
    state.categoryPage.categorySearchFilter = action.input;
  }),
  // Form
  immerOn(categoryActions.openCategoryForm, (state) => {
    state.categoryPage.isCategoryFormOpen = true;
    state.categoryPage.currentEditingCategory = null;
    state.categoryPage.categoryNameForm = '';
    state.categoryPage.categoryStatusForm = true;
    state.categoryPage.categoryDescForm = '';
  }),
  immerOn(categoryActions.closeCategoryForm, (state) => {
    state.categoryPage.isCategoryFormOpen = false;
    state.categoryPage.currentEditingCategory = null;
  }),

  immerOn(categoryActions.categoryNameFormUpdate, (state, action) => {
    state.categoryPage.categoryNameForm = action.name;
  }),
  immerOn(categoryActions.categoryStatusFormUpdate, (state, action) => {
    state.categoryPage.categoryStatusForm = action.status;
  }),
  immerOn(categoryActions.categoryDescFormUpdate, (state, action) => {
    state.categoryPage.categoryDescForm = action.desc;
  }),
  // Category-End
  // Unit-Start
  // Get
  immerOn(unitActions.getUnits, (state) => {
    state.unitPage.isUnitsLoading = true;
  }),
  immerOn(unitActions.getUnitsSuccess, (state, action) => {
    state.unitPage.units = action.items;
    state.unitPage.isUnitsLoading = false;
  }),
  immerOn(unitActions.getUnitsFailure, (state, action) => {
    state.unitPage.errorUnits = action.error;
    state.unitPage.isUnitsLoading = false;
  }),
  // Table
  immerOn(unitActions.setUnitSelectedRows, (state, action) => {
    state.unitPage.unitSelectedRows = action.rows;
  }),
  immerOn(unitActions.setCurrentEditingUnit, (state, action) => {
    state.unitPage.currentEditingUnit = action.row;
  }),
  immerOn(unitActions.setUnitSearchFilter, (state, action) => {
    state.unitPage.unitSearchFilter = action.input;
  }),
  // Form
  immerOn(unitActions.openUnitForm, (state) => {
    state.unitPage.isUnitFormOpen = true;
    state.unitPage.currentEditingUnit = null;
    state.unitPage.unitNameForm = '';
    state.unitPage.unitStatusForm = true;
  }),
  immerOn(unitActions.closeUnitForm, (state) => {
    state.unitPage.isUnitFormOpen = false;
    state.unitPage.currentEditingUnit = null;
  }),

  immerOn(unitActions.unitNameFormUpdate, (state, action) => {
    state.unitPage.unitNameForm = action.name;
  }),
  immerOn(unitActions.unitStatusFormUpdate, (state, action) => {
    state.unitPage.unitStatusForm = action.status;
  }),

  // Unit-End

  // Product-Start
  // Get
  immerOn(productActions.getProducts, (state) => {
    state.productPage.isProductsLoading = true;
  }),
  immerOn(productActions.getProductsSuccess, (state, action) => {
    state.productPage.products = action.items;
    state.productPage.isProductsLoading = false;
  }),
  immerOn(productActions.getProductsFailure, (state, action) => {
    state.productPage.errorProducts = action.error;
    state.productPage.isProductsLoading = false;
  }),
  // Table
  immerOn(productActions.setProductSelectedRows, (state, action) => {
    state.productPage.productSelectedRows = action.rows;
  }),
  immerOn(productActions.setCurrentEditingProduct, (state, action) => {
    state.productPage.currentEditingProduct = action.row;
  }),
  immerOn(productActions.setProductSearchFilter, (state, action) => {
    state.productPage.productSearchFilter = action.input;
  }),
  // Form
  immerOn(productActions.openProductForm, (state) => {
    state.productPage.isProductFormOpen = true;
    state.productPage.currentEditingProduct = null;
    state.productPage.productNameForm = '';
    state.productPage.productStatusForm = true;
  }),
  immerOn(productActions.closeProductForm, (state) => {
    state.productPage.isProductFormOpen = false;
    state.productPage.currentEditingProduct = null;
  }),

  immerOn(productActions.productNameFormUpdate, (state, action) => {
    state.productPage.productNameForm = action.name;
  }),
  immerOn(productActions.productStatusFormUpdate, (state, action) => {
    state.productPage.productStatusForm = action.status;
  })

  // Product-End
);
