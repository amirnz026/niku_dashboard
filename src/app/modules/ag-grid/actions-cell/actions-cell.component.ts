import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmationService, MessageService } from 'primeng/api';
import { inventoryActions } from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import { Observable } from 'rxjs';
import { currentEditingInventorySelector } from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
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
  public params!: ICellRendererParams;
  currentEditingInventory$: Observable<InventoryType | null>;
  actionsForm: FormGroup;

  get editToggle() {
    return this.actionsForm.get('editToggle');
  }

  constructor(
    private store: Store<AppStateType>,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private imService: InventoryManagementService
  ) {}
  agInit(params: ICellRendererParams): void {
    this.data = params.data;
    this.params = params;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  ngOnInit(): void {
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
        inventoryActions.setCurrentEditingInventory({ row: null })
      );
    } else {
      this.store.dispatch(
        inventoryActions.setInventorySelectedRows({ rows: [] })
      );

      this.store.dispatch(
        inventoryActions.setCurrentEditingInventory({ row: this.data })
      );
      this.store.dispatch(
        inventoryActions.inventoryNameFormUpdate({
          inventoryName: this.data.name,
        })
      );
      this.store.dispatch(
        inventoryActions.inventoryCategoryFormUpdate({
          inventoryCategoryName: this.data.category,
        })
      );
      this.store.dispatch(
        inventoryActions.inventoryStatusFormUpdate({
          status: this.data.status,
        })
      );
      this.store.dispatch(
        inventoryActions.inventoryUsersFormUpdate({
          inventoryUsers: this.data.users,
        })
      );
    }
  }
}
