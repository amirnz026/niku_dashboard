import { OnInit, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-cell',
  templateUrl: './status-cell.component.html',
  styleUrls: ['./status-cell.component.scss'],
})
export class StatusCellComponent implements OnInit, ICellRendererAngularComp {
  value: any;
  status: boolean;

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
    if (this.value == 'فعال') this.status = true;
    else this.status = false;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  ngOnInit(): void {}
}
