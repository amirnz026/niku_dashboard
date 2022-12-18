import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as imActions from '../../store/inventoryManagement.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-count',
  templateUrl: './goods-count.component.html',
})
export class GoodsCountComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      imActions.addTab({
        tabName: 'مرور تعدادی کالا',
        tabRoute: '/inventory-management/goods-count',
      })
    );
  }
}
