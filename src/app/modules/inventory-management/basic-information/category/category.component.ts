// Angular
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// NgRx
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { categoryActions } from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
// Utils
import { isEqual } from 'lodash';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
import { ConfirmationService, MessageService } from 'primeng/api';
// Ag-Grid
import { ColDef } from 'ag-grid-community';
import { StatusCellComponent } from 'src/app/modules/ag-grid/status-cell/status-cell.component';
import { CategoryActionsCellComponent } from './category-actions-cell.component';
import {
  categoriesSelector,
  categoryDescFormSelector,
  categoryNameFormSelector,
  categorySearchFilterSelector,
  categorySelectedRowsCountSelector,
  categorySelectedRowsSelector,
  categoryStatusFormSelector,
  currentEditingCategorySelector,
  isCategoriesLoadingSelector,
  isCategoryFormOpenSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
  constructor(
    private store: Store<AppStateType>,
    private fb: FormBuilder,
    private http: HttpClient,
    private imService: InventoryManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  categoryActions = categoryActions;
  // Navigation
  tabName = 'دسته بندی';
  tabRoute = '/inventory-management/category';
  // Table
  categories$: Observable<any[]>;
  isCategoriesLoading$: Observable<boolean>;
  categorySelectedRows$: Observable<CategoryType[]>;
  currentEditingCategory$: Observable<CategoryType | null>;
  categorySelectedRowsCount$: Observable<number>;
  colDefs: ColDef[] = [
    {
      headerName: 'نام دسته بندی',
      field: 'name',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      flex: 2,
      minWidth: 200,
    },
    {
      headerName: 'وضعیت',
      field: 'status',
      cellRenderer: StatusCellComponent,
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: 'توضیحات',
      field: 'desc',
      tooltipField: 'desc',
      flex: 3,
      minWidth: 200,
    },
    {
      headerName: 'عملیات',
      field: 'actions',
      cellRenderer: CategoryActionsCellComponent,
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
  isCategoryFormOpen$: Observable<boolean>;
  categoryNameForm$: Observable<string | null>;
  categoryStatusForm$: Observable<boolean | null>;
  categoryDescForm$: Observable<string | null>;
  categoryCreationForm: FormGroup;
  // Utils
  isErrorModal = false;
  errorModalText = '';
  isSubmitted = false;
  // Print
  categorySelectedRowsSelectorMethod: any;
  // Search-Filter
  categorySearchFilter$: Observable<string>;
  setCategorySearchFilterMethod: any;

  get name() {
    return this.categoryCreationForm.get('name');
  }

  get status() {
    return this.categoryCreationForm.get('status');
  }

  get desc() {
    return this.categoryCreationForm.get('users');
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
    this.categorySelectedRowsSelectorMethod = categorySelectedRowsSelector;
    // Search-Filter
    this.categorySearchFilter$ = this.store.pipe(
      select(categorySearchFilterSelector)
    );
    this.setCategorySearchFilterMethod =
      categoryActions.setCategorySearchFilter;
    // Get Selected/Editing Rows
    this.categorySelectedRows$ = this.store.pipe(
      select(categorySelectedRowsSelector)
    );
    this.currentEditingCategory$ = this.store.pipe(
      select(currentEditingCategorySelector)
    );

    // Table Data
    this.categories$ = this.store.pipe(select(categoriesSelector));
    this.isCategoriesLoading$ = this.store.pipe(
      select(isCategoriesLoadingSelector)
    );
    this.categories$.subscribe((val) => {
      if (val === undefined || val.length == 0)
        this.store.dispatch(categoryActions.getCategories());
    });
    this.categorySelectedRowsCount$ = this.store.pipe(
      select(categorySelectedRowsCountSelector)
    );

    // Form
    this.isCategoryFormOpen$ = this.store.pipe(
      select(isCategoryFormOpenSelector)
    );
    this.categoryCreationForm = this.fb.group({
      name: ['', Validators.required],
      status: [true],
      desc: [''],
    });
    // Form selectors
    this.categoryNameForm$ = this.store.pipe(select(categoryNameFormSelector));

    this.categoryStatusForm$ = this.store.pipe(
      select(categoryStatusFormSelector)
    );
    this.categoryDescForm$ = this.store.pipe(select(categoryDescFormSelector));
    // Form Sync Fields With NgRx
    this.categoryNameForm$.subscribe((value) => {
      this.categoryCreationForm.patchValue({
        name: value,
      });
    });
    this.categoryStatusForm$.subscribe((value) => {
      this.categoryCreationForm.patchValue({
        status: value,
      });
    });
    this.categoryDescForm$.subscribe((value) => {
      this.categoryCreationForm.patchValue({
        desc: value,
      });
    });
  }

  closeForm(): void {
    this.store.dispatch(categoryActions.closeCategoryForm());
  }
  onSubmitCreate(name: any) {
    this.isSubmitted = true;
    let exit = false;
    this.categories$.pipe(take(1)).subscribe((rows: CategoryType[]) => {
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

    if (this.categoryCreationForm.valid) {
      this.confirmationService.confirm({
        target: event?.target,
        message: `آیا از ایجاد آیتم "${
          this.categoryCreationForm.get('name')?.value
        }" مطمئن هستید؟`,
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'بله',
        rejectLabel: 'خیر',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'ایجاد آیتم',
            detail: `درخواست ایجاد آیتم "${
              this.categoryCreationForm.get('name')?.value
            }" ارسال شد.`,
          });
          this.imService.postSubmitCategoryCreationForm().subscribe((val) => {
            this.messageService.add({
              severity: 'success',
              summary: 'ایجاد آیتم',
              detail: `آیتم "${
                this.categoryCreationForm.get('name')?.value
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
    this.categories$.pipe(take(1)).subscribe((rows: CategoryType[]) => {
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
    if (this.categoryCreationForm.valid) {
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
          this.imService.postSubmitCategoryCreationForm().subscribe((val) => {
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

  onChange(elementType: 'name' | 'status' | 'desc', val: any): void {
    if (elementType === 'name') {
      this.store.dispatch(
        categoryActions.categoryNameFormUpdate({ name: val })
      );
    } else if (elementType === 'status') {
      this.store.dispatch(
        categoryActions.categoryStatusFormUpdate({
          status: val,
        })
      );
    } else if (elementType === 'desc') {
      this.store.dispatch(
        categoryActions.categoryDescFormUpdate({ desc: val })
      );
    }
  }
  // Utils
  isRowEdited(current: CategoryType | null): boolean {
    return !isEqual(current, this.categoryCreationForm.value);
  }
  onAgain() {
    this.store.dispatch(categoryActions.categoryNameFormUpdate({ name: null }));
    this.store.dispatch(
      categoryActions.categoryStatusFormUpdate({ status: true })
    );
    this.store.dispatch(
      categoryActions.categoryDescFormUpdate({ string: null })
    );
  }
}
