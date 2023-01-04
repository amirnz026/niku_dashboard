import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  SideBarDef,
  AgGridEvent,
  ColumnApi,
} from 'ag-grid-community';
import { Observable, take } from 'rxjs';
import {
  CellClickedEvent,
  SelectionChangedEvent,
} from 'ag-grid-community/dist/lib/events';
import { AG_GRID_LOCALE_FA } from 'src/app/language/persian/ag-grid/AG_GRID_LOCALE_FA';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { CustomTooltipComponent } from 'src/app/modules/ag-grid/tooltip/custom-tooltip.component';
import { LoadingOverlayComponent } from '../../loading-overlay/loading-overlay.compoment';
import {
  currentEditingInventorySelector,
  inventoryFormStateSelector,
  inventorySelectedRowsSelector,
  isInventoriesLoadingSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InventoryFormStateType } from 'src/app/types/inventory-management/inventory/inventoryPage.interface';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';

@Component({
  selector: 'app-grid-style01',
  templateUrl: './grid-style01.component.html',
  styleUrls: ['./grid-style01.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridStyle01Component implements OnInit {
  langFa = AG_GRID_LOCALE_FA;
  @Input() rowInputData: any[] | null;
  @Input() colInputDefs: ColDef[];
  @Input() pageName: string;
  @Input() isInventoryUsersLoading: boolean | null;
  @Input() isInventoryCategoryLoading: boolean | null;
  private gridApi: GridApi;
  private columnApi: ColumnApi;
  tooltipShowDelay = 1000;
  isTableLoaded: boolean;
  sideBar: SideBarDef | string | string[] | boolean | null = {
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
  gridOptions: GridOptions = {
    onGridReady: (event) => (this.isTableLoaded = true),
    getRowHeight: (params) => 65,

    loadingOverlayComponent: LoadingOverlayComponent,
    loadingOverlayComponentParams: {},
    suppressDragLeaveHidesColumns: true,
  };
  get selectedRowsCount() {
    return this.gridApi?.getSelectedRows().length;
  }
  get rowsCount() {
    return this.gridApi?.getDisplayedRowCount();
  }

  get displayedColumns() {
    return this.columnApi?.getAllDisplayedColumns();
  }
  get selectedRows() {
    return this.gridApi?.getSelectedRows();
  }
  test() {
    console.log(this.displayedColumns);
    console.log(this.selectedRows);
  }

  isInventoriesLoading$: Observable<boolean>;
  inventorySelectedRows$: Observable<InventoryInterface[]>;
  inventoryFormState$: Observable<InventoryFormStateType>;
  currentEditingInventory$: Observable<InventoryInterface | null>;

  constructor(
    private store: Store<AppStateInterface>,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private imService: InventoryManagementService
  ) {}

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
    this.currentEditingInventory$ = this.store.pipe(
      select(currentEditingInventorySelector)
    );

    this.currentEditingInventory$.subscribe((selectedRow) => {
      if (selectedRow) {
        this.gridOptions.rowClassRules = {
          'disabled-row': function (params) {
            if (params.data.name === selectedRow.name) return false;
            else return true;
          },
        };
        this.gridApi.deselectAll();
      } else {
        this.gridOptions.rowClassRules = {};
      }
      this.gridApi.redrawRows();
    });
  }
  onCellClicked(event: CellClickedEvent) {
    this.currentEditingInventory$
      .pipe(take(1))
      .subscribe((editingInventory) => {
        if (
          editingInventory &&
          editingInventory?.name !== event.api.getSelectedRows()[0].name
        ) {
          this.store.dispatch(
            imActions.setCurrentEditingInventory({ inventory: null })
          );
          this.gridOptions.rowClassRules = {};
          this.gridApi.redrawRows();
        }
      });
  }
  onRowSelected() {}
  clearSelection() {}
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.isInventoriesLoading$.subscribe((val) => {
      if (val) this.gridApi.showLoadingOverlay();
      else this.gridApi.hideOverlay();
    });
    this.selectRowsFromState();
  }
  onFirstDataRendered(params: any) {}

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  openCreationForm(): void {
    if (this.pageName === 'inventory') {
      this.store.dispatch(imActions.openInventoryForm());
      // this.store.dispatch(imActions.inventoryFormStateToCreate());
      this.store.dispatch(
        imActions.inventoryNameFormUpdate({ inventoryName: '' })
      );
      this.store.dispatch(
        imActions.inventoryStatusFormUpdate({ status: true })
      );
      this.store.dispatch(
        imActions.inventoryCategoryFormUpdate({
          inventoryCategoryName: null,
        })
      );
      this.store.dispatch(
        imActions.inventoryUsersFormUpdate({
          inventoryUsers: [],
        })
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
    this.store.dispatch(
      imActions.setInventorySelectedRows({
        inventories: val.api.getSelectedRows(),
      })
    );
  }
  selectRowsFromState() {
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

  onDelete() {
    let inventoryNames = '"';
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
        this.messageService.add({
          severity: 'info',
          summary: 'حذف انبارها',
          detail: `درخواست حذف انبارها ارسال شد.`,
        });
        this.imService.postSubmitInventoryCreationForm().subscribe((val) => {
          this.messageService.add({
            severity: 'success',
            summary: 'حذف انبارها',
            detail: `انبارهای انتخاب شده با موفقیت حذف شدند.`,
          });
        });
      },
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      header: 'حذف انبارها',
    });
  }
}
