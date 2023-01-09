import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  categorySelectedRowsSelector,
  inventorySelectedRowsSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss'],
})
export class PrintTableComponent implements OnInit {
  @Input() cols: any;
  @Input() count: number;
  @Input() pageSelectedRowsSelectorMethod: any;

  rows$: Observable<any>;
  constructor(private store: Store<AppStateType>) {}

  ngOnInit() {
    this.rows$ = this.store.pipe(select(this.pageSelectedRowsSelectorMethod));
  }
}
