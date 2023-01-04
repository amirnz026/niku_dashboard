import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-buy-order',
  templateUrl: './buy-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyOrderComponent {
  constructor(private store: Store<AppStateType>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'سفارش خرید',
        tabRoute: '/inventory-management/buy-order',
      })
    );
  }
}
