import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { InventoryManagementComponent } from './inventory-management.component';

@NgModule({
  declarations: [InventoryManagementComponent],
  imports: [CommonModule, InventoryManagementRoutingModule],
})
export class InventoryManagementModule {}
