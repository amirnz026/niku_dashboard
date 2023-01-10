// Angular
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// NgRx
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { inventoryActions } from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import {
  currentEditingInventorySelector,
  inventoriesSelector,
  inventoryCategoriesSelector,
  inventoryCategoryFormSelector,
  inventoryNameFormSelector,
  inventorySearchFilterSelector,
  inventorySelectedRowsCountSelector,
  inventorySelectedRowsSelector,
  inventoryStatusFormSelector,
  inventoryUsersFormSelector,
  inventoryUsersSelector,
  isInventoriesLoadingSelector,
  isInventoryCategoriesLoadingSelector,
  isInventoryFormOpenSelector,
  isInventoryUsersLoadingSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
// Utils
import { isEqual } from 'lodash';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
import { ConfirmationService, MessageService } from 'primeng/api';
// Ag-Grid
import { ColDef } from 'ag-grid-community';
import { InventoryActionsCellComponent } from 'src/app/modules/inventory-management/basic-information/inventory/inventory-actions-cell.component';
import { UsersCellComponent } from 'src/app/modules/ag-grid/users-cell/users-cell.component';
import { StatusCellComponent } from 'src/app/modules/ag-grid/status-cell/status-cell.component';
import { CustomTooltipComponent } from 'src/app/modules/ag-grid/tooltip/custom-tooltip.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent implements OnInit {
  constructor(
    private store: Store<AppStateType>,
    private fb: FormBuilder,
    private http: HttpClient,
    private imService: InventoryManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  inventoryActions = inventoryActions;
  // Navigation
  tabName = 'انبار';
  tabRoute = '/inventory-management/inventory';
  // Table
  inventories$: Observable<any[]>;
  isInventoriesLoading$: Observable<boolean>;
  inventorySelectedRows$: Observable<InventoryType[]>;
  currentEditingInventory$: Observable<InventoryType | null>;
  inventorySelectedRowsCount$: Observable<number>;
  colDefs: ColDef[] = [
    {
      headerName: 'نام انبار',
      field: 'name',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      flex: 2,
      minWidth: 200,
    },
    {
      headerName: 'دسته بندی',
      field: 'category',
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: 'وضعیت',
      field: 'status',
      cellRenderer: StatusCellComponent,
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: 'کاربران',
      field: 'users',
      cellRenderer: UsersCellComponent,
      tooltipField: 'users',
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: 'عملیات',
      field: 'actions',
      cellRenderer: InventoryActionsCellComponent,
      resizable: false,
      width: 140,
      autoHeight: false,
      lockPosition: 'right',
      // pinned: left,
      sortable: false,
      minWidth: 100,
    },
  ];

  // Form
  isInventoryFormOpen$: Observable<boolean>;
  inventoryNameForm$: Observable<string | null>;
  inventoryCategories$: Observable<string[]>;
  isInventoryCategoriesLoading$: Observable<boolean>;
  inventoryCategoryForm$: Observable<string | null>;
  inventoryUsers$: Observable<string[]>;
  isInventoryUsersLoading$: Observable<boolean>;
  inventoryUsersForm$: Observable<string[]>;
  inventoryStatusForm$: Observable<boolean | null>;
  inventoryCreationForm: FormGroup;
  // Utils
  isErrorModal = false;
  errorModalText = '';
  isSubmitted = false;
  // Print
  inventorySelectedRowsSelectorMethod: any;
  // Search-Filter
  inventorySearchFilter$: Observable<string>;
  setInventorySearchFilterMethod: any;

  get name() {
    return this.inventoryCreationForm.get('name');
  }

  get category() {
    return this.inventoryCreationForm.get('category');
  }

  get users() {
    return this.inventoryCreationForm.get('users');
  }

  get isNameFieldError() {
    return (
      (this.isSubmitted && this.name && this.name.errors) ||
      (this.name && this.name.invalid && (this.name.dirty || this.name.touched))
    );
  }
  get isCategoryFieldError() {
    return (
      (this.isSubmitted && this.category && this.category.errors) ||
      (this.category &&
        this.category.invalid &&
        (this.category.dirty || this.category.touched))
    );
  }

  get isUsersFieldError() {
    return (
      (this.isSubmitted && this.users && this.users.errors) ||
      (this.users &&
        this.users.invalid &&
        (this.users.dirty || this.users.touched))
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
    this.inventorySelectedRowsSelectorMethod = inventorySelectedRowsSelector;
    // Search-Filter
    this.inventorySearchFilter$ = this.store.pipe(
      select(inventorySearchFilterSelector)
    );
    this.setInventorySearchFilterMethod =
      inventoryActions.setInventorySearchFilter;
    // Get Selected/Editing Rows
    this.inventorySelectedRows$ = this.store.pipe(
      select(inventorySelectedRowsSelector)
    );
    this.currentEditingInventory$ = this.store.pipe(
      select(currentEditingInventorySelector)
    );

    // Table Data
    this.inventories$ = this.store.pipe(select(inventoriesSelector));
    this.isInventoriesLoading$ = this.store.pipe(
      select(isInventoriesLoadingSelector)
    );
    this.inventories$.subscribe((val) => {
      if (val === undefined || val.length == 0)
        this.store.dispatch(inventoryActions.getInventories());
    });
    this.inventorySelectedRowsCount$ = this.store.pipe(
      select(inventorySelectedRowsCountSelector)
    );

    // Form
    this.isInventoryFormOpen$ = this.store.pipe(
      select(isInventoryFormOpenSelector)
    );
    this.inventoryCreationForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      users: ['', Validators.required],
      status: [true],
    });
    this.inventoryUsers$ = this.store.pipe(select(inventoryUsersSelector));
    this.inventoryUsers$.subscribe((val) => {
      if (val === undefined || val.length == 0)
        this.store.dispatch(inventoryActions.getInventoryUsers());
    });
    this.inventoryCategories$ = this.store.pipe(
      select(inventoryCategoriesSelector)
    );
    this.inventoryCategories$.subscribe((val) => {
      if (val === undefined || val.length == 0)
        this.store.dispatch(inventoryActions.getInventoryCategories());
    });
    this.isInventoryCategoriesLoading$ = this.store.pipe(
      select(isInventoryCategoriesLoadingSelector)
    );
    this.isInventoryUsersLoading$ = this.store.pipe(
      select(isInventoryUsersLoadingSelector)
    );
    // Form selectors
    this.inventoryNameForm$ = this.store.pipe(
      select(inventoryNameFormSelector)
    );
    this.inventoryCategoryForm$ = this.store.pipe(
      select(inventoryCategoryFormSelector)
    );
    this.inventoryStatusForm$ = this.store.pipe(
      select(inventoryStatusFormSelector)
    );
    this.inventoryUsersForm$ = this.store.pipe(
      select(inventoryUsersFormSelector)
    );
    // Form Sync Fields With NgRx
    this.inventoryNameForm$.subscribe((value) => {
      this.inventoryCreationForm.patchValue({
        name: value,
      });
    });
    this.inventoryCategoryForm$.subscribe((value) => {
      this.inventoryCreationForm.patchValue({
        category: value,
      });
    });
    this.inventoryUsersForm$.subscribe((value) => {
      this.inventoryCreationForm.patchValue({
        users: value,
      });
    });

    this.inventoryStatusForm$.subscribe((value) => {
      this.inventoryCreationForm.patchValue({
        status: value,
      });
    });
  }

  closeForm(): void {
    this.store.dispatch(inventoryActions.closeInventoryForm());
  }
  onSubmitCreate(name: any) {
    this.isSubmitted = true;
    let exit = false;
    this.inventories$.pipe(take(1)).subscribe((rows: InventoryType[]) => {
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

    if (this.inventoryCreationForm.valid) {
      this.confirmationService.confirm({
        target: event?.target,
        message: `آیا از ایجاد انبار "${
          this.inventoryCreationForm.get('name')?.value
        }" مطمئن هستید؟`,
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'بله',
        rejectLabel: 'خیر',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'ایجاد انبار',
            detail: `درخواست ایجاد انبار "${
              this.inventoryCreationForm.get('name')?.value
            }" ارسال شد.`,
          });
          this.imService.postSubmitInventoryCreationForm().subscribe((val) => {
            this.messageService.add({
              severity: 'success',
              summary: 'ایجاد انبار',
              detail: `انبار "${
                this.inventoryCreationForm.get('name')?.value
              }" با موفقیت ایجاد شد.`,
            });
          });
        },
        reject: () => {},
        header: 'ایجاد انبار',
      });
    }
  }
  onSubmitEdit(name: any, currentEditing: string) {
    this.isSubmitted = true;
    let exit = false;
    this.inventories$.pipe(take(1)).subscribe((rows: InventoryType[]) => {
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
    if (this.inventoryCreationForm.valid) {
      this.confirmationService.confirm({
        target: event?.target,
        message: `آیا از ویرایش انبار "${currentEditing}" مطمئن هستید؟`,
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'بله',
        rejectLabel: 'خیر',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'ویرایش انبار',
            detail: `درخواست ویرایش انبار "${currentEditing}" ارسال شد.`,
          });
          this.imService.postSubmitInventoryCreationForm().subscribe((val) => {
            this.messageService.add({
              severity: 'success',
              summary: 'ویرایش انبار',
              detail: `انبار "${currentEditing}" با موفقیت ویرایش شد.`,
            });
          });
        },
        reject: () => {},
        header: 'ویرایش انبار',
      });
    }
  }

  onChange(
    elementType: 'name' | 'category' | 'users' | 'status',
    val: any
  ): void {
    if (elementType === 'name') {
      this.store.dispatch(
        inventoryActions.inventoryNameFormUpdate({ inventoryName: val })
      );
    } else if (elementType === 'category') {
      this.store.dispatch(
        inventoryActions.inventoryCategoryFormUpdate({
          inventoryCategoryName: val,
        })
      );
    } else if (elementType === 'users') {
      this.store.dispatch(
        inventoryActions.inventoryUsersFormUpdate({
          inventoryUsers: val,
        })
      );
    } else if (elementType === 'status') {
      this.store.dispatch(
        inventoryActions.inventoryStatusFormUpdate({
          status: val,
        })
      );
    }
  }
  // Utils
  isRowEdited(current: InventoryType | null): boolean {
    return !isEqual(current, this.inventoryCreationForm.value);
  }
  onAgain() {
    this.store.dispatch(
      inventoryActions.inventoryNameFormUpdate({ inventoryName: null })
    );
    this.store.dispatch(
      inventoryActions.inventoryStatusFormUpdate({ status: true })
    );
    this.store.dispatch(
      inventoryActions.inventoryCategoryFormUpdate({
        inventoryCategoryName: null,
      })
    );
    this.store.dispatch(
      inventoryActions.inventoryUsersFormUpdate({
        inventoryUsers: [],
      })
    );
  }
}
