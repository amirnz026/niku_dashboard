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
import { UsersCellComponent } from '../ag-grid/users-cell/users-cell.component';
import { StatusCellComponent } from '../ag-grid/status-cell/status-cell.component';
import { GridStyle01Component } from '../ag-grid/grid/grid-style01/grid-style01.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { ActionsCellComponent } from '../ag-grid/actions-cell/actions-cell.component';
import { MoodComponent } from '../ag-grid/grid/grid-style01/mood.component';
import { CustomTooltipComponent } from '../ag-grid/tooltip/custom-tooltip.component';

@NgModule({
  declarations: [
    InventoryManagementComponent,
    InventoryComponent,
    UsersCellComponent,
    StatusCellComponent,
    GridStyle01Component,
    ActionsCellComponent,
    MoodComponent,
    CustomTooltipComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    InventoryManagementRoutingModule,
    WidgetsModule,
    StoreModule.forFeature('inventoryManagement', inventoryManagementReducers),
    WidgetsModule,
    ModalsModule,
    AgGridModule,
    EffectsModule.forRoot(),
    EffectsModule.forFeature([InventoryManagementEffects]),
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputSwitchModule,
    MultiSelectModule,
    ButtonModule,
  ],
  providers: [InventoryManagementService],
})
export class InventoryManagementModule {}
