import { AppStateInterface } from 'src/app/types/appState.interface';
import { createSelector } from '@ngrx/store';

export const selectInventoryManagementFeature = (state: AppStateInterface) =>
  state.inventoryManagement;

export const inventoriesSelector = createSelector(
  selectInventoryManagementFeature,
  (state) => state.inventories
);

export const inventoryFormStateSelector = createSelector(
  selectInventoryManagementFeature,
  (state) => state.isInventoryForm
);
