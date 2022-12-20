import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { InventoryManagementComponent } from './inventory-management.component';
import { StoreModule } from '@ngrx/store';
import { inventoryManagementReducers } from 'src/app/ngrx/inventory-management/inventoryManagement.reducers';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { InventoryComponent } from './basic-information/inventory/inventory.component';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
import { InventoryManagementEffects } from 'src/app/ngrx/inventory-management/inventoryManagement.effects';

@NgModule({
  declarations: [InventoryManagementComponent, InventoryComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    InventoryManagementRoutingModule,
    WidgetsModule,
    StoreModule.forFeature('inventoryManagement', inventoryManagementReducers),
    WidgetsModule,
    ModalsModule,
    AgGridModule,
    EffectsModule.forRoot(),
    EffectsModule.forFeature([InventoryManagementEffects]),
  ],
  providers: [InventoryManagementService],
})
export class InventoryManagementModule {}
