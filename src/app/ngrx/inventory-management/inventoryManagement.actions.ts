import { createAction, props } from '@ngrx/store';

// Inventory-Start
export const inventoryActions: InventoryActionsType = {
  // Get
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
  setInventorySearchFilter: createAction(
    '[Inventory] Change Inventory Search Field',
    props<{ input: string | null }>()
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

// Inventory-Start
export const categoryActions: CategoryActionsType = {
  // Get
  getCategories: createAction('[Category] Get Categories'),

  getCategoriesSuccess: createAction(
    '[Category] Get Category Success',
    props<{ items: CategoryType[] }>()
  ),

  getCategoriesFailure: createAction(
    '[Category] Get Category Failure',
    props<{ error: 'error while fetching categories' }>()
  ),

  // Post
  submitCategoryCreationForm: createAction(
    '[Category] Submit Category Creation Form'
  ),

  submitCategoryCreationFormSuccess: createAction(
    '[Category] Submit Category Creation Form Success'
  ),
  submitCategoryCreationFormFailure: createAction(
    '[Category] Submit Category Creation Form Failure',
    props<{ error: 'An error occurred while submitting the form' }>()
  ),
  // Table
  setCategorySelectedRows: createAction(
    '[Category] Set Category Selected Rows',
    props<{ rows: CategoryType[] }>()
  ),
  setCurrentEditingCategory: createAction(
    '[Category] Change Current Editing Row',
    props<{ row: CategoryType | null }>()
  ),
  setCategorySearchFilter: createAction(
    '[Category] Change Category Search Field',
    props<{ input: string }>()
  ),
  // Form
  openCategoryForm: createAction('[Category] Open Category Form'),

  closeCategoryForm: createAction('[Category] Close Category Form'),

  categoryNameFormUpdate: createAction(
    '[Category] Change Category Name Form Element',
    props<{ name: string | null }>()
  ),
  categoryStatusFormUpdate: createAction(
    '[Category] Change Category Status Form Element',
    props<{ status: boolean }>()
  ),
  categoryDescFormUpdate: createAction(
    '[Category] Change Category Desc Form Element',
    props<{ desc: string | null }>()
  ),

  // Inventory-End
};
