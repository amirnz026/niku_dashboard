import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-goods-history',
  templateUrl: './goods-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsHistoryComponent implements OnInit {
  constructor(private store: Store<AppStateType>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'تاریخچه کالا',
        tabRoute: '/inventory-management/goods-history',
      })
    );
  }
}
