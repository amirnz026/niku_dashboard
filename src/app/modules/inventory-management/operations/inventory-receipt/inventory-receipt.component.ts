import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as imActions from '../../store/inventoryManagement.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-inventory-receipt',
  templateUrl: './inventory-receipt.component.html',
})
export class InventoryReceiptComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      imActions.addTab({
        tabName: 'رسید انبار',
        tabRoute: '/inventory-management/inventory-receipt',
      })
    );
  }
}
