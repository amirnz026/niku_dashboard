import { createAction, props } from '@ngrx/store';

// Inventory-Start
// Get
export const getInventories = createAction('[IM] Get Inventories');

export const getInventoriesSuccess = createAction(
  '[IM] Get Inventories Success',
  props<{ inventories: InventoryType[] }>()
);

export const getInventoriesFailure = createAction(
  '[IM] Get Inventories Failure',
  props<{ error: 'error while fetching inventories' }>()
);

export const getInventoryCategories = createAction(
  '[IM] Get Inventory Categories'
);
export const getInventoryCategoriesSuccess = createAction(
  '[IM] Get Inventory Categories Success',
  props<{ inventoryCategories: string[] }>()
);
export const getInventoryCategoriesFailure = createAction(
  '[IM] Get Inventory Categories Failure',
  props<{ error: 'error while fetching inventory categories' }>()
);

export const getInventoryUsers = createAction('[IM] Get Inventory Users');
export const getInventoryUsersSuccess = createAction(
  '[IM] Get Inventory Users Success',
  props<{ inventoryUsers: string[] }>()
);
export const getInventoryUsersFailure = createAction(
  '[IM] Get Inventory Users Failure',
  props<{ error: 'error while fetching inventory users' }>()
);
// Post
export const submitInventoryCreationForm = createAction(
  '[IM] Submit Inventory Creation Form'
);

export const submitInventoryCreationFormSuccess = createAction(
  '[IM] Submit Inventory Creation Form Success'
);
export const submitInventoryCreationFormFailure = createAction(
  '[IM] Submit Inventory Creation Form Failure',
  props<{ error: 'An error occurred while submitting the form' }>()
);
// Table
export const setInventorySelectedRows = createAction(
  '[IM] Set Inventory Selected Rows',
  props<{ inventories: InventoryType[] }>()
);
export const setCurrentEditingInventory = createAction(
  '[IM] Change Current Editing Row',
  props<{ inventory: InventoryType | null }>()
);
// Form
export const openInventoryForm = createAction('[IM] Open Inventory Form');

export const closeInventoryForm = createAction('[IM] Close Inventory Form');

export const inventoryNameFormUpdate = createAction(
  '[IM] Change Inventory Name Form Element',
  props<{ inventoryName: string | null }>()
);
export const inventoryCategoryFormUpdate = createAction(
  '[IM] Change Inventory Category Name Form Element',
  props<{ inventoryCategoryName: string | null }>()
);
export const inventoryStatusFormUpdate = createAction(
  '[IM] Change Inventory Status Form Element',
  props<{ status: boolean }>()
);
export const inventoryUsersFormUpdate = createAction(
  '[IM] Change Inventory Users Form Element',
  props<{ inventoryUsers: string[] }>()
);

// Inventory-End
