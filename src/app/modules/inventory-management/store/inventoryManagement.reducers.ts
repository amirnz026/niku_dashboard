import { createReducer, on } from '@ngrx/store';
import * as imActions from './inventoryManagement.actions';
import { immerOn } from 'ngrx-immer/store';
import { TabsStateInterface } from '../types/tabsState.interface';

export const initialState: TabsStateInterface = {
  tabs: [],
  activeTab: {
    tabName: '',
    tabRoute: '',
    order: 0,
  },
};
export const reducers = createReducer(
  initialState,
  immerOn(imActions.addTab, (state, action) => {
    state.activeTab.tabName = action.tabName;
    state.activeTab.tabRoute = action.tabRoute;
    let isOpenTab = false;
    for (let tab of state.tabs) {
      if (tab.tabName === action.tabName) {
        isOpenTab = true;
        break;
      }
    }
    if (!isOpenTab) {
      state.tabs.push({
        tabName: action.tabName,
        tabRoute: action.tabRoute,
        order: state.tabs.length + 1,
      });
    }
  }),
  immerOn(imActions.closeTab, (state, action) => {
    state.tabs = state.tabs.filter((tab) => tab.tabName !== action.tabName);
  })
);
