import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import { isEqual } from 'lodash';

import {
  currentEditingInventorySelector,
  inventoriesSelector,
  inventoryCategoriesSelector,
  inventoryCategoryFormSelector,
  inventoryNameFormSelector,
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
import { ColDef } from 'ag-grid-community';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { inventoryColDef } from 'src/app/types/inventory-management/columns/inventory.column';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InventoryType } from 'src/app/types/inventory-management/inventory/inventoryPage.type';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent implements OnInit {
  // Navigation
  tabName = 'انبار';
  tabRoute = '/inventory-management/inventory';

  // Table
  rowData$: Observable<any[]>;
  isInventoriesLoading$: Observable<boolean>;
  inventorySelectedRows$: Observable<InventoryType[]>;
  colDefs: ColDef[] = inventoryColDef;

  // Form
  isInventoryFormOpen$: Observable<boolean>;
  inventoryCategories$: Observable<string[]>;
  isInventoryCategoriesLoading$: Observable<boolean>;
  inventoryUsers$: Observable<string[]>;
  isInventoryUsersLoading$: Observable<boolean>;
  inventoryCreationForm: FormGroup;
  inventoryNameForm$: Observable<string | null>;
  inventoryCategoryForm$: Observable<string | null>;
  inventoryUsersForm$: Observable<string[]>;
  inventoryStatusForm$: Observable<boolean | null>;
  inventorySelectedRowsCount$: Observable<number>;
  currentEditingInventory$: Observable<InventoryType | null>;

  isErrorModal = false;
  errorModalText = '';

  isSubmitted = false;
  get name() {
    return this.inventoryCreationForm.get('name');
  }

  get category() {
    return this.inventoryCreationForm.get('category');
  }

  get users() {
    return this.inventoryCreationForm.get('users');
  }

  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder,
    private http: HttpClient,
    private imService: InventoryManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Get selected rows
    this.isInventoryFormOpen$ = this.store.pipe(
      select(isInventoryFormOpenSelector)
    );
    this.inventorySelectedRows$ = this.store.pipe(
      select(inventorySelectedRowsSelector)
    );
    this.currentEditingInventory$ = this.store.pipe(
      select(currentEditingInventorySelector)
    );
    // Tab Management
    this.store.dispatch(
      tabsActions.addTab({
        tabName: this.tabName,
        tabRoute: this.tabRoute,
      })
    );

    // Form creation
    this.inventoryCreationForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      users: ['', Validators.required],
      status: [true],
    });

    // Table data
    this.rowData$ = this.store.pipe(select(inventoriesSelector));
    this.isInventoriesLoading$ = this.store.pipe(
      select(isInventoriesLoadingSelector)
    );
    this.rowData$.subscribe((val) => {
      if (val === undefined || val.length == 0)
        this.store.dispatch(imActions.getInventories());
    });
    this.inventorySelectedRowsCount$ = this.store.pipe(
      select(inventorySelectedRowsCountSelector)
    );
    // Form data

    this.inventoryUsers$ = this.store.pipe(select(inventoryUsersSelector));
    this.inventoryUsers$.subscribe((val) => {
      if (val === undefined || val.length == 0)
        this.store.dispatch(imActions.getInventoryUsers());
    });
    this.inventoryCategories$ = this.store.pipe(
      select(inventoryCategoriesSelector)
    );
    this.inventoryCategories$.subscribe((val) => {
      if (val === undefined || val.length == 0)
        this.store.dispatch(imActions.getInventoryCategories());
    });
    this.isInventoryCategoriesLoading$ = this.store.pipe(
      select(isInventoryCategoriesLoadingSelector)
    );
    this.isInventoryUsersLoading$ = this.store.pipe(
      select(isInventoryUsersLoadingSelector)
    );
    // Reactive form selectors
    this.inventoryNameForm$ = this.store.pipe(
      select(inventoryNameFormSelector)
    );
    this.inventoryCategoryForm$ = this.store.pipe(
      select(inventoryCategoryFormSelector)
    );
    this.inventoryUsersForm$ = this.store.pipe(
      select(inventoryUsersFormSelector)
    );
    this.inventoryStatusForm$ = this.store.pipe(
      select(inventoryStatusFormSelector)
    );
    // Form values subscribing to observables
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
    this.store.dispatch(imActions.closeInventoryForm());
  }
  onSubmitCreate(name: any) {
    this.isSubmitted = true;
    let exit = false;
    this.rowData$.pipe(take(1)).subscribe((rows: InventoryType[]) => {
      for (let i = 0; i < rows.length; i++) {
        if (name === rows[i].name) {
          this.errorModalText =
            'آیتمی با همین نام وجود دارد، لطفا نام آیتم را تغییر بدهید.';
          this.isErrorModal = true;
          exit = true;
        }
      }
    });
    if (exit) {
      return;
    }
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
    this.rowData$.pipe(take(1)).subscribe((rows: InventoryType[]) => {
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
        imActions.inventoryNameFormUpdate({ inventoryName: val })
      );
    } else if (elementType === 'category') {
      this.store.dispatch(
        imActions.inventoryCategoryFormUpdate({
          inventoryCategoryName: val,
        })
      );
    } else if (elementType === 'users') {
      this.store.dispatch(
        imActions.inventoryUsersFormUpdate({
          inventoryUsers: val,
        })
      );
    } else if (elementType === 'status') {
      this.store.dispatch(
        imActions.inventoryStatusFormUpdate({
          status: val,
        })
      );
    }
  }
  isRowEdited(current: any): boolean {
    return !isEqual(current, this.inventoryCreationForm.value);
  }
}
