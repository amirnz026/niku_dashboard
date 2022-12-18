import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { InventoryManagementComponent } from './inventory-management.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/inventoryManagement.reducers';

@NgModule({
  declarations: [InventoryManagementComponent],
  imports: [
    CommonModule,
    InventoryManagementRoutingModule,
    StoreModule.forFeature('inventoryManagement', reducers),
  ],
})
export class InventoryManagementModule {}
