import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';
import { InventoryCategoryInterface } from 'src/app/types/inventory-management/inventory/inventoryCategory.interface';
import { InventoryUserInterface } from 'src/app/types/inventory-management/inventory/inventoryUser.interface';
import {
  inventories,
  inventoryCategories,
  inventoryUsers,
} from 'src/app/_fake/mockData';

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
  getInventoryUsers(): Observable<InventoryUserInterface[]> {
    return of(inventoryUsers);
  }
}
