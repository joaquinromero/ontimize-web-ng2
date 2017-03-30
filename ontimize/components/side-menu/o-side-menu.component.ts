import {
  Component,
  ViewChild,
  Injector,
  NgModule,
  ModuleWithProviders,
  ViewEncapsulation} from '@angular/core';
import {
  MdSidenavModule, MdSidenav, MdListModule,
  MdToolbarModule, MdIconModule
} from '@angular/material';
import {AuthGuardService} from '../../services';
import {OTranslateModule} from '../../pipes/o-translate.pipe';


export const DEFAULT_INPUTS_O_SIDE_MENU = [
  // title [string]: menu title. Default: no value.
  'title'
];

@Component({
  selector: 'o-side-menu',
  templateUrl: 'o-side-menu.component.html',
  styleUrls: [
    'o-side-menu.component.scss'
  ],
  inputs: [
    ...DEFAULT_INPUTS_O_SIDE_MENU
  ],
  encapsulation: ViewEncapsulation.None
})
export class OSideMenuComponent {

  public static DEFAULT_INPUTS_O_SIDE_MENU = DEFAULT_INPUTS_O_SIDE_MENU;

  public authGuardService: AuthGuardService;

  protected title: string;
  protected opened: boolean;

  @ViewChild('sidenav')
  protected sidenav: MdSidenav;

  constructor(protected injector: Injector) {
    this.opened = false;
    this.authGuardService = this.injector.get(AuthGuardService);
  }

  public showSidenav() {
    this.opened = true;
    this.sidenav.open();
    this.sidenav.onClose.subscribe(res => {
      this.opened = false;
    });
  }

}

@NgModule({
  declarations: [OSideMenuComponent],
  imports: [MdSidenavModule, MdListModule, MdToolbarModule, MdIconModule, OTranslateModule],
  exports: [OSideMenuComponent],
})
export class OSideMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OSideMenuModule,
      providers: []
    };
  }
}
