import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { InventoryType } from 'src/app/types/inventory-management/inventory/inventoryPage.type';
import {
  inventories,
  inventoryCategories,
  inventoryUsers,
} from 'src/app/_fake/mockData';

@Injectable({
  providedIn: 'root',
})
export class InventoryManagementService {
  getInventories(): Observable<InventoryType[]> {
    return of(inventories).pipe(delay(4000));
  }
  getInventoryCategories(): Observable<string[]> {
    return of(inventoryCategories).pipe(delay(3000));
  }
  getInventoryUsers(): Observable<string[]> {
    return of(inventoryUsers).pipe(delay(2000));
  }
  postSubmitInventoryCreationForm(): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }
}
