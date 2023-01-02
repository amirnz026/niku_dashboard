import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, GridOptions, ICellRendererParams } from 'ag-grid-community';
import { ConfirmationService } from 'primeng/api';
import { AppStateInterface } from 'src/app/types/appState.interface';
import {
  inventoryCategoryFormUpdate,
  inventoryFormStateToEdit,
  inventoryNameFormUpdate,
  inventoryStatusFormUpdate,
  inventoryUsersFormUpdate,
} from 'src/app/ngrx/inventory-management/inventoryManagement.actions';
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
  constructor(
    private store: Store<AppStateInterface>,
    private confirmationService: ConfirmationService
  ) {}
  agInit(params: ICellRendererParams): void {
    this.data = params.data;
    this.gridApi = params.api;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  ngOnInit(): void {}
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
    this.store.dispatch(inventoryFormStateToEdit());

    this.store.dispatch(
      inventoryNameFormUpdate({
        inventoryName: this.data.name,
      })
    );

    this.store.dispatch(
      inventoryCategoryFormUpdate({
        inventoryCategoryName: this.data.category,
      })
    );
    this.store.dispatch(
      inventoryStatusFormUpdate({
        status: this.data.state,
      })
    );
    this.store.dispatch(
      inventoryUsersFormUpdate({
        inventoryUsers: this.data.users,
      })
    );
  }
}
