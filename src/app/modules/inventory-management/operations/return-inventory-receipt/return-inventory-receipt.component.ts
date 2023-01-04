import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-return-inventory-receipt',
  templateUrl: './return-inventory-receipt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnInventoryReceiptComponent implements OnInit {
  constructor(private store: Store<AppStateType>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'برگشت رسید انبار',
        tabRoute: '/inventory-management/return-inventory-receipt',
      })
    );
  }
}
