import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { InventoryManagementInterface } from 'src/app/types/inventory-management/inventoryManagement.interface';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';

export const initialState: InventoryManagementInterface = {
  inventories: [],
  isInventoryForm: true,
  isLoading: false,
  error: '',
};
export const inventoryManagementReducers = createReducer(
  initialState,
  immerOn(imActions.getInventories, (state) => {
    state.isLoading = true;
  }),
  immerOn(imActions.getInventoriesSuccess, (state, action) => {
    state.inventories = action.inventories;
    state.isLoading = false;
  }),
  immerOn(imActions.getInventoriesFailure, (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  }),
  immerOn(imActions.openInventoryForm, (state) => {
    state.isInventoryForm = true;
  }),
  immerOn(imActions.closeInventoryForm, (state) => {
    state.isInventoryForm = false;
  })
);
