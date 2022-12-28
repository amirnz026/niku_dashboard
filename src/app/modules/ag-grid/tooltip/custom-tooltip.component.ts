import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';

@Component({
  selector: 'app-tooltip-component',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTooltipComponent implements ITooltipAngularComp {
  private params!: { type: string } & ITooltipParams;
  public data!: any;
  public type!: string;

  agInit(params: { type: string } & ITooltipParams): void {
    this.params = params;

    this.data = params.api!.getDisplayedRowAtIndex(params.rowIndex!)!.data;
    this.type = this.params.type || 'primary';
  }
}
