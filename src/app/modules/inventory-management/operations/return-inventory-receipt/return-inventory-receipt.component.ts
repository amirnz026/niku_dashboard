import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as imActions from '../../store/inventoryManagement.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-return-inventory-receipt',
  templateUrl: './return-inventory-receipt.component.html',
})
export class ReturnInventoryReceiptComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      imActions.addTab({
        tabName: 'برگشت رسید انبار',
        tabRoute: '/inventory-management/return-inventory-receipt',
      })
    );
  }
}
