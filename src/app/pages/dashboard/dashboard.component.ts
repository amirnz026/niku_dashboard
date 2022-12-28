import {
  Component,
  ViewChild,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import { Store } from '@ngrx/store';
import * as tabsActions from 'src/app/ngrx/tabs/tabs.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel',
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(
      tabsActions.addTab({
        tabName: 'داشبورد',
        tabRoute: '/dashboard',
      })
    );
  }

  async openModal() {
    return await this.modalComponent.open();
  }
}
