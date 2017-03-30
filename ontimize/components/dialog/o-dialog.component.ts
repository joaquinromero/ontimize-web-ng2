import {
  Component,
  NgModule,
  ModuleWithProviders,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdButtonModule, MdIconModule, MdDialogModule, MdDialogRef } from '@angular/material';
import { ODialogConfig } from './o-dialog.config';
import { OTranslateModule } from '../../pipes/o-translate.pipe';

@Component({
  selector: 'o-dialog',
  templateUrl: 'o-dialog.component.html',
  styleUrls: ['o-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ODialogComponent {

  protected static DEFAULT_OK_BUTTON_TEXT = 'OK';
  protected static DEFAULT_CANCEL_BUTTON_TEXT = 'CANCEL';

  protected title: string;
  protected message: string;
  protected okButtonText: string;
  protected cancelButtonText: string;
  protected twoOptions: boolean;
  protected useIcon: boolean;
  protected icon: string;
  protected alertType: string;

  constructor(
    public dialogRef: MdDialogRef<ODialogComponent>) {
  }

  onOkClick(evt: any) {
    if (this.dialogRef) {
      this.dialogRef.close(true);
    }
  }

  public alert(title: string, message: string, config?: ODialogConfig) {
    config = this.ensureConfig(config);
    this.configureDefaultAlert(title, message, config);
  }

  public info(title: string, message: string, config?: ODialogConfig) {
    config = this.ensureConfig(config);
    config.alertType = 'info';
    if (typeof (config.icon) === 'undefined') {
      config.icon = 'info';
    }
    this.configureDefaultAlert(title, message, config);
  }

  public warn(title: string, message: string, config?: ODialogConfig) {
    config = this.ensureConfig(config);
    config.alertType = 'warn';
    if (typeof (config.icon) === 'undefined') {
      config.icon = 'warning';
    }
    this.configureDefaultAlert(title, message, config);
  }

  public error(title: string, message: string, config?: ODialogConfig) {
    config = this.ensureConfig(config);
    config.alertType = 'error';
    if (typeof (config.icon) === 'undefined') {
      config.icon = 'error';
    }
    this.configureDefaultAlert(title, message, config);
  }

  public confirm(title: string, message: string, config?: ODialogConfig) {
    config = this.ensureConfig(config);
    this.configureDefaultAlert(title, message, config);
    this.twoOptions = true;
  }

  /* Utility methods */
  protected ensureConfig(config: ODialogConfig): ODialogConfig {
    if (!config) {
      config = {};
    }
    return config;
  }

  protected configureDefaultAlert(title: string, message: string, config?: ODialogConfig) {
    this.twoOptions = false;
    this.title = title;
    this.message = message;

    this.icon = (typeof (config.icon) !== 'undefined') ? config.icon : undefined;
    if (this.icon !== undefined) {
      this.useIcon = true;
    }
    this.alertType = config.alertType;

    this.okButtonText = (typeof (config.okButtonText) !== 'undefined') ? config.okButtonText : ODialogComponent.DEFAULT_OK_BUTTON_TEXT;
    this.cancelButtonText = (typeof (config.cancelButtonText) !== 'undefined') ? config.cancelButtonText : ODialogComponent.DEFAULT_CANCEL_BUTTON_TEXT;
  }

  protected get isInfo(): boolean {
    return this.alertType === 'info';
  }

  protected get isWarn(): boolean {
    return this.alertType === 'warn';
  }

  protected get isError(): boolean {
    return this.alertType === 'error';
  }

}


@NgModule({
  declarations: [ODialogComponent],
  imports: [CommonModule, MdButtonModule, MdIconModule, MdDialogModule, OTranslateModule],
  exports: [ODialogComponent, CommonModule, MdButtonModule, MdDialogModule],
})
export class ODialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ODialogModule,
      providers: []
    };
  }
}

export * from './o-dialog.config';
