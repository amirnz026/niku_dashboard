import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, GridOptions, ICellRendererParams } from 'ag-grid-community';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import { Observable, take } from 'rxjs';
import { InventoryFormStateType } from 'src/app/types/inventory-management/inventory/inventoryPage.interface';
import {
  currentEditingInventorySelector,
  inventoryFormStateSelector,
} from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
@Component({
  selector: 'app-actions-cell',
  templateUrl: './actions-cell.component.html',
  styleUrls: ['./actions-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsCellComponent implements OnInit, ICellRendererAngularComp {
  data: any;
  status: boolean;
  private gridApi: GridApi;
  private gridOptions: GridOptions;
  public params!: ICellRendererParams;
  inventoryFormState$: Observable<InventoryFormStateType>;
  currentEditingInventory$: Observable<InventoryInterface | null>;
  actionsForm: FormGroup;

  get editToggle() {
    return this.actionsForm.get('editToggle');
  }

  constructor(
    private store: Store<AppStateInterface>,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private imService: InventoryManagementService
  ) {}
  agInit(params: ICellRendererParams): void {
    this.data = params.data;
    this.gridApi = params.api;
    this.params = params;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  ngOnInit(): void {
    this.inventoryFormState$ = this.store.pipe(
      select(inventoryFormStateSelector)
    );
    this.currentEditingInventory$ = this.store.pipe(
      select(currentEditingInventorySelector)
    );

    this.actionsForm = this.fb.group({
      editToggle: [false],
    });
  }
  onDelete() {
    this.confirmationService.confirm({
      message: `آیا از حذف  "${this.data.name}" مطمئن هستید؟`,
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'حذف انبار',
          detail: `درخواست حذف انبار "${this.data.name}" ارسال شد.`,
        });
        this.imService.postSubmitInventoryCreationForm().subscribe((val) => {
          this.messageService.add({
            severity: 'success',
            summary: 'حذف انبار',
            detail: `انبار "${this.data.name}" با موفقیت حذف شد.`,
          });
        });
      },
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      header: 'حذف انبار',
    });
  }

  onEdit() {
    if (!this.actionsForm.value.editToggle) {
      this.store.dispatch(
        imActions.setCurrentEditingInventory({ inventory: null })
      );
    } else {
      // this.store.dispatch(imActions.inventoryFormStateToEdit());
      this.store.dispatch(
        imActions.setInventorySelectedRows({ inventories: [] })
      );

      this.store.dispatch(
        imActions.setCurrentEditingInventory({ inventory: this.data })
      );
      this.store.dispatch(
        imActions.inventoryNameFormUpdate({
          inventoryName: this.data.name,
        })
      );
      this.store.dispatch(
        imActions.inventoryCategoryFormUpdate({
          inventoryCategoryName: this.data.category,
        })
      );
      this.store.dispatch(
        imActions.inventoryStatusFormUpdate({
          status: this.data.status,
        })
      );
      this.store.dispatch(
        imActions.inventoryUsersFormUpdate({
          inventoryUsers: this.data.users,
        })
      );
    }
  }
}
