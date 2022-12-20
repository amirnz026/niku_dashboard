import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutType } from '../../../core/configs/config';
import { LayoutInitService } from '../../../core/layout-init.service';
import { LayoutService } from '../../../core/layout.service';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import {
  currentTabEqualActiveTabSelector,
  findTabRouteByIndexSelector,
  tabIndexSelector,
  tabsSelector,
} from 'src/app/ngrx/tabs/tabs.selectors';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Observable, take } from 'rxjs';
import { TabInterface } from 'src/app/types/tab/tab.interface';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  tabs$: Observable<TabInterface[]>;
  closingTabIndex$: Observable<number | undefined>;
  currentTabEqualActiveTab$: Observable<boolean>;
  constructor(
    private router: Router,
    private layout: LayoutService,
    private layoutInit: LayoutInitService,
    private store: Store<AppStateInterface>
  ) {}
  ngOnInit(): void {
    this.tabs$ = this.store.pipe(select(tabsSelector));
  }

  closeTab(tabName: string): void {
    this.currentTabEqualActiveTab$ = this.store.pipe(
      select(currentTabEqualActiveTabSelector(tabName))
    );

    this.closingTabIndex$ = this.store.pipe(select(tabIndexSelector(tabName)));

    this.currentTabEqualActiveTab$
      .pipe(take(1))
      .subscribe((currentTabEqualActiveTab) => {
        if (currentTabEqualActiveTab) {
          this.closingTabIndex$.pipe(take(1)).subscribe((index) => {
            if (index !== undefined)
              this.store
                .pipe(select(findTabRouteByIndexSelector(index)))
                .pipe(take(1))
                .subscribe((tabRoute) => {
                  console.log(index);
                  this.store.dispatch(tabsActions.closeTab({ tabName }));
                  this.router.navigateByUrl(tabRoute!);
                });
          });
        } else this.store.dispatch(tabsActions.closeTab({ tabName }));
      });
  }

  calculateMenuItemCssClass(url: string): string {
    return checkIsActive(this.router.url, url) ? 'active' : '';
  }

  setBaseLayoutType(layoutType: LayoutType) {
    this.layoutInit.setBaseLayoutType(layoutType);
  }

  setToolbar(
    toolbarLayout: 'classic' | 'accounting' | 'extended' | 'reports' | 'saas'
  ) {
    const currentConfig = { ...this.layout.layoutConfigSubject.value };
    if (currentConfig && currentConfig.app && currentConfig.app.toolbar) {
      currentConfig.app.toolbar.layout = toolbarLayout;
      this.layout.saveBaseConfig(currentConfig);
    }
  }
}

const getCurrentUrl = (pathname: string): string => {
  return pathname.split(/[?#]/)[0];
};

const checkIsActive = (pathname: string, url: string) => {
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
};
