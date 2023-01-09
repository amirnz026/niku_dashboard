// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// Routing
import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
// Dashboard Template
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
// Ag-Grid
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { InventoryActionsCellComponent } from './basic-information/inventory/inventory-actions-cell.component';
import { CategoryActionsCellComponent } from './basic-information/category/category-actions-cell.component';
import { CustomTooltipComponent } from '../ag-grid/tooltip/custom-tooltip.component';
import { UsersCellComponent } from '../ag-grid/users-cell/users-cell.component';
import { StatusCellComponent } from '../ag-grid/status-cell/status-cell.component';
import { GridStyle01Component } from '../ag-grid/grid/grid-style01/grid-style01.component';
// Utils
import { NgxPrintModule } from 'ngx-print';
import { FormValidationErrorComponent } from '../partials/form-validation-error/form-validation-error.component';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
import { InventoryManagementEffects } from 'src/app/ngrx/inventory-management/inventoryManagement.effects';
// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LetModule } from '@ngrx/component';
import { inventoryManagementReducers } from 'src/app/ngrx/inventory-management/inventoryManagement.reducers';
// Primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
// Components
import { InventoryManagementComponent } from './inventory-management.component';
import { InventoryComponent } from './basic-information/inventory/inventory.component';
import { PrintTableComponent } from 'src/app/modules/partials/print-table/print-table.component';
import { MaterialComponent } from './basic-information/material/material.component';
import { ProductComponent } from './basic-information/product/product.component';
import { UnitComponent } from './basic-information/unit/unit.component';
import { CategoryComponent } from './basic-information/category/category.component';
// Icons

@NgModule({
  declarations: [
    InventoryManagementComponent,
    InventoryComponent,
    CategoryComponent,
    ProductComponent,
    UnitComponent,
    MaterialComponent,
    // Ag-Grid
    PrintTableComponent,
    UsersCellComponent,
    StatusCellComponent,
    GridStyle01Component,
    InventoryActionsCellComponent,
    CategoryActionsCellComponent,
    CustomTooltipComponent,
    FormValidationErrorComponent,
  ],
  imports: [
    // Angular
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // Routing
    InventoryManagementRoutingModule,
    // Ag-Grid
    AgGridModule,
    // NgRx
    StoreModule.forFeature('inventoryManagement', inventoryManagementReducers),
    EffectsModule.forRoot(),
    EffectsModule.forFeature([InventoryManagementEffects]),
    LetModule,
    // Primeng
    WidgetsModule,
    ModalsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputSwitchModule,
    MultiSelectModule,
    WidgetsModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    ToggleButtonModule,
    ToolbarModule,
    DialogModule,
    InputTextareaModule,
    // Utils
    NgxPrintModule,
  ],
  providers: [InventoryManagementService, ConfirmationService, MessageService],
})
export class InventoryManagementModule {}
