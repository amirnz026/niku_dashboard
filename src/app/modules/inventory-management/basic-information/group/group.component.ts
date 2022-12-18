import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as imActions from '../../store/inventoryManagement.actions';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
})
export class GroupComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      imActions.addTab({
        tabName: 'گروه',
        tabRoute: '/inventory-management/group',
      })
    );
  }
}
