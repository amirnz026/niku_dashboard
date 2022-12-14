import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-inventory-exit',
  templateUrl: './inventory-exit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryExitComponent implements OnInit {
  constructor(private store: Store<AppStateType>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'خروج انبار',
        tabRoute: '/inventory-management/inventory-exit',
      })
    );
  }
}
