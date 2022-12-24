import { OnInit, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-users-cell',
  templateUrl: './users-cell.component.html',
  styleUrls: ['./users-cell.component.scss'],
})
export class UsersCellComponent implements OnInit, ICellRendererAngularComp {
  value: any;
  dropdownLabel: string;
  users: any[];
  categories: any[];
  selectedCategories: any;
  selectedUsers: any[];

  agInit(params: ICellRendererParams): void {
    this.dropdownLabel = 'hihih';
    this.value = params.value;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  ngOnInit(): void {
    this.categories = [
      { name: 'دسته بندی اول', code: 'NY' },
      { name: 'دسته بندی دوم', code: 'RM' },
      { name: 'دسته بندی سوم', code: 'LDN' },
      { name: 'دسته بندی چهارم', code: 'IST' },
      { name: 'دسته بندی پنجم', code: 'PRS' },
    ];
  }
}
