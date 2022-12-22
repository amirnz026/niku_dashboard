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

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  ngOnInit(): void {}
}
