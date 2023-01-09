import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  SideBarDef,
  ColumnApi,
  GetContextMenuItemsParams,
  MenuItemDef,
} from 'ag-grid-community';
import {
  CellClickedEvent,
  SelectionChangedEvent,
} from 'ag-grid-community/dist/lib/events';
import { AG_GRID_LOCALE_FA } from 'src/app/language/persian/ag-grid/AG_GRID_LOCALE_FA';
import { Store } from '@ngrx/store';
import { CustomTooltipComponent } from 'src/app/modules/ag-grid/tooltip/custom-tooltip.component';
import { LoadingOverlayComponent } from '../../loading-overlay/loading-overlay.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
import { Observable } from 'rxjs';

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
  @Input() isLoading: boolean | null;
  @Input() columnKeys: string[];
  @Input() currentEditingRow$: Observable<InventoryType | CategoryType | null>;
  @Input() gridSelectedRows: InventoryType[] | CategoryType[] | null;
  @Input() isGridLoading$: Observable<boolean | null>;
  @Input() openFormMethod: Function;
  @Input() refreshPageMethods: Function[];
  @Input() onSelectionChangedMethod: Function;
  @Input() setCurrentEditingMethod: Function;

  // Ag-grid
  gridApi: GridApi;
  columnApi: ColumnApi;
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
  gridOptions: GridOptions;
  defaultColDef: ColDef;
  getContextMenuItems(
    params: GetContextMenuItemsParams
  ): (string | MenuItemDef)[] {
    var result: (string | MenuItemDef)[] = [
      'copy',
      'copyWithHeaders',
      'resetColumns',
      'export',
    ];
    return result;
  }
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

  constructor(
    private store: Store<AppStateType>,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private imService: InventoryManagementService
  ) {}

  ngOnInit(): void {
    this.gridOptions = {
      onGridReady: (event) => {},
      getRowHeight: (params) => 60,

      loadingOverlayComponent: LoadingOverlayComponent,
      loadingOverlayComponentParams: {},
      defaultCsvExportParams: {
        onlySelected: true,
        columnKeys: this.columnKeys,
      },
      defaultExcelExportParams: {
        onlySelected: true,
        columnKeys: this.columnKeys,
      },
      enableRangeSelection: true,
    };
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      tooltipComponent: CustomTooltipComponent,
      autoHeight: true,
      cellStyle: {
        overflow: 'hidden',
      },
    };

    this.currentEditingRow$.subscribe((currentEditingRow) => {
      if (currentEditingRow) {
        this.gridOptions.rowClassRules = {
          'disabled-row': function (params) {
            if (params.data.name === currentEditingRow.name) return false;
            else return true;
          },
        };
        this.gridApi.deselectAll();
      } else {
        this.gridOptions.rowClassRules = {};
      }
      this.gridApi?.redrawRows();
    });
  }
  onCellClicked(event: CellClickedEvent) {
    this.currentEditingRow$.subscribe((currentEditingRow) => {
      // Type Narrowing
      if (event.api.getSelectedRows().length && currentEditingRow) {
        if (currentEditingRow?.name !== event.api.getSelectedRows()[0].name) {
          this.store.dispatch(this.setCurrentEditingMethod({ row: null }));
          this.gridOptions.rowClassRules = {};
          this.gridApi.redrawRows();
        }
      }
    });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.isGridLoading$.subscribe((isGridLoading) => {
      if (isGridLoading) {
        this.gridApi.showLoadingOverlay();
      } else {
        this.gridApi.hideOverlay();
      }
    });
    this.selectRowsFromState();
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  openCreationForm(): void {
    this.store.dispatch(this.openFormMethod());
  }
  refreshPage(): void {
    // Dispatch Actions:
    //  Get Grid Data
    //  Get Categories
    //  Get Users
    this.refreshPageMethods.map((method) => {
      this.store.dispatch(method());
    });
  }
  onSelectionChanged(val: SelectionChangedEvent): void {
    this.store.dispatch(
      this.onSelectionChangedMethod({
        rows: val.api.getSelectedRows(),
      })
    );
  }
  selectRowsFromState() {
    this.gridApi.forEachNode((node) => {
      this.gridSelectedRows?.map((row) => {
        if (node.data.name === row.name) {
          node.setSelected(node.data.name === row.name);
        }
      });
    });
  }

  onDelete() {
    let names = '"';

    this.gridSelectedRows?.map((row, index) => {
      if (index <= this.gridSelectedRows!.length - 3) names += row.name + '، ';
      else if (index === this.gridSelectedRows!.length - 2)
        names += row.name + ' و ';
      else if (index === this.gridSelectedRows!.length - 1) names += row.name;
    });

    names += '"';
    this.confirmationService.confirm({
      message: `آیا از حذف  ${names} مطمئن هستید؟`,
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'حذف آیتم ها',
          detail: `درخواست حذف آیتم ها ارسال شد.`,
        });
        this.imService.postSubmitInventoryCreationForm().subscribe((val) => {
          this.messageService.add({
            severity: 'success',
            summary: 'حذف آیتم ها',
            detail: `آیتم های انتخاب شده با موفقیت حذف شدند.`,
          });
        });
      },
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      header: 'حذف آیتم ها',
    });
  }
}
