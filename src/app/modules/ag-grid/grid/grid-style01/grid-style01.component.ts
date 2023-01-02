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
  inventoryFormStateSelector,
  inventorySelectedRowsSelector,
  isInventoriesLoadingSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InventoryFormStateType } from 'src/app/types/inventory-management/inventory/inventoryPage.interface';

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
  inventoryFormState$: Observable<InventoryFormStateType>;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  constructor(
    private store: Store<AppStateInterface>,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
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

    getRowClass: (params) => {
      if (params.node.rowIndex! % 2 === 0) {
        params.node.selectable = false;
        return 'disabled-row';
      } else {
        return 'my-shaded-effect';
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
    this.inventoryFormState$ = this.store.pipe(
      select(inventoryFormStateSelector)
    );
  }
  onCellClicked(event: CellClickedEvent) {}
  onRowSelected() {
    if (this.gridApi.getSelectedRows().length === 0) {
      this.store.dispatch(imActions.inventoryFormStateToCreate());
    }
    console.log('on row selected');
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
  openCreationForm(): void {
    if (this.pageName === 'inventory') {
      this.store.dispatch(imActions.inventoryFormStateToCreate());
      this.store.dispatch(
        imActions.inventoryNameFormUpdate({ inventoryName: '' })
      );
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
    this.inventoryFormState$.subscribe((formState) => {
      if (formState === 'edit') {
        this.store.dispatch(
          imActions.setInventorySelectedRows({
            inventories: val.api.getSelectedRows(),
          })
        );
      }
    });

    console.log('on selection changed');
  }
  selectAllAmerican() {
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
  onEdit() {
    this.store.dispatch(imActions.inventoryFormStateToEdit());

    this.inventorySelectedRows$.subscribe((selectedRows) => {
      if (selectedRows?.length) {
        if (selectedRows.length > 1) {
          this.store.dispatch(
            imActions.inventoryNameFormUpdate({
              inventoryName: '...',
            })
          );
        } else if (selectedRows.length === 1) {
          this.store.dispatch(
            imActions.inventoryNameFormUpdate({
              inventoryName: selectedRows[0].name,
            })
          );
        }

        this.store.dispatch(
          imActions.inventoryCategoryFormUpdate({
            inventoryCategoryName: selectedRows[0].category,
          })
        );
        this.store.dispatch(
          imActions.inventoryStatusFormUpdate({
            status: selectedRows[0].status,
          })
        );
        this.store.dispatch(
          imActions.inventoryUsersFormUpdate({
            inventoryUsers: selectedRows[0].users,
          })
        );
      }
    });
  }
  get rowsCount() {
    return this.gridApi?.getSelectedRows().length;
  }
  onDelete() {
    let inventoryNames = '"';
    this.store.dispatch(imActions.inventoryFormStateToEdit());
    this.inventorySelectedRows$.subscribe((selectedRows) => {
      selectedRows.map((row, index) => {
        if (index <= selectedRows.length - 3) inventoryNames += row.name + '، ';
        else if (index === selectedRows.length - 2)
          inventoryNames += row.name + ' و ';
        else if (index === selectedRows.length - 1) inventoryNames += row.name;
      });
    });
    inventoryNames += '"';
    this.confirmationService.confirm({
      message: `آیا از حذف  ${inventoryNames} مطمئن هستید؟`,
      accept: () => {
        //Actual logic to perform a confirmation
      },
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      header: 'حذف انبار انبارها',
    });
  }
}
