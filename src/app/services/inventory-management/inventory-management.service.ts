import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import {
  // Inventory-Start
  inventories,
  inventoryCategories,
  inventoryUsers,
  // Inventory-End
  // Category-Start
  categories,
  // Category-End
} from 'src/app/_fake/mockData';

@Injectable({
  providedIn: 'root',
})
export class InventoryManagementService {
  // Inventory-Start
  getInventories(): Observable<InventoryType[]> {
    return of(inventories).pipe(delay(0));
  }
  getInventoryCategories(): Observable<string[]> {
    return of(inventoryCategories).pipe(delay(0));
  }
  getInventoryUsers(): Observable<string[]> {
    return of(inventoryUsers).pipe(delay(0));
  }
  postSubmitInventoryCreationForm(): Observable<boolean> {
    return of(true).pipe(delay(0));
  }
  // Inventory-End

  // Category-Start
  getCategories(): Observable<CategoryType[]> {
    return of(categories).pipe(delay(0));
  }
  postSubmitCategoryCreationForm(): Observable<boolean> {
    return of(true).pipe(delay(0));
  }
  // Category-End
}
