import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import {
  categoryActions,
  inventoryActions,
} from './inventoryManagement.actions';

export const initialState: InventoryManagementStateType = {
  inventoryPage: {
    // Table
    inventories: [],
    isInventoriesLoading: false,
    errorInventories: '',
    inventorySelectedRows: [],
    currentEditingInventory: null,
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
    // Form
    isCategoryFormOpen: false,
    categoryNameForm: null,
    categoryStatusForm: null,
    categoryDescForm: null,
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
  })
  // Category-End
);
