import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './basic-information/category/category.component';
import { InventoryComponent } from './basic-information/inventory/inventory.component';
import { MaterialComponent } from './basic-information/material/material.component';
import { ProductComponent } from './basic-information/product/product.component';
import { UnitComponent } from './basic-information/unit/unit.component';
import { InventoryManagementComponent } from './inventory-management.component';
import { BuyOrderComponent } from './operations/buy-order/buy-order.component';
import { InventoryExitComponent } from './operations/inventory-exit/inventory-exit.component';
import { InventoryReceiptComponent } from './operations/inventory-receipt/inventory-receipt.component';
import { InvoiceSubmitComponent } from './operations/invoice-submit/invoice-submit.component';
import { ReturnInventoryExitComponent } from './operations/return-inventory-exit/return-inventory-exit.component';
import { ReturnInventoryReceiptComponent } from './operations/return-inventory-receipt/return-inventory-receipt.component';
import { GoodsCountComponent } from './reports/goods-count/goods-count.component';
import { GoodsHistoryComponent } from './reports/goods-history/goods-history.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryManagementComponent,
    children: [
      // Basic information
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      { path: 'product', component: ProductComponent },
      { path: 'material', component: MaterialComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'unit', component: UnitComponent },

      // Operations
      { path: 'inventory-receipt', component: InventoryReceiptComponent },
      {
        path: 'return-inventory-receipt',
        component: ReturnInventoryReceiptComponent,
      },
      { path: 'inventory-exit', component: InventoryExitComponent },
      {
        path: 'return-inventory-exit',
        component: ReturnInventoryExitComponent,
      },
      { path: 'invoice-submit', component: InvoiceSubmitComponent },
      { path: 'buy-order', component: BuyOrderComponent },
      // Reports
      { path: 'goods-count', component: GoodsCountComponent },
      { path: 'goods-history', component: GoodsHistoryComponent },
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },
      { path: '**', redirectTo: 'inventory', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryManagementRoutingModule {}
