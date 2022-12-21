import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { CellClickedEvent } from 'ag-grid-community/dist/lib/events';
import { AgGridAngular } from 'ag-grid-angular';
import { inventoriesSelector } from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { AG_GRID_LOCALE_FA } from 'src/app/language/persian/ag-grid/AG_GRID_LOCALE_FA';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  colResizeDefault: any;
  langFa = AG_GRID_LOCALE_FA;
  tabName = 'انبار';
  tabRoute = '/inventory-management/inventory';
  rowData$: Observable<any[]>;

  colDefs: ColDef[] = [
    { headerName: 'نام انبار', field: 'name' },
    { headerName: 'دسته بندی', field: 'category' },
    { headerName: 'وضعیت', field: 'status' },
    {
      headerName: 'کاربران',
      field: 'users',
    },
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  constructor(private store: Store<AppStateInterface>) {
    this.colResizeDefault = 'shift';
  }
  gridOptions: GridOptions = {
    // PROPERTIES
    // Objects like myRowData and myColDefs would be created in your application

    // EVENTS
    // Add event handlers
    onRowClicked: (event) => console.log('A row was clicked'),
    onColumnResized: (event) => console.log('A column was resized'),
    onGridReady: (event) => console.log('The grid is now ready'),

    // CALLBACKS
    // getRowHeight: (params) => 25,
  };

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
  onCellClicked(event: CellClickedEvent) {
    console.log(event);
  }
  clearSelection() {
    this.agGrid.api.deselectAll();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeAllColumns;
    this.gridColumnApi.autoSizeColumns;
  }
  onFirstDataRendered(params: any) {
    this.gridApi.sizeColumnsToFit();
  }
}
