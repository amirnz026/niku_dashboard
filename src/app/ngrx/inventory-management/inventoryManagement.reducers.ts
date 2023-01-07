import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';

export const initialState: InventoryManagementStateType = {
  inventoryPage: {
    // Table
    inventories: [],
    isInventoriesLoading: false,
    errorInventories: '',
    inventorySelectedRows: [],
    currentEditingInventory: null,
    // Form
    isInventoryFormOpen: true,
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
};
export const inventoryManagementReducers = createReducer(
  // Inventory-Start
  // Get
  initialState,
  immerOn(imActions.getInventories, (state) => {
    state.inventoryPage.isInventoriesLoading = true;
  }),
  immerOn(imActions.getInventoriesSuccess, (state, action) => {
    state.inventoryPage.inventories = action.inventories;
    state.inventoryPage.isInventoriesLoading = false;
  }),
  immerOn(imActions.getInventoriesFailure, (state, action) => {
    state.inventoryPage.errorInventories = action.error;
    state.inventoryPage.isInventoriesLoading = false;
  }),
  immerOn(imActions.getInventoryCategories, (state) => {
    state.inventoryPage.isInventoriesCategoriesLoading = true;
  }),
  immerOn(imActions.getInventoryCategoriesSuccess, (state, action) => {
    state.inventoryPage.inventoryCategories = action.inventoryCategories;
    state.inventoryPage.isInventoriesCategoriesLoading = false;
  }),
  immerOn(imActions.getInventoryCategoriesFailure, (state, action) => {
    state.inventoryPage.errorInventoriesCategories = action.error;
    state.inventoryPage.isInventoriesCategoriesLoading = false;
  }),
  immerOn(imActions.getInventoryUsers, (state, action) => {
    state.inventoryPage.isInventoryUsersLoading = true;
  }),
  immerOn(imActions.getInventoryUsersSuccess, (state, action) => {
    state.inventoryPage.inventoryUsers = action.inventoryUsers;
    state.inventoryPage.isInventoryUsersLoading = false;
  }),
  immerOn(imActions.getInventoryUsersFailure, (state, action) => {
    state.inventoryPage.errorInventoryUsers = action.error;
    state.inventoryPage.isInventoryUsersLoading = false;
  }),
  // Table
  immerOn(imActions.setInventorySelectedRows, (state, action) => {
    state.inventoryPage.inventorySelectedRows = action.inventories;
  }),
  immerOn(imActions.setCurrentEditingInventory, (state, action) => {
    state.inventoryPage.currentEditingInventory = action.inventory;
  }),
  // Form
  immerOn(imActions.openInventoryForm, (state) => {
    state.inventoryPage.isInventoryFormOpen = true;
    state.inventoryPage.currentEditingInventory = null;
  }),
  immerOn(imActions.closeInventoryForm, (state) => {
    state.inventoryPage.isInventoryFormOpen = false;
    state.inventoryPage.currentEditingInventory = null;
  }),

  immerOn(imActions.inventoryNameFormUpdate, (state, action) => {
    state.inventoryPage.inventoryNameForm = action.inventoryName;
  }),
  immerOn(imActions.inventoryCategoryFormUpdate, (state, action) => {
    state.inventoryPage.inventoryCategoryForm = action.inventoryCategoryName;
  }),
  immerOn(imActions.inventoryStatusFormUpdate, (state, action) => {
    state.inventoryPage.inventoryStatusForm = action.status;
  }),
  immerOn(imActions.inventoryUsersFormUpdate, (state, action) => {
    state.inventoryPage.inventoryUsersForm = action.inventoryUsers;
  })
  // Inventory-End
);
