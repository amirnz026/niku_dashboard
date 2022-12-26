import { AppStateInterface } from 'src/app/types/appState.interface';
import { createSelector } from '@ngrx/store';

export const selectInventoryPageFeature = (state: AppStateInterface) =>
  state.inventoryManagement.inventoryPage;

export const inventoriesSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventories
);

export const inventoryFormStateSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.isInventoryForm
);

export const inventoryCategoriesSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventoryCategories
);

export const inventoryUsersSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventoryUsers
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
