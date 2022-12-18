import { Component, OnInit } from '@angular/core';
import * as imActions from '../../store/inventoryManagement.actions';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-invoice-submit',
  templateUrl: './invoice-submit.component.html',
})
export class InvoiceSubmitComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      imActions.addTab({
        tabName: 'تایید فاکتور',
        tabRoute: '/inventory-management/invoice-submit',
      })
    );
  }
}
