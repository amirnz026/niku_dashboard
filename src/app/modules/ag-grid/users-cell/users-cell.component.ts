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
  usersCount = 0;

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
    this.usersCount = params.value.length;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  ngOnInit(): void {}
}
