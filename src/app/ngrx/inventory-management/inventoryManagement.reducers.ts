import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { inventoryActions } from './inventoryManagement.actions';

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
  })
  // Inventory-End
);
