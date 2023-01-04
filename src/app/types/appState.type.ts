import { TabsStateType } from 'src/app/types/tab/tabsState.type';
import { InventoryManagementType } from 'src/app/types/inventory-management/inventory/inventoryManagement.type';

export interface AppStateInterface {
  tabsState: TabsStateType;
  inventoryManagement: InventoryManagementType;
}
