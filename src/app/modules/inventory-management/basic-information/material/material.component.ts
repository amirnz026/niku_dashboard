import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
})
export class MaterialComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'ماده اولیه',
        tabRoute: '/inventory-management/material',
      })
    );
  }
}
