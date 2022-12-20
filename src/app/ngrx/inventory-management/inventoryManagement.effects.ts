import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of } from 'rxjs';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';

@Injectable()
export class InventoryManagementEffects {
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

  constructor(
    private actions$: Actions,
    private inventoryManagementService: InventoryManagementService
  ) {}
}
