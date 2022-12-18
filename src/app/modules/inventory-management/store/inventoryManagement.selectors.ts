import { AppStateInterface } from 'src/app/types/appState.interface';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppStateInterface) =>
  state.inventoryManagement;

export const tabsSelector = createSelector(
  selectFeature,
  (state) => state.tabs
);

export const substituteTabRouteSelector = (tabName: string) =>
  createSelector(selectFeature, (state) => {
    let indexOfClosingTab = 0;
    for (let i = 0; i < state.tabs.length; i++) {
      if (state.tabs[i].tabName === tabName) {
        indexOfClosingTab = i;
        break;
      }
    }
    if (indexOfClosingTab + 1 === state.tabs.length) {
      return state.tabs[indexOfClosingTab - 1].tabRoute;
    } else {
      return state.tabs[indexOfClosingTab + 1].tabRoute;
    }
  });

export const tabIndexSelector = (tabName: string) =>
  createSelector(selectFeature, (state) => {
    for (let i = 0; i < state.tabs.length; i++) {
      if (state.tabs[i].tabName === tabName) return i;
    }
  });

export const findTabRouteByIndexSelector = (index: number) =>
  createSelector(selectFeature, (state) => {
    if (state.tabs.length === 1) {
      console.log('1');
      return '/dashboard';
    } // only tab close
    else if (index === state.tabs.length - 1) {
      console.log('2');

      return state.tabs[index - 1].tabRoute;
    } // last tab close
    else if (index !== state.tabs.length - 1 && index !== 0) {
      console.log('3');

      return state.tabs[index - 1].tabRoute;
    } // not last tab close
    else if (index !== state.tabs.length - 1 && index === 0) {
      console.log('4');

      return state.tabs[index + 1].tabRoute;
    }
  });

export const currentTabEqualActiveTabSelector = (tabName: string) =>
  createSelector(selectFeature, (state) => {
    let activeTabIndex!: number;
    let currentTabIndex!: number;
    for (let i = 0; i < state.tabs.length; i++) {
      if (state.tabs[i].tabName === tabName) activeTabIndex = i;
      if (state.tabs[i].tabName === state.activeTab.tabName)
        currentTabIndex = i;
    }
    if (activeTabIndex === currentTabIndex) return true;
    else return false;
  });
