import { createAction, props } from '@ngrx/store';

export const getInventories = createAction(
  '[Inventory Management] Get Inventories'
);

export const getInventoriesSuccess = createAction(
  '[Inventory Management] Get Inventories Success',
  props<{ inventories: InventoryType[] }>()
);

export const getInventoriesFailure = createAction(
  '[Inventory Management] Get Inventories Failure',
  props<{ error: 'error while fetching inventories' }>()
);

export const inventoryFormStateToEdit = createAction(
  '[Inventory Management] Change Inventory Form State To Edit'
);

export const setCurrentEditingInventory = createAction(
  '[Inventory Management] Change Current Editing Row',
  props<{ inventory: InventoryType | null }>()
);

export const inventoryFormStateToCreate = createAction(
  '[Inventory Management] Change Inventory Form State To Create'
);

export const openInventoryForm = createAction(
  '[Inventory Management] Open Inventory Form'
);

export const closeInventoryForm = createAction(
  '[Inventory Management] Close Inventory Form'
);

export const getInventoryCategories = createAction(
  '[Inventory Management] Get Inventory Categories'
);
export const getInventoryCategoriesSuccess = createAction(
  '[Inventory Management] Get Inventory Categories Success',
  props<{ inventoryCategories: string[] }>()
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
  props<{ inventoryUsers: string[] }>()
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
  props<{ inventoryCategoryName: string | null }>()
);
export const inventoryUsersFormUpdate = createAction(
  '[Inventory Management] Change Inventory Users Form Element',
  props<{ inventoryUsers: string[] }>()
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
  props<{ inventories: InventoryType[] }>()
);
