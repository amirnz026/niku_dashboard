import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTab } from 'src/app/ngrx/tabs/tabs.actions';

@Component({
  selector: 'app-inventory',
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnInit {
  constructor(private store: Store<AppStateType>) {}

  tabName = 'گروه';
  tabRoute = '/inventory-management/group';

  ngOnInit(): void {
    this.store.dispatch(
      addTab({
        tabName: this.tabName,
        tabRoute: this.tabRoute,
      })
    );
  }
}
