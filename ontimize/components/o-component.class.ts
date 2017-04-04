import { Injector } from '@angular/core';
import { InputConverter } from '../decorators';
import { OTranslateService } from '../services';
import {
  IComponent
} from '../interfaces';

export class OComponent implements IComponent {
  /* Inputs */
  protected oattr: string;
  protected olabel: string;
  @InputConverter()
  protected oenabled: boolean = true;
  @InputConverter()
  protected orequired: boolean = false;

  /* Internal variables */
  protected injector: Injector;
  protected translateService: OTranslateService;

  protected _disabled: boolean;
  protected _isReadOnly: boolean;
  protected _placeholder: string;
  protected _tooltip: string;
  protected _tooltipPosition: string = 'below';
  protected _tooltipShowDelay: number = 500;

  constructor(injector: Injector) {
    this.injector = injector;
    if (this.injector) {
      this.translateService = this.injector.get(OTranslateService);
    }
  }

  initialize() {
    this._disabled = !this.oenabled;
    this._placeholder = this.olabel ? this.olabel : this.oattr;
  }

  public getAttribute(): string {
    if (this.oattr) {
      return this.oattr;
    }
    return undefined;
  }

  public get placeHolder(): string {
    if (this.translateService) {
      return this.translateService.get(this._placeholder);
    }
    return this._placeholder;
  }

  public set placeHolder(value: string) {
    this._placeholder = value;
  }

  public get tooltip(): string {
    if (this.translateService) {
      return this.translateService.get(this._tooltip);
    }
    return this._tooltip;
  }

  public set tooltip(value: string) {
    this._tooltip = value;
  }

  public get tooltipPosition(): string {
    return this._tooltipPosition;
  }

  public set tooltipPosition(value: string) {
    this._tooltipPosition = value;
  }

  public get tooltipShowDelay(): number {
    return this._tooltipShowDelay;
  }

  public set tooltipShowDelay(value: number) {
    this._tooltipShowDelay = value;
  }

  public get isReadOnly(): boolean {
    return this._isReadOnly;
  }

  public set isReadOnly(value: boolean) {
    if (this._disabled) {
      this._isReadOnly = false;
      return;
    }
    this._isReadOnly = value;
  }

  public get isDisabled(): boolean {
    return this._disabled;
  }

  public set disabled(value: boolean) {
    this._disabled = value;
  }

  public get isRequired(): boolean {
    return this.orequired;
  }

  public set required(value: boolean) {
    var self = this;
    window.setTimeout(() => {
      self.orequired = value;
    }, 0);
  }

}
