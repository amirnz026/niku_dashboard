import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { inventorySelectedRowsSelector } from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { AppStateInterface } from 'src/app/types/appState.type';

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss'],
})
export class PrintTableComponent implements OnInit {
  @Input() cols: any;
  @Input() count: number;

  rows$: Observable<any>;
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {
    this.rows$ = this.store.pipe(select(inventorySelectedRowsSelector));
  }
}
