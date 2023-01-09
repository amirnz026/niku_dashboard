import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  categoryActions,
  inventoryActions,
} from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import { Observable } from 'rxjs';
import { currentEditingCategorySelector } from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryManagementService } from 'src/app/services/inventory-management/inventory-management.service';
@Component({
  selector: 'app-category-actions-cell',
  template: `<form class="container" [formGroup]="actionsForm" #form>
    <button
      pButton
      pRipple
      type="button"
      class="p-button-rounded p-button-danger p-button-outlined"
      icon="pi pi-trash"
      (click)="onDelete()"
      pTooltip="حذف آیتم"
    ></button>

    <p-toggleButton
      [ngModel]="this.data.name === (currentEditingCategory$ | async)?.name"
      onIcon="pi pi-file-edit"
      class="p-button-rounded p-button-warning"
      offIcon="pi pi-file-edit"
      pTooltip="ویرایش آیتم"
      (click)="onEdit()"
      formControlName="editToggle"
    ></p-toggleButton>
  </form> `,
  styles: [
    `
      .container {
        display: flex;
        gap: 1rem;
      }
      button {
        height: 3rem;
        gap: 0.5rem;
      }

      :host ::ng-deep .p-button {
        padding-inline-start: 0.4rem;
      }

      :host ::ng-deep .p-togglebutton {
        height: 3rem;
        border-radius: 2rem;
        padding-inline-start: 0.8rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryActionsCellComponent
  implements OnInit, ICellRendererAngularComp
{
  data: any;
  status: boolean;
  public params!: ICellRendererParams;
  currentEditingCategory$: Observable<CategoryType | null>;
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
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.data = params.data;
    this.params = params;
  }

  ngOnInit(): void {
    this.currentEditingCategory$ = this.store.pipe(
      select(currentEditingCategorySelector)
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
          summary: 'حذف آیتم',
          detail: `درخواست حذف آیتم "${this.data.name}" ارسال شد.`,
        });
        this.imService.postSubmitCategoryCreationForm().subscribe((val) => {
          this.messageService.add({
            severity: 'success',
            summary: 'حذف آیتم',
            detail: `آیتم "${this.data.name}" با موفقیت حذف شد.`,
          });
        });
      },
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      header: 'حذف آیتم',
    });
  }

  onEdit() {
    if (!this.actionsForm.value.editToggle) {
      this.store.dispatch(
        categoryActions.setCurrentEditingCategory({ row: null })
      );
    } else {
      this.store.dispatch(
        categoryActions.setCategorySelectedRows({ rows: [] })
      );

      this.store.dispatch(
        categoryActions.setCurrentEditingCategory({ row: this.data })
      );
      this.store.dispatch(
        categoryActions.categoryNameFormUpdate({
          inventoryName: this.data.name,
        })
      );
      this.store.dispatch(
        categoryActions.categoryStatusFormUpdate({
          status: this.data.status,
        })
      );
      this.store.dispatch(
        categoryActions.categoryDescFormUpdate({
          inventoryUsers: this.data.desc,
        })
      );
    }
  }
}
