import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import {
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
  isInventoryUsersLoadingSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { inventoryFormStateSelector } from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { ColDef } from 'ag-grid-community';
import { InventoryUserInterface } from 'src/app/types/inventory-management/inventory/inventoryUser.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryCategoryInterface } from 'src/app/types/inventory-management/inventory/inventoryCategory.interface';
import { inventoryColDef } from 'src/app/types/inventory-management/columns/inventory.column';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';

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
  inventoryFormState$: Observable<'edit' | 'create' | null>;
  inventorySelectedRows$: Observable<InventoryInterface[]>;
  colDefs: ColDef[] = inventoryColDef;

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  // Form
  inventoryCategories$: Observable<InventoryCategoryInterface[]>;
  isInventoryCategoriesLoading$: Observable<boolean>;
  inventoryUsers$: Observable<InventoryUserInterface[]>;
  isInventoryUsersLoading$: Observable<boolean>;
  inventoryCreationForm: FormGroup;
  inventoryNameForm$: Observable<string | null>;
  inventoryCategoryForm$: Observable<InventoryCategoryInterface | null>;
  inventoryUsersForm$: Observable<InventoryUserInterface[]>;
  inventoryStatusForm$: Observable<boolean | null>;
  inventorySelectedRowsCount$: Observable<number>;
  isSubmitted = false;

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
    this.inventorySelectedRows$ = this.store.pipe(
      select(inventorySelectedRowsSelector)
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
      inventoryName: ['', Validators.required],
      categoriesDropdown: ['', Validators.required],
      usersDropdown: ['', Validators.required],
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
    this.inventoryFormState$ = this.store.pipe(
      select(inventoryFormStateSelector)
    );
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
        inventoryName: value,
      });
    });
    this.inventoryCategoryForm$.subscribe((value) => {
      this.inventoryCreationForm.patchValue({
        categoriesDropdown: value,
      });
    });
    this.inventoryUsersForm$.subscribe((value) => {
      this.inventoryCreationForm.patchValue({
        usersDropdown: value,
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
  onSubmit(): void {
    this.isSubmitted = true;
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
    this.inventoryFormState$.subscribe((formState) => {
      if (formState === 'create') {
        if (this.inventoryCreationForm.valid) {
          this.confirmationService.confirm({
            target: event?.target,
            message: `آیا از ساخت انبار "${
              this.inventoryCreationForm.get('inventoryName')?.value
            }" مطمئن هستید؟`,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'بله',
            rejectLabel: 'خیر',
            accept: () => {
              this.messageService.add({
                severity: 'info',
                summary: 'ایجاد انبار',
                detail: `درخواست ایجاد انبار "${
                  this.inventoryCreationForm.get('inventoryName')?.value
                }" ارسال شد.`,
              });
              this.imService
                .postSubmitInventoryCreationForm()
                .subscribe((val) => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'ایجاد انبار',
                    detail: `انبار "${
                      this.inventoryCreationForm.get('inventoryName')?.value
                    }" با موفقیت ایجاد شد.`,
                  });
                });
            },
            reject: () => {},
            header: 'ایجاد انبار',
          });
        }
      } else if (formState === 'edit') {
        this.confirmationService.confirm({
          target: event?.target,
          message: `آیا از ویرایش انبار "${
            this.inventoryCreationForm.get('inventoryName')?.value
          }" مطمئن هستید؟`,
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'بله',
          rejectLabel: 'خیر',
          accept: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'ویرایش انبار',
              detail: `درخواست ویرایش انبار "${
                this.inventoryCreationForm.get('inventoryName')?.value
              }" ارسال شد.`,
            });
            this.imService
              .postSubmitInventoryCreationForm()
              .subscribe((val) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'ویرایش انبار',
                  detail: `انبار "${
                    this.inventoryCreationForm.get('inventoryName')?.value
                  }" با موفقیت ویرایش شد.`,
                });
              });
          },
          reject: () => {},
          header: 'ویرایش انبار',
        });
      }
    });
  }

  get inventoryName() {
    return this.inventoryCreationForm.get('inventoryName');
  }

  get categoriesDropdown() {
    return this.inventoryCreationForm.get('categoriesDropdown');
  }

  get usersDropdown() {
    return this.inventoryCreationForm.get('usersDropdown');
  }

  onChange(
    elementType:
      | 'inventoryName'
      | 'categoriesDropdown'
      | 'usersDropdown'
      | 'status',
    val: any
  ): void {
    if (elementType === 'inventoryName') {
      this.store.dispatch(
        imActions.inventoryNameFormUpdate({ inventoryName: val })
      );
    } else if (elementType === 'categoriesDropdown') {
      this.store.dispatch(
        imActions.inventoryCategoryFormUpdate({
          inventoryCategoryName: val,
        })
      );
    } else if (elementType === 'usersDropdown') {
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
}
