import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {
  ColDef,
  ColumnApi,
  GridApi,
  GridOptions,
  SideBarDef,
} from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CellClickedEvent } from 'ag-grid-community/dist/lib/events';
import { AgGridAngular } from 'ag-grid-angular';
import { AG_GRID_LOCALE_FA } from 'src/app/language/persian/ag-grid/AG_GRID_LOCALE_FA';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { CustomTooltipComponent } from 'src/app/modules/ag-grid/tooltip/custom-tooltip.component';

@Component({
  selector: 'app-grid-style01',
  templateUrl: './grid-style01.component.html',
  styleUrls: ['./grid-style01.component.scss'],
})
export class GridStyle01Component implements OnInit {
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  public tooltipShowDelay = 1000;
  colResizeDefault: any;
  langFa = AG_GRID_LOCALE_FA;
  @Input() rowInputData$: Observable<any[]>;
  @Input() colInputDefs: ColDef[];
  @Input() tableName: string;
  defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
    filter: true,
    tooltipComponent: CustomTooltipComponent,
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
    getRowStyle: (params) => {
      if (params.node.rowIndex !== null) {
        if (params.node.rowIndex % 2 === 0) {
          return { background: '#f9f9f9' };
        } else {
          return { background: '#f6f6f6' };
        }
      }
    },
  };

  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
        },
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      },
    ],
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
    // this.gridApi.sizeColumnsToFit();
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  openForm(): void {
    if (this.tableName === 'inventory') {
      this.store.dispatch(imActions.openInventoryForm());
      this.store.dispatch(imActions.getInventoryCategories());
    }
  }
}
