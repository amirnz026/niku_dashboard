import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss'],
})
export class InventoryManagementComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}
  ngOnInit(): void {
    this.store.dispatch(imActions.getInventories());
  }
}
