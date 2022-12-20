import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
})
export class InventoryManagementComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}
  ngOnInit(): void {
    console.log('yoyoy');
    this.store.dispatch(imActions.getInventories());
  }
}
