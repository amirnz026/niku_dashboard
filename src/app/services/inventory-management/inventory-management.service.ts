import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient) {}

  getInventories(): Observable<InventoryInterface[]> {
    return of(inventories);
  }
  getInventoryCategories(): Observable<InventoryCategoryInterface[]> {
    return of(inventoryCategories);
  }
  getInventoryUsers(): Observable<InventoryUserInterface[]> {
    return of(inventoryUsers);
  }
  postSubmitInventoryCreationForm(): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }
  // onInventoryCreationFormSubmit(): Observable<boolean> {
  //   this.http.post('');
  // }
}
