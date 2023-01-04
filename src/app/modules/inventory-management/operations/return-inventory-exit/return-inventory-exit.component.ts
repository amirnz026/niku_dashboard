import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-return-inventory-exit',
  templateUrl: './return-inventory-exit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnInventoryExitComponent implements OnInit {
  constructor(private store: Store<AppStateType>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'برگشت خروج انبار',
        tabRoute: '/inventory-management/return-inventory-exit',
      })
    );
  }
}
