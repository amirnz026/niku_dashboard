import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';

export interface InventoryManagementInterface {
  inventories: InventoryInterface[];
  isLoading: boolean;
  error: string;
}
