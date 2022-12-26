import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { InventoryManagementInterface } from 'src/app/types/inventory-management/inventoryManagement.interface';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';

export const initialState: InventoryManagementInterface = {
  inventoryPage: {
    inventories: [],
    isInventoriesLoading: false,
    errorInventories: '',
    // Form
    isInventoryForm: true,
    inventoryCategories: [],
    isInventoriesCategoriesLoading: false,
    errorInventoriesCategories: '',
    inventoryUsers: [],
    inInventoryUsersLoading: false,
    errorInventoryUsers: '',
    // Form Elements
    inventoryNameForm: null,
    inventoryCategoryForm: null,
    inventoryUsersForm: null,
    inventoryStatusForm: null,
  },
};
export const inventoryManagementReducers = createReducer(
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
  immerOn(imActions.openInventoryForm, (state) => {
    state.inventoryPage.isInventoryForm = true;
  }),
  immerOn(imActions.closeInventoryForm, (state) => {
    state.inventoryPage.isInventoryForm = false;
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
    state.inventoryPage.inInventoryUsersLoading = true;
  }),
  immerOn(imActions.getInventoryUsersSuccess, (state, action) => {
    state.inventoryPage.inventoryUsers = action.inventoryUsers;
    state.inventoryPage.inInventoryUsersLoading = false;
  }),
  immerOn(imActions.getInventoryUsersFailure, (state, action) => {
    state.inventoryPage.errorInventoryUsers = action.error;
    state.inventoryPage.inInventoryUsersLoading = false;
  }),
  immerOn(imActions.inventoryNameFormUpdate, (state, action) => {
    state.inventoryPage.inventoryNameForm = action.inventoryName;
  }),
  immerOn(imActions.inventoryCategoryFormUpdate, (state, action) => {
    state.inventoryPage.inventoryCategoryForm = action.inventoryCategoryName;
  }),
  immerOn(imActions.inventoryUsersFormUpdate, (state, action) => {
    state.inventoryPage.inventoryUsersForm = action.inventoryUsers;
  }),
  immerOn(imActions.inventoryStatusFormUpdate, (state, action) => {
    state.inventoryPage.inventoryStatusForm = action.status;
  })
);
