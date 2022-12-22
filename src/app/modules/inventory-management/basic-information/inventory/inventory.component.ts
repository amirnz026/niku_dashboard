import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { inventoriesSelector } from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { UsersCellComponent } from 'src/app/modules/ag-grid/users-cell/users-cell.component';
import { StatusCellComponent } from 'src/app/modules/ag-grid/status-cell/status-cell.component';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  tabName = 'انبار';
  tabRoute = '/inventory-management/inventory';
  rowData$: Observable<any[]>;
  colDefs = [
    {
      headerName: 'نام انبار',
      field: 'name',
    },
    { headerName: 'دسته بندی', field: 'category' },
    { headerName: 'وضعیت', field: 'status', cellRenderer: StatusCellComponent },
    {
      headerName: 'کاربران',
      field: 'users',
      cellRenderer: UsersCellComponent,
      autoHeight: true,
    },
  ];

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: this.tabName,
        tabRoute: this.tabRoute,
      })
    );
    // this.rowData$ = this.http.get<any[]>(
    //   'https://www.ag-grid.com/example-assets/row-data.json'
    // );
    this.rowData$ = this.store.pipe(select(inventoriesSelector));
  }
}
