import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { InventoryManagementInterface } from 'src/app/types/inventory-management/inventoryManagement.interface';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';

export const initialState: InventoryManagementInterface = {
  inventoryPage: {
    inventories: [],
    isInventoriesLoading: false,
    errorInventories: '',
    inventorySelectedRows: [],
    inventoryFormState: 'create',
    // Form
    inventoryCategories: [],
    isInventoriesCategoriesLoading: false,
    errorInventoriesCategories: '',
    inventoryUsers: [],
    isInventoryUsersLoading: false,
    errorInventoryUsers: '',
    // Form Elements
    inventoryNameForm: null,
    inventoryCategoryForm: null,
    inventoryUsersForm: [],
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
  immerOn(imActions.inventoryFormStateToEdit, (state) => {
    state.inventoryPage.inventoryFormState = 'edit';
  }),
  immerOn(imActions.inventoryFormStateToCreate, (state) => {
    state.inventoryPage.inventoryFormState = 'create';
  }),
  immerOn(imActions.closeInventoryForm, (state) => {
    state.inventoryPage.inventoryFormState = null;
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
  }),
  immerOn(imActions.setInventorySelectedRows, (state, action) => {
    state.inventoryPage.inventorySelectedRows = action.inventories;
  })
);
