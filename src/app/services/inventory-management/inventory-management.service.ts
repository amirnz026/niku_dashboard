import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';
import { inventories } from 'src/app/_fake/mockData';

@Injectable({
  providedIn: 'root',
})
export class InventoryManagementService {
  constructor() {}

  getInventories(): Observable<InventoryInterface[]> {
    return of(inventories);
  }
}
