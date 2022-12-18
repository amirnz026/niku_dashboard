import { Component, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Store } from '@ngrx/store';
import * as imActions from '../../store/inventoryManagement.actions';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
})
export class UnitComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      imActions.addTab({
        tabName: 'واحد',
        tabRoute: '/inventory-management/unit',
      })
    );
  }
}
