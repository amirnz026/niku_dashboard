import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-count',
  templateUrl: './goods-count.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsCountComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'مرور تعدادی کالا',
        tabRoute: '/inventory-management/goods-count',
      })
    );
  }
}
