import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ColDef,
  ColumnApi,
  GridApi,
  GridOptions,
  RowNode,
  SideBarDef,
} from 'ag-grid-community';
import { Observable, take } from 'rxjs';
import {
  CellClickedEvent,
  SelectionChangedEvent,
} from 'ag-grid-community/dist/lib/events';
import { AgGridAngular } from 'ag-grid-angular';
import { AG_GRID_LOCALE_FA } from 'src/app/language/persian/ag-grid/AG_GRID_LOCALE_FA';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { CustomTooltipComponent } from 'src/app/modules/ag-grid/tooltip/custom-tooltip.component';
import { LoadingOverlayComponent } from '../../loading-overlay/loading-overlay.compoment';
import {
  inventorySelectedRowsSelector,
  isInventoriesLoadingSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';

@Component({
  selector: 'app-grid-style01',
  templateUrl: './grid-style01.component.html',
  styleUrls: ['./grid-style01.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridStyle01Component implements OnInit {
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  public tooltipShowDelay = 1000;

  colResizeDefault: any;
  langFa = AG_GRID_LOCALE_FA;
  @Input() rowInputData: any[] | null;
  @Input() colInputDefs: ColDef[];
  @Input() pageName: string;
  @Input() isInventoryUsersLoading: boolean | null;
  @Input() isInventoryCategoryLoading: boolean | null;
  isInventoriesLoading$: Observable<boolean>;
  defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
    filter: true,
    tooltipComponent: CustomTooltipComponent,
    autoHeight: true,
    cellStyle: {
      overflow: 'hidden',
    },
    lockPinned: true,
  };
  inventorySelectedRows$: Observable<InventoryInterface[]>;
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
    // suppressNoRowsOverlay: true,
    loadingOverlayComponent: LoadingOverlayComponent,
    loadingOverlayComponentParams: {},
    suppressDragLeaveHidesColumns: true,
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

  ngOnInit(): void {
    this.isInventoriesLoading$ = this.store.pipe(
      select(isInventoriesLoadingSelector)
    );
    this.inventorySelectedRows$ = this.store.pipe(
      select(inventorySelectedRowsSelector)
    );
  }
  onCellClicked(event: CellClickedEvent) {
    console.log(event.data);
    // this.store.dispatch(
    //   imActions.setInventorySelectedRows({ inventories: event.data })
    // );
  }
  clearSelection() {
    this.agGrid.api.deselectAll();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.isInventoriesLoading$.subscribe((val) => {
      if (val) this.gridApi.showLoadingOverlay();
      else this.gridApi.hideOverlay();
    });
    this.selectAllAmerican();
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
    if (this.pageName === 'inventory') {
      this.store.dispatch(imActions.openInventoryForm());
    }
  }
  refreshPage(): void {
    if (this.pageName === 'inventory') {
      this.store.dispatch(imActions.getInventories());
      this.store.dispatch(imActions.getInventoryCategories());
      this.store.dispatch(imActions.getInventoryUsers());
    }
  }
  onSelectionChanged(val: SelectionChangedEvent): void {
    // console.log(val.api.getSelectedRows());
    console.log(val.api.getSelectedRows());
    this.store.dispatch(
      imActions.setInventorySelectedRows({
        inventories: val.api.getSelectedRows(),
      })
    );
  }
  selectAllAmerican() {
    // this.inventorySelectedRows$.pipe(take(1)).subscribe((selectedRows) => {
    //   selectedRows.map((row) => {
    //     this.gridApi.forEachNode((node) => {
    //       console.log(node.data.name);
    //       console.log(row.name);
    //       node.setSelected(node.data.name === row.name);
    //     });
    //   });
    // });
    // this.gridApi.forEachNode((node) => {
    //   this.yoyo.map((row) => {
    //     if (node.data.name === row.name) {
    //       node.setSelected(node.data.name === row.name);
    //     }
    //   });
    // });
    this.gridApi.forEachNode((node) => {
      this.inventorySelectedRows$.subscribe((selectedRows) => {
        selectedRows.map((row) => {
          if (node.data.name === row.name) {
            node.setSelected(node.data.name === row.name);
          }
        });
      });
    });
  }
}
