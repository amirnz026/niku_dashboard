import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of } from 'rxjs';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
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
      ofType(imActions.getInventories),
      mergeMap(() => {
        return this.inventoryManagementService.getInventories().pipe(
          map((inventories) =>
            imActions.getInventoriesSuccess({ inventories })
          ),
          catchError((error) =>
            of(imActions.getInventoriesFailure({ error: error.message }))
          )
        );
      })
    )
  );
  getInventoryCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(imActions.getInventoryCategories),
      mergeMap(() => {
        return this.inventoryManagementService.getInventoryCategories().pipe(
          map((inventoryCategories) =>
            imActions.getInventoryCategoriesSuccess({ inventoryCategories })
          ),
          catchError((error) =>
            of(
              imActions.getInventoryCategoriesFailure({ error: error.message })
            )
          )
        );
      })
    )
  );
  getInventoryUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(imActions.getInventoryUsers),
      mergeMap(() => {
        return this.inventoryManagementService.getInventoryUsers().pipe(
          map((inventoryUsers) =>
            imActions.getInventoryUsersSuccess({ inventoryUsers })
          ),
          catchError((error) =>
            of(imActions.getInventoryUsersFailure({ error: error.message }))
          )
        );
      })
    )
  );
  submitInventoryCreationForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(imActions.submitInventoryCreationForm),
      mergeMap(() => {
        return this.inventoryManagementService
          .postSubmitInventoryCreationForm()
          .pipe(
            map(() => imActions.submitInventoryCreationFormSuccess()),
            catchError((error) =>
              of(
                imActions.submitInventoryCreationFormFailure({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );

  // Inventory-End
}
