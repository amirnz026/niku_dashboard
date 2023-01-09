import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of } from 'rxjs';
import {
  categoryActions,
  inventoryActions,
} from './inventoryManagement.actions';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';

@Injectable()
export class InventoryManagementEffects {
  constructor(
    private actions$: Actions,
    private inventoryManagementService: InventoryManagementService
  ) {}
  // Inventory-Start
  getInventories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.getInventories),
      mergeMap(() => {
        return this.inventoryManagementService.getInventories().pipe(
          map((inventories) =>
            inventoryActions.getInventoriesSuccess({ inventories })
          ),
          catchError((error) =>
            of(inventoryActions.getInventoriesFailure({ error: error.message }))
          )
        );
      })
    )
  );
  getInventoryCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.getInventoryCategories),
      mergeMap(() => {
        return this.inventoryManagementService.getInventoryCategories().pipe(
          map((inventoryCategories) =>
            inventoryActions.getInventoryCategoriesSuccess({
              inventoryCategories,
            })
          ),
          catchError((error) =>
            of(
              inventoryActions.getInventoryCategoriesFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  getInventoryUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.getInventoryUsers),
      mergeMap(() => {
        return this.inventoryManagementService.getInventoryUsers().pipe(
          map((inventoryUsers) =>
            inventoryActions.getInventoryUsersSuccess({ inventoryUsers })
          ),
          catchError((error) =>
            of(
              inventoryActions.getInventoryUsersFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  submitInventoryCreationForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.submitInventoryCreationForm),
      mergeMap(() => {
        return this.inventoryManagementService
          .postSubmitInventoryCreationForm()
          .pipe(
            map(() => inventoryActions.submitInventoryCreationFormSuccess()),
            catchError((error) =>
              of(
                inventoryActions.submitInventoryCreationFormFailure({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );

  // Inventory-End

  // Category-Start
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.getCategories),
      mergeMap(() => {
        return this.inventoryManagementService.getCategories().pipe(
          map((categories) =>
            categoryActions.getCategoriesSuccess({ items: categories })
          ),
          catchError((error) =>
            of(categoryActions.getCategoriesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  submitCategoryCreationForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.submitCategoryCreationForm),
      mergeMap(() => {
        return this.inventoryManagementService
          .postSubmitCategoryCreationForm()
          .pipe(
            map(() => categoryActions.submitCategoryCreationFormSuccess()),
            catchError((error) =>
              of(
                categoryActions.submitCategoryCreationFormFailure({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );
  // Category-End
}
