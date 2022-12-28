import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryManagementComponent {
  constructor() {}
}
