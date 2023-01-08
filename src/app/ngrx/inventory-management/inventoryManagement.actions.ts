import { createAction, props } from '@ngrx/store';

// Inventory-Start
// Get
export const inventoryActions: InventoryActionsType = {
  getInventories: createAction('[Inventory] Get Inventories'),

  getInventoriesSuccess: createAction(
    '[Inventory] Get Inventories Success',
    props<{ inventories: InventoryType[] }>()
  ),

  getInventoriesFailure: createAction(
    '[Inventory] Get Inventories Failure',
    props<{ error: 'error while fetching inventories' }>()
  ),

  getInventoryCategories: createAction('[Inventory] Get Inventory Categories'),
  getInventoryCategoriesSuccess: createAction(
    '[Inventory] Get Inventory Categories Success',
    props<{ inventoryCategories: string[] }>()
  ),
  getInventoryCategoriesFailure: createAction(
    '[Inventory] Get Inventory Categories Failure',
    props<{ error: 'error while fetching inventory categories' }>()
  ),

  getInventoryUsers: createAction('[Inventory] Get Inventory Users'),
  getInventoryUsersSuccess: createAction(
    '[Inventory] Get Inventory Users Success',
    props<{ inventoryUsers: string[] }>()
  ),
  getInventoryUsersFailure: createAction(
    '[Inventory] Get Inventory Users Failure',
    props<{ error: 'error while fetching inventory users' }>()
  ),
  // Post
  submitInventoryCreationForm: createAction(
    '[Inventory] Submit Inventory Creation Form'
  ),

  submitInventoryCreationFormSuccess: createAction(
    '[Inventory] Submit Inventory Creation Form Success'
  ),
  submitInventoryCreationFormFailure: createAction(
    '[Inventory] Submit Inventory Creation Form Failure',
    props<{ error: 'An error occurred while submitting the form' }>()
  ),
  // Table
  setInventorySelectedRows: createAction(
    '[Inventory] Set Inventory Selected Rows',
    props<{ rows: InventoryType[] }>()
  ),
  setCurrentEditingInventory: createAction(
    '[Inventory] Change Current Editing Row',
    props<{ row: InventoryType | null }>()
  ),
  // Form
  openInventoryForm: createAction('[Inventory] Open Inventory Form'),

  closeInventoryForm: createAction('[Inventory] Close Inventory Form'),

  inventoryNameFormUpdate: createAction(
    '[Inventory] Change Inventory Name Form Element',
    props<{ inventoryName: string | null }>()
  ),
  inventoryCategoryFormUpdate: createAction(
    '[Inventory] Change Inventory Category Name Form Element',
    props<{ inventoryCategoryName: string | null }>()
  ),
  inventoryStatusFormUpdate: createAction(
    '[Inventory] Change Inventory Status Form Element',
    props<{ status: boolean }>()
  ),
  inventoryUsersFormUpdate: createAction(
    '[Inventory] Change Inventory Users Form Element',
    props<{ inventoryUsers: string[] }>()
  ),

  // Inventory-End
};
