import { Component, OnInit } from '@angular/core';
import * as imActions from '../../store/inventoryManagement.actions';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-buy-order',
  templateUrl: './buy-order.component.html',
})
export class BuyOrderComponent {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      imActions.addTab({
        tabName: 'سفارش خرید',
        tabRoute: '/inventory-management/buy-order',
      })
    );
  }
}
