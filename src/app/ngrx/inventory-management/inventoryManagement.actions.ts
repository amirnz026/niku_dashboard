import { createAction, props } from '@ngrx/store';
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
