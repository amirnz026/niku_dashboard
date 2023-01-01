import { left } from '@popperjs/core';
import { ColDef } from 'ag-grid-community';
import { ActionsCellComponent } from 'src/app/modules/ag-grid/actions-cell/actions-cell.component';
import { StatusCellComponent } from 'src/app/modules/ag-grid/status-cell/status-cell.component';
import { UsersCellComponent } from 'src/app/modules/ag-grid/users-cell/users-cell.component';

export const inventoryColDef: ColDef[] = [
  {
    headerName: 'نام انبار',
    field: 'name',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    flex: 2,
  },
  {
    headerName: 'دسته بندی',
    field: 'category',
    valueGetter: 'data.category.name',
  },
  {
    headerName: 'وضعیت',
    field: 'status',
    cellRenderer: StatusCellComponent,
  },
  {
    headerName: 'کاربران',
    field: 'users',
    cellRenderer: UsersCellComponent,
    tooltipField: 'users',
    valueGetter: 'data.users',
  },
  // {
  //   headerName: 'عملیات',
  //   field: 'actions',
  //   cellRenderer: ActionsCellComponent,
  //   resizable: false,
  //   width: 140,
  //   autoHeight: false,
  //   lockPosition: 'right',
  //   pinned: left,
  // },
];
