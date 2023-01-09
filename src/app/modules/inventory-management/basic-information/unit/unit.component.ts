// Angular
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// NgRx
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { unitActions } from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
// Utils
import { isEqual } from 'lodash';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
import { ConfirmationService, MessageService } from 'primeng/api';
// Ag-Grid
import { ColDef } from 'ag-grid-community';
import { StatusCellComponent } from 'src/app/modules/ag-grid/status-cell/status-cell.component';
import { UnitActionsCellComponent } from './unit-actions-cell.component';
import {
  currentEditingUnitSelector,
  isUnitFormOpenSelector,
  isUnitsLoadingSelector,
  unitNameFormSelector,
  unitSearchFilterSelector,
  unitSelectedRowsCountSelector,
  unitSelectedRowsSelector,
  unitsSelector,
  unitStatusFormSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitComponent implements OnInit {
  constructor(
    private store: Store<AppStateType>,
    private fb: FormBuilder,
    private http: HttpClient,
    private imService: InventoryManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  unitActions = unitActions;
  // Navigation
  tabName = 'واحد سنجش';
  tabRoute = '/inventory-management/unit';
  // Table
  units$: Observable<any[]>;
  isUnitsLoading$: Observable<boolean>;
  unitSelectedRows$: Observable<UnitType[]>;
  currentEditingUnit$: Observable<UnitType | null>;
  unitSelectedRowsCount$: Observable<number>;
  colDefs: ColDef[] = [
    {
      headerName: 'نام واحد سنجش',
      field: 'name',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      flex: 1,
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
      headerName: 'عملیات',
      field: 'actions',
      cellRenderer: UnitActionsCellComponent,
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
  isUnitFormOpen$: Observable<boolean>;
  unitNameForm$: Observable<string | null>;
  unitStatusForm$: Observable<boolean | null>;
  unitCreationForm: FormGroup;
  // Utils
  isErrorModal = false;
  errorModalText = '';
  isSubmitted = false;
  // Print
  unitSelectedRowsSelectorMethod: any;
  // Search-Filter
  unitSearchFilter$: Observable<string>;
  setUnitSearchFilterMethod: any;

  get name() {
    return this.unitCreationForm.get('name');
  }

  get status() {
    return this.unitCreationForm.get('status');
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
    this.unitSelectedRowsSelectorMethod = unitSelectedRowsSelector;
    // Search-Filter
    this.unitSearchFilter$ = this.store.pipe(select(unitSearchFilterSelector));
    this.setUnitSearchFilterMethod = unitActions.setUnitSearchFilter;
    // Get Selected/Editing Rows
    this.unitSelectedRows$ = this.store.pipe(select(unitSelectedRowsSelector));
    this.currentEditingUnit$ = this.store.pipe(
      select(currentEditingUnitSelector)
    );

    // Table Data
    this.units$ = this.store.pipe(select(unitsSelector));
    this.isUnitsLoading$ = this.store.pipe(select(isUnitsLoadingSelector));
    this.units$.subscribe((val) => {
      if (val === undefined || val.length == 0)
        this.store.dispatch(unitActions.getUnits());
    });
    this.unitSelectedRowsCount$ = this.store.pipe(
      select(unitSelectedRowsCountSelector)
    );

    // Form
    this.isUnitFormOpen$ = this.store.pipe(select(isUnitFormOpenSelector));
    this.unitCreationForm = this.fb.group({
      name: ['', Validators.required],
      status: [true],
    });
    // Form selectors
    this.unitNameForm$ = this.store.pipe(select(unitNameFormSelector));

    this.unitStatusForm$ = this.store.pipe(select(unitStatusFormSelector));
    // Form Sync Fields With NgRx
    this.unitNameForm$.subscribe((value) => {
      this.unitCreationForm.patchValue({
        name: value,
      });
    });
    this.unitStatusForm$.subscribe((value) => {
      this.unitCreationForm.patchValue({
        status: value,
      });
    });
  }

  closeForm(): void {
    this.store.dispatch(unitActions.closeUnitForm());
  }
  onSubmitCreate(name: any) {
    this.isSubmitted = true;
    let exit = false;
    this.units$.pipe(take(1)).subscribe((rows: UnitType[]) => {
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

    if (this.unitCreationForm.valid) {
      this.confirmationService.confirm({
        target: event?.target,
        message: `آیا از ایجاد آیتم "${
          this.unitCreationForm.get('name')?.value
        }" مطمئن هستید؟`,
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'بله',
        rejectLabel: 'خیر',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'ایجاد آیتم',
            detail: `درخواست ایجاد آیتم "${
              this.unitCreationForm.get('name')?.value
            }" ارسال شد.`,
          });
          this.imService.postSubmitUnitCreationForm().subscribe((val) => {
            this.messageService.add({
              severity: 'success',
              summary: 'ایجاد آیتم',
              detail: `آیتم "${
                this.unitCreationForm.get('name')?.value
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
    this.units$.pipe(take(1)).subscribe((rows: UnitType[]) => {
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
    if (this.unitCreationForm.valid) {
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
          this.imService.postSubmitUnitCreationForm().subscribe((val) => {
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
      this.store.dispatch(unitActions.unitNameFormUpdate({ name: val }));
    } else if (elementType === 'status') {
      this.store.dispatch(
        unitActions.unitStatusFormUpdate({
          status: val,
        })
      );
    }
  }
  // Utils
  isRowEdited(current: UnitType | null): boolean {
    return !isEqual(current, this.unitCreationForm.value);
  }
  onAgain() {
    this.store.dispatch(unitActions.unitNameFormUpdate({ name: null }));
    this.store.dispatch(unitActions.unitStatusFormUpdate({ status: true }));
  }
}
