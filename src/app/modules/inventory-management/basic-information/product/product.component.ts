import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  constructor(private store: Store<AppStateType>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'کالا / خدمت',
        tabRoute: '/inventory-management/product',
      })
    );
  }
}
