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
  isInventoryCategoriesLoadingSelector,
  isInventoryUsersLoadingSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { inventoryFormStateSelector } from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { ColDef } from 'ag-grid-community';
import { InventoryUserInterface } from 'src/app/types/inventory-management/inventory/inventoryUser.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryCategoryInterface } from 'src/app/types/inventory-management/inventory/inventoryCategory.interface';
import { inventoryColDef } from 'src/app/types/inventory-management/columns/inventory.column';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  // Navigation
  tabName = 'انبار';
  tabRoute = '/inventory-management/inventory';

  // Table
  rowData$: Observable<any[]>;
  isForm$: Observable<boolean>;
  colDefs: ColDef[] = inventoryColDef;

  // Form
  inventoryCategories$: Observable<InventoryCategoryInterface[]>;
  isInventoryCategoriesLoading$: Observable<boolean>;
  inventoryUsers$: Observable<InventoryUserInterface[]>;
  isInventoryUsersLoading$: Observable<boolean>;
  inventoryCreationForm: FormGroup;
  inventoryNameForm$: Observable<string | null>;
  inventoryCategoryForm$: Observable<InventoryCategoryInterface[] | null>;
  inventoryUsersForm$: Observable<InventoryUserInterface | null>;
  inventoryStatusForm$: Observable<boolean | null>;
  isSubmitted = false;

  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
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
      status: [true, Validators.required],
    });

    // Table data
    this.rowData$ = this.store.pipe(select(inventoriesSelector));
    this.rowData$.subscribe((val) => {
      if (val === undefined || val.length == 0)
        this.store.dispatch(imActions.getInventories());
    });

    // Form data
    this.isForm$ = this.store.pipe(select(inventoryFormStateSelector));
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
    console.log(val);
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
