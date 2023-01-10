// Angular
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// NgRx
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { productActions } from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import {
  currentEditingProductSelector,
  isProductFormOpenSelector,
  isProductsLoadingSelector,
  productNameFormSelector,
  productSearchFilterSelector,
  productSelectedRowsCountSelector,
  productSelectedRowsSelector,
  productsSelector,
  productStatusFormSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
// Utils
import { isEqual } from 'lodash';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
import { ConfirmationService, MessageService } from 'primeng/api';
// Ag-Grid
import {
  ColDef,
  GetContextMenuItemsParams,
  IDetailCellRendererParams,
  MenuItemDef,
} from 'ag-grid-community';
import { StatusCellComponent } from 'src/app/modules/ag-grid/status-cell/status-cell.component';
import { AG_GRID_LOCALE_FA } from 'src/app/language/persian/ag-grid/AG_GRID_LOCALE_FA';
import { ProductActionsCellComponent } from './product-actions-cell.component';
import { CustomTooltipComponent } from 'src/app/modules/ag-grid/tooltip/custom-tooltip.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  langFa = AG_GRID_LOCALE_FA;

  constructor(
    private store: Store<AppStateType>,
    private fb: FormBuilder,
    private http: HttpClient,
    private imService: InventoryManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  productActions = productActions;
  // Navigation
  tabName = 'کالا / خدمت';
  tabRoute = '/inventory-management/product';
  // Table
  products$: Observable<any[]>;
  isProductsLoading$: Observable<boolean>;
  productSelectedRows$: Observable<ProductType[]>;
  currentEditingProduct$: Observable<ProductType | null>;
  productSelectedRowsCount$: Observable<number>;
  colDefs: ColDef[] = [
    {
      headerName: 'نام کالا / خدمت',
      field: 'name',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      flex: 3,
      minWidth: 170,
      cellRenderer: 'agGroupCellRenderer',
    },
    {
      headerName: 'دسته بندی',
      field: 'category',
      flex: 1,
      minWidth: 120,
    },
    {
      headerName: 'واحد سنجش',
      field: 'unit',
      flex: 1,
      minWidth: 130,
    },
    {
      headerName: 'زمان آماده سازی',
      field: 'prepTime',
      flex: 1,
      minWidth: 145,
    },
    {
      headerName: 'شماره محصول',
      field: 'productNumber',
      flex: 1,
      minWidth: 140,
    },
    {
      headerName: 'تگ ها',
      field: 'tags',
      tooltipField: 'tags',
      flex: 2,
      minWidth: 160,
    },
    {
      headerName: 'سفارشی ها',
      field: 'customizations',
      flex: 2,
      minWidth: 130,
    },
    {
      headerName: 'عملیات',
      field: 'actions',
      cellRenderer: ProductActionsCellComponent,
      resizable: false,
      width: 140,
      autoHeight: false,
      lockPosition: 'right',
      // pinned: left,
      sortable: false,
      minWidth: 100,
    },
  ];
  detailCellRendererParams = {
    rowSelection: 'multiple',
    detailGridOptions: {
      enableRangeSelection: true,
      tooltipShowDelay: 0,
      defaultColDef: {
        resizable: true,
        filter: true,
        sortable: true,
        autoHeight: true,
        cellStyle: {
          overflow: 'hidden',
        },
        tooltipComponent: CustomTooltipComponent,
      },
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
      },
      columnDefs: [
        {
          headerName: 'کانال فروش',
          field: 'salesChannel',
          flex: 1,
          minWidth: 150,
        },
        {
          headerName: 'قیمت',
          field: 'price',
          flex: 1,
          minWidth: 100,
        },
        {
          headerName: 'تخفیف',
          field: 'discount',
          flex: 1,
          minWidth: 100,
        },
        {
          headerName: 'مالیات',
          field: 'tax',
          flex: 1,
          minWidth: 100,
        },
        {
          headerName: 'سقف فروش',
          field: 'maxPerOrder',
          flex: 1,
          minWidth: 120,
        },
        {
          headerName: 'کمینه',
          field: 'minQty',
          flex: 1,
          minWidth: 100,
        },
        {
          headerName: 'انبار',
          field: 'inventory',
          flex: 2,
          minWidth: 150,
        },
        {
          headerName: 'وضعیت',
          field: 'status',
          cellRenderer: StatusCellComponent,
          flex: 1,
          minWidth: 100,
        },
        {
          headerName: 'زمان عرضه',
          field: 'supplyDate',
          flex: 3,
          tooltipField: 'supplyDate',
          minWidth: 150,
          sortable: true,
        },
      ],
      enableRtl: true,
      localeText: this.langFa,
    },
    getDetailRowData: (params: {
      successCallback: (arg0: any) => void;
      data: { productDetails: any };
    }) => {
      params.successCallback(params.data.productDetails);
    },
  } as unknown as IDetailCellRendererParams<ProductType, ProductDetailsType>;
  // Form
  isProductFormOpen$: Observable<boolean>;
  productNameForm$: Observable<string | null>;
  productStatusForm$: Observable<boolean | null>;
  productCreationForm: FormGroup;
  // Utils
  isErrorModal = false;
  errorModalText = '';
  isSubmitted = false;
  // Print
  productSelectedRowsSelectorMethod: any;
  // Search-Filter
  productSearchFilter$: Observable<string>;
  setProductSearchFilterMethod: any;

  get name() {
    return this.productCreationForm.get('name');
  }

  get status() {
    return this.productCreationForm.get('status');
  }

  get isNameFieldError() {
    return (
      (this.isSubmitted && this.name && this.name.errors) ||
      (this.name && this.name.invalid && (this.name.dirty || this.name.touched))
    );
  }

  ngOnInit(): void {
    // Tab Management
    this.store.dispatch(
      tabsActions.addTab({
        tabName: this.tabName,
        tabRoute: this.tabRoute,
      })
    );
    // Print
    this.productSelectedRowsSelectorMethod = productSelectedRowsSelector;
    // Search-Filter
    this.productSearchFilter$ = this.store.pipe(
      select(productSearchFilterSelector)
    );
    this.setProductSearchFilterMethod = productActions.setProductSearchFilter;
    // Get Selected/Editing Rows
    this.productSelectedRows$ = this.store.pipe(
      select(productSelectedRowsSelector)
    );
    this.currentEditingProduct$ = this.store.pipe(
      select(currentEditingProductSelector)
    );

    // Table Data
    this.products$ = this.store.pipe(select(productsSelector));
    this.isProductsLoading$ = this.store.pipe(
      select(isProductsLoadingSelector)
    );
    this.products$.subscribe((val) => {
      if (val === undefined || val.length == 0)
        this.store.dispatch(productActions.getProducts());
    });
    this.productSelectedRowsCount$ = this.store.pipe(
      select(productSelectedRowsCountSelector)
    );

    // Form
    this.isProductFormOpen$ = this.store.pipe(
      select(isProductFormOpenSelector)
    );
    this.productCreationForm = this.fb.group({
      name: ['', Validators.required],
      status: [true],
    });
    // Form selectors
    this.productNameForm$ = this.store.pipe(select(productNameFormSelector));

    this.productStatusForm$ = this.store.pipe(
      select(productStatusFormSelector)
    );
    // Form Sync Fields With NgRx
    this.productNameForm$.subscribe((value) => {
      this.productCreationForm.patchValue({
        name: value,
      });
    });
    this.productStatusForm$.subscribe((value) => {
      this.productCreationForm.patchValue({
        status: value,
      });
    });
  }

  closeForm(): void {
    this.store.dispatch(productActions.closeProductForm());
  }
  onSubmitCreate(name: any) {
    this.isSubmitted = true;
    let exit = false;
    this.products$.pipe(take(1)).subscribe((rows: ProductType[]) => {
      for (let i = 0; i < rows.length; i++) {
        if (name === rows[i].name) {
          this.errorModalText =
            'آیتمی با همین نام وجود دارد، لطفا نام آیتم را تغییر بدهید.';
          this.isErrorModal = true;
          exit = true;
        }
      }
    });
    if (exit) return;

    if (this.productCreationForm.valid) {
      this.confirmationService.confirm({
        target: event?.target,
        message: `آیا از ایجاد آیتم "${
          this.productCreationForm.get('name')?.value
        }" مطمئن هستید؟`,
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'بله',
        rejectLabel: 'خیر',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'ایجاد آیتم',
            detail: `درخواست ایجاد آیتم "${
              this.productCreationForm.get('name')?.value
            }" ارسال شد.`,
          });
          this.imService.postSubmitProductCreationForm().subscribe((val) => {
            this.messageService.add({
              severity: 'success',
              summary: 'ایجاد آیتم',
              detail: `آیتم "${
                this.productCreationForm.get('name')?.value
              }" با موفقیت ایجاد شد.`,
            });
          });
        },
        reject: () => {},
        header: 'ایجاد آیتم',
      });
    }
  }
  onSubmitEdit(name: any, currentEditing: string) {
    this.isSubmitted = true;
    let exit = false;
    this.products$.pipe(take(1)).subscribe((rows: ProductType[]) => {
      for (let i = 0; i < rows.length; i++) {
        if (name === rows[i].name && rows[i].name !== currentEditing) {
          exit = true;
          this.errorModalText =
            'آیتمی با همین نام وجود دارد، لطفا نام آیتم را تغییر بدهید.';
          this.isErrorModal = true;
        }
      }
    });
    if (exit) return;
    if (this.productCreationForm.valid) {
      this.confirmationService.confirm({
        target: event?.target,
        message: `آیا از ویرایش آیتم "${currentEditing}" مطمئن هستید؟`,
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'بله',
        rejectLabel: 'خیر',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'ویرایش آیتم',
            detail: `درخواست ویرایش آیتم "${currentEditing}" ارسال شد.`,
          });
          this.imService.postSubmitProductCreationForm().subscribe((val) => {
            this.messageService.add({
              severity: 'success',
              summary: 'ویرایش آیتم',
              detail: `آیتم "${currentEditing}" با موفقیت ویرایش شد.`,
            });
          });
        },
        reject: () => {},
        header: 'ویرایش آیتم',
      });
    }
  }

  onChange(elementType: 'name' | 'status', val: any): void {
    if (elementType === 'name') {
      this.store.dispatch(productActions.productNameFormUpdate({ name: val }));
    } else if (elementType === 'status') {
      this.store.dispatch(
        productActions.productStatusFormUpdate({
          status: val,
        })
      );
    }
  }
  // Utils
  isRowEdited(current: ProductType | null): boolean {
    return !isEqual(current, this.productCreationForm.value);
  }
  onAgain() {
    this.store.dispatch(productActions.productNameFormUpdate({ name: null }));
    this.store.dispatch(
      productActions.productStatusFormUpdate({ status: true })
    );
  }
}
