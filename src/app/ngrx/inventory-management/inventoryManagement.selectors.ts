import { AppStateInterface } from 'src/app/types/appState.interface';
import { createSelector } from '@ngrx/store';

export const selectInventoryPageFeature = (state: AppStateInterface) =>
  state.inventoryManagement.inventoryPage;

export const inventoriesSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventories
);
export const isInventoriesLoadingSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.isInventoriesLoading
);

export const inventoryFormStateSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventoryFormState
);

export const inventoryCategoriesSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventoryCategories
);
export const isInventoryCategoriesLoadingSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.isInventoriesCategoriesLoading
);

export const inventoryUsersSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventoryUsers
);
export const isInventoryUsersLoadingSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.isInventoryUsersLoading
);
export const inventoryNameFormSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventoryNameForm
);
export const inventoryCategoryFormSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventoryCategoryForm
);
export const inventoryUsersFormSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventoryUsersForm
);
export const inventoryStatusFormSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventoryStatusForm
);
export const inventorySelectedRowsSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventorySelectedRows
);
export const inventorySelectedRowsCountSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventorySelectedRows.length
);

export const currentEditingInventorySelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.currentEditingInventory
);
