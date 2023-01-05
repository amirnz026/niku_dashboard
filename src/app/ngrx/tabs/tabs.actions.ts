import { createAction, props } from '@ngrx/store';

export const getTabs = createAction('[Tabs] Get Tabs');
export const addTab = createAction(
  '[Tabs] Add Tab',
  props<{ tabName: string; tabRoute: string }>()
);
export const closeTab = createAction(
  '[Tabs] Close Tab',
  props<{ tabName: string }>()
);
