import { Component, OnInit } from '@angular/core';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-return-inventory-exit',
  templateUrl: './return-inventory-exit.component.html',
})
export class ReturnInventoryExitComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'برگشت خروج انبار',
        tabRoute: '/inventory-management/return-inventory-exit',
      })
    );
  }
}
