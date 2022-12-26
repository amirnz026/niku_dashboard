import { Component, OnInit } from '@angular/core';
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
  inventoryStatusFormSelector,
  inventoryUsersFormSelector,
  inventoryUsersSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { UsersCellComponent } from 'src/app/modules/ag-grid/users-cell/users-cell.component';
import { StatusCellComponent } from 'src/app/modules/ag-grid/status-cell/status-cell.component';
import { inventoryFormStateSelector } from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { ActionsCellComponent } from 'src/app/modules/ag-grid/actions-cell/actions-cell.component';
import { ColDef } from 'ag-grid-community';
import { left } from '@popperjs/core';
import { InventoryUserInterface } from 'src/app/types/inventory-management/inventory/inventoryUser.interface';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { InventoryCategoryInterface } from 'src/app/types/inventory-management/inventory/inventoryCategory.interface';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  tabName = 'انبار';
  tabRoute = '/inventory-management/inventory';
  users: any[];
  selectedUsers: any[];
  checked = true;
  selectedCategories: any;

  rowData$: Observable<any[]>;
  isForm$: Observable<boolean>;

  inventoryCreationForm: FormGroup;

  categories$: Observable<InventoryCategoryInterface[]>;
  users$: Observable<InventoryUserInterface[]>;
  isSubmitted = false;

  inventoryNameForm$: Observable<string | null>;
  inventoryCategoryForm$: Observable<InventoryCategoryInterface | null>;
  inventoryUsersForm$: Observable<InventoryUserInterface | null>;
  inventoryStatusForm$: Observable<boolean | null>;

  colDefs: ColDef[] = [
    {
      headerName: 'نام انبار',
      field: 'name',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      flex: 2,
    },
    { headerName: 'دسته بندی', field: 'category', flex: 1 },
    {
      headerName: 'وضعیت',
      field: 'status',
      cellRenderer: StatusCellComponent,
      flex: 1,
    },
    {
      headerName: 'کاربران',
      field: 'users',
      cellRenderer: UsersCellComponent,
      autoHeight: true,
      flex: 1,
      tooltipField: 'users',
    },
    {
      headerName: 'عملیات',
      field: 'actions',
      cellRenderer: ActionsCellComponent,
      pinned: left,
      width: 140,
    },
  ];

  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder
  ) {
    this.users = [
      { name: 'امیر نظری' },
      { name: 'امیر الموتی' },
      { name: 'علی نادری' },
      { name: 'محمد محمدی' },
    ];
  }

  ngOnInit(): void {
    this.inventoryCreationForm = new FormGroup({});

    this.inventoryCreationForm = this.fb.group({
      inventoryName: ['', Validators.required],
      categoriesDropdown: ['', Validators.required],
      usersDropdown: ['', Validators.required],
      status: [true, Validators.required],
    });

    this.store.dispatch(
      tabsActions.addTab({
        tabName: this.tabName,
        tabRoute: this.tabRoute,
      })
    );
    this.store.dispatch(imActions.getInventoryCategories());
    this.store.dispatch(imActions.getInventoryUsers());
    this.users$ = this.store.pipe(select(inventoryUsersSelector));

    this.categories$ = this.store.pipe(select(inventoryCategoriesSelector));
    this.rowData$ = this.store.pipe(select(inventoriesSelector));
    this.isForm$ = this.store.pipe(select(inventoryFormStateSelector));

    // Form Values Selectors
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
        categoriesDropdown: value,
      });
    });
    this.inventoryCategoryForm$.subscribe((value) => {
      this.inventoryCreationForm.patchValue({
        usersDropdown: value,
      });
    });
    this.inventoryStatusForm$.subscribe((value) => {
      this.inventoryCreationForm.patchValue({
        status: value,
      });
    });

    this.onChanges();
  }
  closeForm(): void {
    this.store.dispatch(imActions.closeInventoryForm());
  }
  onSubmit(): void {
    this.isSubmitted = true;
    console.warn(this.inventoryCreationForm.value);
    console.warn(this.inventoryCreationForm.valid);
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
  onChanges(): void {
    // this.inventoryCreationForm
    //   .get('inventoryName')
    //   ?.valueChanges.subscribe((val) => {
    //     this.store.dispatch(
    //       imActions.inventoryNameFormUpdate({ inventoryName: val })
    //     );
    //   });
    this.inventoryCreationForm
      .get('categoriesDropdown')
      ?.valueChanges.subscribe((val) => {
        console.log(val);
        this.store.dispatch(
          imActions.inventoryCategoryFormUpdate({
            inventoryCategoryName: val,
          })
        );
      });
    // this.inventoryCreationForm
    //   .get('usersDropdown')
    //   ?.valueChanges.subscribe((val) => {
    //     this.store.dispatch(
    //       imActions.inventoryUsersFormUpdate({ inventoryUsers: val })
    //     );
    //   });
  }
}
