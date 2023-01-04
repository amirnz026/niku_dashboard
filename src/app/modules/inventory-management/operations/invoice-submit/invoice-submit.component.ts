import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-invoice-submit',
  templateUrl: './invoice-submit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceSubmitComponent implements OnInit {
  constructor(private store: Store<AppStateType>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'تایید فاکتور',
        tabRoute: '/inventory-management/invoice-submit',
      })
    );
  }
}
