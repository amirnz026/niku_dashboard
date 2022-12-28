import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-actions-cell',
  templateUrl: './actions-cell.component.html',
  styleUrls: ['./actions-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsCellComponent implements OnInit, ICellRendererAngularComp {
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
