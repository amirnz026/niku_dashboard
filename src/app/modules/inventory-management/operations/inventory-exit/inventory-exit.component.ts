import { Component, OnInit } from '@angular/core';
import * as imActions from '../../store/inventoryManagement.actions';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-inventory-exit',
  templateUrl: './inventory-exit.component.html',
})
export class InventoryExitComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      imActions.addTab({
        tabName: 'خروج انبار',
        tabRoute: '/inventory-management/inventory-exit',
      })
    );
  }
}
