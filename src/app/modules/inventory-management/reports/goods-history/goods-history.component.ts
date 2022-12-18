import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as imActions from '../../store/inventoryManagement.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-goods-history',
  templateUrl: './goods-history.component.html',
})
export class GoodsHistoryComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      imActions.addTab({
        tabName: 'تاریخچه کالا',
        tabRoute: '/inventory-management/goods-history',
      })
    );
  }
}
