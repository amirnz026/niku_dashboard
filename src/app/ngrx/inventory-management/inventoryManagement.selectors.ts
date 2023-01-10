import { createSelector } from '@ngrx/store';

export const selectInventoryPageFeature = (state: AppStateType) =>
  state.inventoryManagement.inventoryPage;

export const selectCategoryPageFeature = (state: AppStateType) =>
  state.inventoryManagement.categoryPage;

export const selectUnitPageFeature = (state: AppStateType) =>
  state.inventoryManagement.unitPage;

export const selectProductPageFeature = (state: AppStateType) =>
  state.inventoryManagement.productPage;
// Inventory-Selectors-Start
// Table-Start
export const inventoriesSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventories
);
export const isInventoriesLoadingSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.isInventoriesLoading
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
export const inventorySearchFilterSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.inventorySearchFilter
);
// Table-End
export const isInventoryFormOpenSelector = createSelector(
  selectInventoryPageFeature,
  (state) => state.isInventoryFormOpen
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

// Inventory-Selectors-End

// Category-Selectors-Start
// Table-Start
export const categoriesSelector = createSelector(
  selectCategoryPageFeature,
  (state) => state.categories
);
export const categorySelectedRowsSelector = createSelector(
  selectCategoryPageFeature,
  (state) => state.categorySelectedRows
);
export const categorySelectedRowsCountSelector = createSelector(
  selectCategoryPageFeature,
  (state) => state.categorySelectedRows.length
);
export const currentEditingCategorySelector = createSelector(
  selectCategoryPageFeature,
  (state) => state.currentEditingCategory
);
export const categorySearchFilterSelector = createSelector(
  selectCategoryPageFeature,
  (state) => state.categorySearchFilter
);
// Table-End
export const isCategoriesLoadingSelector = createSelector(
  selectCategoryPageFeature,
  (state) => state.isCategoriesLoading
);
export const isCategoryFormOpenSelector = createSelector(
  selectCategoryPageFeature,
  (state) => state.isCategoryFormOpen
);
export const categoryNameFormSelector = createSelector(
  selectCategoryPageFeature,
  (state) => state.categoryNameForm
);
export const categoryStatusFormSelector = createSelector(
  selectCategoryPageFeature,
  (state) => state.categoryStatusForm
);
export const categoryDescFormSelector = createSelector(
  selectCategoryPageFeature,
  (state) => state.categoryDescForm
);

// Category-Selectors-End

// Unit-Selectors-Start
// Table-Start
export const unitsSelector = createSelector(
  selectUnitPageFeature,
  (state) => state.units
);
export const unitSelectedRowsSelector = createSelector(
  selectUnitPageFeature,
  (state) => state.unitSelectedRows
);
export const unitSelectedRowsCountSelector = createSelector(
  selectUnitPageFeature,
  (state) => state.unitSelectedRows.length
);
export const currentEditingUnitSelector = createSelector(
  selectUnitPageFeature,
  (state) => state.currentEditingUnit
);
export const unitSearchFilterSelector = createSelector(
  selectUnitPageFeature,
  (state) => state.unitSearchFilter
);
// Table-End
export const isUnitsLoadingSelector = createSelector(
  selectUnitPageFeature,
  (state) => state.isUnitsLoading
);
export const isUnitFormOpenSelector = createSelector(
  selectUnitPageFeature,
  (state) => state.isUnitFormOpen
);
export const unitNameFormSelector = createSelector(
  selectUnitPageFeature,
  (state) => state.unitNameForm
);
export const unitStatusFormSelector = createSelector(
  selectUnitPageFeature,
  (state) => state.unitStatusForm
);

// Unit-Selectors-End

// Product-Selectors-Start
// Table-Start
export const productsSelector = createSelector(
  selectProductPageFeature,
  (state) => state.products
);
export const productSelectedRowsSelector = createSelector(
  selectProductPageFeature,
  (state) => state.productSelectedRows
);
export const productSelectedRowsCountSelector = createSelector(
  selectProductPageFeature,
  (state) => state.productSelectedRows.length
);
export const currentEditingProductSelector = createSelector(
  selectProductPageFeature,
  (state) => state.currentEditingProduct
);
export const productSearchFilterSelector = createSelector(
  selectProductPageFeature,
  (state) => state.productSearchFilter
);
// Table-End
export const isProductsLoadingSelector = createSelector(
  selectProductPageFeature,
  (state) => state.isProductsLoading
);
export const isProductFormOpenSelector = createSelector(
  selectProductPageFeature,
  (state) => state.isProductFormOpen
);
export const productNameFormSelector = createSelector(
  selectProductPageFeature,
  (state) => state.productNameForm
);
export const productStatusFormSelector = createSelector(
  selectProductPageFeature,
  (state) => state.productStatusForm
);

// Product-Selectors-End
