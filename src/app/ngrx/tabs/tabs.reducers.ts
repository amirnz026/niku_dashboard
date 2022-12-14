import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { addTab, closeTab } from './tabs.actions';

export const initialState: TabsStateType = {
  tabs: [],
  activeTab: {
    tabName: '',
    tabRoute: '',
    order: 0,
  },
};
export const tabsReducers = createReducer(
  initialState,
  immerOn(addTab, (state, action) => {
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
  immerOn(closeTab, (state, action) => {
    state.tabs = state.tabs.filter((tab) => tab.tabName !== action.tabName);
  })
);
