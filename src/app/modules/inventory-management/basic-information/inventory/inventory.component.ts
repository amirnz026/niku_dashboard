import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import {
  inventoriesSelector,
  inventoryCategoriesSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { UsersCellComponent } from 'src/app/modules/ag-grid/users-cell/users-cell.component';
import { StatusCellComponent } from 'src/app/modules/ag-grid/status-cell/status-cell.component';
import { inventoryFormStateSelector } from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { ActionsCellComponent } from 'src/app/modules/ag-grid/actions-cell/actions-cell.component';
import { ColDef } from 'ag-grid-community';
import { left } from '@popperjs/core';
import { InventoryCategoryInterface } from 'src/app/types/inventory-management/inventory/inventoryCategory.interface';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  tabName = 'انبار';
  tabRoute = '/inventory-management/inventory';
  categories$: Observable<InventoryCategoryInterface[]>;
  users: any[];
  selectedUsers: any[];
  checked = true;
  selectedCategories: any;

  rowData$: Observable<any[]>;
  isForm$: Observable<boolean>;

  colDefs: ColDef[] = [
    {
      headerName: 'نام انبار',
      field: 'name',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      flex: 2,
    },
    { headerName: 'دسته بندی', field: 'category', flex: 1 },
    {
      headerName: 'وضعیت',
      field: 'status',
      cellRenderer: StatusCellComponent,
      flex: 1,
    },
    {
      headerName: 'کاربران',
      field: 'users',
      cellRenderer: UsersCellComponent,
      autoHeight: true,
      flex: 1,
      tooltipField: 'users',
    },
    {
      headerName: 'عملیات',
      field: 'actions',
      cellRenderer: ActionsCellComponent,
      pinned: left,
      width: 140,
    },
  ];

  constructor(private store: Store<AppStateInterface>) {
    this.users = [
      { name: 'امیر نظری' },
      { name: 'امیر الموتی' },
      { name: 'علی نادری' },
      { name: 'محمد محمدی' },
    ];
  }

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: this.tabName,
        tabRoute: this.tabRoute,
      })
    );
    this.rowData$ = this.store.pipe(select(inventoriesSelector));
    this.isForm$ = this.store.pipe(select(inventoryFormStateSelector));
    this.categories$ = this.store.pipe(select(inventoryCategoriesSelector));
  }
  closeForm(): void {
    this.store.dispatch(imActions.closeInventoryForm());
  }
}
