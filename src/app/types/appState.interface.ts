import { TabsStateInterface } from 'src/app/types/tab/tabsState.interface';
import { InventoryManagementInterface } from 'src/app/types/inventory-management/inventoryManagement.interface';

export interface AppStateInterface {
  tabsState: TabsStateInterface;
  inventoryManagement: InventoryManagementInterface;
}
