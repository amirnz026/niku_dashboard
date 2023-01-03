import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, GridOptions, ICellRendererParams } from 'ag-grid-community';
import { ConfirmationService } from 'primeng/api';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as imActions from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
import { Observable, take } from 'rxjs';
import { InventoryFormStateType } from 'src/app/types/inventory-management/inventory/inventoryPage.interface';
import { inventoryFormStateSelector } from 'src/app/ngrx/inventory-management/inventoryManagement.selectors';
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
  inventoryFormState$: Observable<InventoryFormStateType>;
  public params!: ICellRendererParams;

  constructor(
    private store: Store<AppStateInterface>,
    private confirmationService: ConfirmationService
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
  }
  onDelete() {
    this.confirmationService.confirm({
      message: `آیا از حذف  "${this.data.name}" مطمئن هستید؟`,
      accept: () => {
        //Actual logic to perform a confirmation
      },
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      header: 'حذف انبار',
    });
  }
  onEdit() {
    // this.store.dispatch(imActions.inventoryFormStateToEdit());
    // this.store.dispatch(
    //   imActions.inventoryNameFormUpdate({
    //     inventoryName: this.data.name,
    //   })
    // );
    // this.store.dispatch(
    //   imActions.inventoryCategoryFormUpdate({
    //     inventoryCategoryName: this.data.category,
    //   })
    // );
    // this.store.dispatch(
    //   imActions.inventoryStatusFormUpdate({
    //     status: this.data.status,
    //   })
    // );
    // this.store.dispatch(
    //   imActions.inventoryUsersFormUpdate({
    //     inventoryUsers: this.data.users,
    //   })
    // );
  }
}
