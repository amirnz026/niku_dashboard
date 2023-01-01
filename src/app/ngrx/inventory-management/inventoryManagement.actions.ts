import { createAction, props } from '@ngrx/store';
import { CellClickedEvent } from 'ag-grid-community';
import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';
import { InventoryCategoryInterface } from 'src/app/types/inventory-management/inventory/inventoryCategory.interface';
import { InventoryUserInterface } from 'src/app/types/inventory-management/inventory/inventoryUser.interface';

export const getInventories = createAction(
  '[Inventory Management] Get Inventories'
);

export const getInventoriesSuccess = createAction(
  '[Inventory Management] Get Inventories Success',
  props<{ inventories: InventoryInterface[] }>()
);

export const getInventoriesFailure = createAction(
  '[Inventory Management] Get Inventories Failure',
  props<{ error: 'error while fetching inventories' }>()
);

export const inventoryFormStateToEdit = createAction(
  '[Inventory Management] Change Inventory Form State To Edit'
);

export const inventoryFormStateToCreate = createAction(
  '[Inventory Management] Change Inventory Form State To Create'
);

export const closeInventoryForm = createAction(
  '[Inventory Management] Change Inventory Form State To Null'
);

export const getInventoryCategories = createAction(
  '[Inventory Management] Get Inventory Categories'
);
export const getInventoryCategoriesSuccess = createAction(
  '[Inventory Management] Get Inventory Categories Success',
  props<{ inventoryCategories: InventoryCategoryInterface[] }>()
);
export const getInventoryCategoriesFailure = createAction(
  '[Inventory Management] Get Inventory Categories Failure',
  props<{ error: 'error while fetching inventory categories' }>()
);

export const getInventoryUsers = createAction(
  '[Inventory Management] Get Inventory Users'
);
export const getInventoryUsersSuccess = createAction(
  '[Inventory Management] Get Inventory Users Success',
  props<{ inventoryUsers: InventoryUserInterface[] }>()
);
export const getInventoryUsersFailure = createAction(
  '[Inventory Management] Get Inventory Users Failure',
  props<{ error: 'error while fetching inventory users' }>()
);

export const inventoryNameFormUpdate = createAction(
  '[Inventory Management] Change Inventory Name Form Element',
  props<{ inventoryName: string }>()
);
export const inventoryCategoryFormUpdate = createAction(
  '[Inventory Management] Change Inventory Category Name Form Element',
  props<{ inventoryCategoryName: InventoryCategoryInterface }>()
);
export const inventoryUsersFormUpdate = createAction(
  '[Inventory Management] Change Inventory Users Form Element',
  props<{ inventoryUsers: InventoryUserInterface[] }>()
);
export const inventoryStatusFormUpdate = createAction(
  '[Inventory Management] Change Inventory Status Form Element',
  props<{ status: boolean }>()
);
export const submitInventoryCreationForm = createAction(
  '[Inventory Management] Submit Inventory Creation Form'
);

export const submitInventoryCreationFormSuccess = createAction(
  '[Inventory Management] Submit Inventory Creation Form Success'
);
export const submitInventoryCreationFormFailure = createAction(
  '[Inventory Management] Submit Inventory Creation Form Failure',
  props<{ error: 'An error occurred while submitting the form' }>()
);

export const setInventorySelectedRows = createAction(
  '[Inventory Management] Set Inventory Selected Rows',
  props<{ inventories: InventoryInterface[] }>()
);
