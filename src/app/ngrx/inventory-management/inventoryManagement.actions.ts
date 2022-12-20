import { createAction, props } from '@ngrx/store';
import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';

export const getInventories = createAction(
  '[Inventory Management] Get Inventories'
);

export const getInventoriesSuccess = createAction(
  '[Inventory Management] Get Inventories Success',
  props<{ inventories: InventoryInterface[] }>()
);

export const getInventoriesFailure = createAction(
  '[Inventory Management] Get Inventories Failure',
  props<{ error: 'An error has occurred while fetching inventories' }>()
);
