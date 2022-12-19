import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { InventoryManagementComponent } from './inventory-management.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/inventoryManagement.reducers';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { InventoryComponent } from './basic-information/inventory/inventory.component';

@NgModule({
  declarations: [InventoryManagementComponent, InventoryComponent],
  imports: [
    CommonModule,
    InventoryManagementRoutingModule,
    WidgetsModule,
    StoreModule.forFeature('inventoryManagement', reducers),
    WidgetsModule,
    ModalsModule,
  ],
})
export class InventoryManagementModule {}
