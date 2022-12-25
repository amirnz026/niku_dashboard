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
  })
);
