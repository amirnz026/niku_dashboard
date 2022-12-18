import { createAction, props } from '@ngrx/store';

export const getTabs = createAction('[Inventory Management] Get Tabs');
export const addTab = createAction(
  '[Inventory Management] Add Tab',
  props<{ tabName: string; tabRoute: string }>()
);
export const closeTab = createAction(
  '[Inventory Management] Close Tab',
  props<{ tabName: string }>()
);

export const setActiveTab = createAction(
  '[Inventory Management] Set Active Tab',
  props<{ tabName: string; tabRoute: string }>()
);
