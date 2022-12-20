import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Store } from '@ngrx/store';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
})
export class UnitComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'واحد',
        tabRoute: '/inventory-management/unit',
      })
    );
  }
}
