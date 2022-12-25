import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';
import { InventoryCategoryInterface } from 'src/app/types/inventory-management/inventory/inventoryCategory.interface';
import { inventories, inventoryCategories } from 'src/app/_fake/mockData';

@Injectable({
  providedIn: 'root',
})
export class InventoryManagementService {
  constructor() {}

  getInventories(): Observable<InventoryInterface[]> {
    return of(inventories);
  }
  getInventoryCategories(): Observable<InventoryCategoryInterface[]> {
    return of(inventoryCategories);
  }
}
