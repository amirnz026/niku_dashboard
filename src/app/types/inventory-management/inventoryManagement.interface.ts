import { InventoryInterface } from 'src/app/types/inventory-management/inventory/inventory.interface';
import { InventoryCategoryInterface } from './inventory/inventoryCategory.interface';

export interface InventoryManagementInterface {
  isInventoryForm: boolean;
  inventories: InventoryInterface[];
  isLoading: boolean;
  error: string;
}
