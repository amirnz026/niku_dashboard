import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CellClickedEvent } from 'ag-grid-community/dist/lib/events';
import { AgGridAngular } from 'ag-grid-angular';
import { AG_GRID_LOCALE_FA } from 'src/app/language/persian/ag-grid/AG_GRID_LOCALE_FA';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-grid-style01',
  templateUrl: './grid-style01.component.html',
  styleUrls: ['./grid-style01.component.scss'],
})
export class GridStyle01Component implements OnInit {
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  colResizeDefault: any;
  langFa = AG_GRID_LOCALE_FA;
  @Input() rowInputData$: Observable<any[]>;
  @Input() colInputDefs: ColDef[];
  @Input() tableName: string;
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  constructor(private store: Store<AppStateInterface>) {}
  gridOptions: GridOptions = {
    // EVENTS
    // Add event handlers
    // onRowClicked: (event) => console.log('A row was clicked'),
    // onColumnResized: (event) => console.log('A column was resized'),
    // onGridReady: (event) => console.log('The grid is now ready'),

    // CALLBACKS
    getRowHeight: (params) => 65,
  };

  ngOnInit(): void {}
  onCellClicked(event: CellClickedEvent) {
    console.log(event);
  }
  clearSelection() {
    this.agGrid.api.deselectAll();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onFirstDataRendered(params: any) {
    this.gridApi.sizeColumnsToFit();
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  openForm(): void {
    if (this.tableName === 'inventory')
      this.store.dispatch(imActions.openInventoryForm());
  }
}
