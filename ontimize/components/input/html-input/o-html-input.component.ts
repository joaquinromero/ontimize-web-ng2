import {
  Component, Inject, Injector, forwardRef,
  ElementRef, OnInit, EventEmitter, ViewChild,
  ChangeDetectorRef, NgZone, Optional,
  NgModule,
  ModuleWithProviders,
  ViewEncapsulation
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms/src/directives/validators';

import { MdCKEditorModule, CKEditor } from '../../material/ckeditor/ckeditor.component';
import { MdInputModule, MdTabGroup, MdTab } from '@angular/material';

import {
  IComponent,
  IFormControlComponent,
  IFormDataTypeComponent,
  IFormDataComponent
} from '../../../interfaces';
import { InputConverter } from '../../../decorators';
import { OFormComponent, Mode } from '../../form/o-form.component';
import { OFormValue } from '../../form/OFormValue';
import { OTranslateService } from '../../../services';
import { SQLTypes } from '../../../utils';
import { OTranslateModule } from '../../../pipes/o-translate.pipe';

export const DEFAULT_INPUTS_O_HTML_INPUT = [
  'oattr: attr',
  'olabel: label',
  'data',
  'autoBinding: automatic-binding',
  'oenabled: enabled',
  'orequired: required',
  'minLength: min-length',
  'maxLength: max-length',

  // sqltype[string]: Data type according to Java standard. See SQLType class. Default: 'OTHER'
  'sqlType: sql-type'
];

export const DEFAULT_OUTPUTS_O_HTML_INPUT = [
  'onChange',
  'onFocus',
  'onBlur'
];

@Component({
  selector: 'o-html-input',
  templateUrl: 'o-html-input.component.html',
  styleUrls: ['o-html-input.component.scss'],
  inputs: [
    ...DEFAULT_INPUTS_O_HTML_INPUT
  ],
  outputs: [
    ...DEFAULT_OUTPUTS_O_HTML_INPUT
  ],
  encapsulation: ViewEncapsulation.None
})
export class OHTMLInputComponent implements IComponent, IFormControlComponent, IFormDataTypeComponent, IFormDataComponent, OnInit {

  public static DEFAULT_INPUTS_O_HTML_INPUT = DEFAULT_INPUTS_O_HTML_INPUT;
  public static DEFAULT_OUTPUTS_O_HTML_INPUT = DEFAULT_OUTPUTS_O_HTML_INPUT;

  oattr: string;
  olabel: string;
  @InputConverter()
  oenabled: boolean = true;
  @InputConverter()
  orequired: boolean = true;
  @InputConverter()
  autoBinding: boolean = true;
  @InputConverter()
  minLength: number = -1;
  @InputConverter()
  maxLength: number = -1;
  sqlType: string;

  onChange: EventEmitter<Object> = new EventEmitter<Object>();
  onFocus: EventEmitter<Object> = new EventEmitter<Object>();
  onBlur: EventEmitter<Object> = new EventEmitter<Object>();

  @ViewChild('ckEditor') ckEditor: CKEditor;

  protected value: OFormValue;
  protected translateService: OTranslateService;
  protected _SQLType: number = SQLTypes.OTHER;

  private _disabled: boolean;
  private _isReadOnly: boolean;
  private _placeholder: string;
  private _fControl: FormControl;

  constructor(
    @Inject(forwardRef(() => OFormComponent)) protected form: OFormComponent,
    @Optional() @Inject(forwardRef(() => MdTabGroup)) protected tabGroup: MdTabGroup,
    @Optional() @Inject(forwardRef(() => MdTab)) protected tab: MdTab,
    protected elRef: ElementRef,
    protected ngZone: NgZone,
    protected cd: ChangeDetectorRef,
    protected injector: Injector) {

    this.translateService = this.injector.get(OTranslateService);
  }

  ngOnInit() {
    this._disabled = !this.oenabled;
    this._placeholder = this.olabel ? this.olabel : this.oattr;

    if (this.form) {
      this.form.registerFormComponent(this);
      this.form.registerFormControlComponent(this);
      this.isReadOnly = (this.form.mode === Mode.INITIAL ? true : false);

      var self = this;
      this.form.beforeCloseDetail.subscribe((evt: any) => {
        self.destroyCKEditor();
      });
      this.form.beforeGoEditMode.subscribe((evt: any) => {
        self.destroyCKEditor();
      });

    } else {
      this.isReadOnly = this._disabled;
    }

    if (this.tabGroup) {
      var self = this;
      this.tabGroup.selectChange.subscribe((evt: any) => {
        self.destroyCKEditor();
        if (self.isInActiveTab()) {
          self.ckEditor.initializeCkEditor(self.getValue());
        }
      });
    }
  }

  isInActiveTab(): boolean {
    var result: boolean = !(this.tabGroup && this.tab);
    if (!result) {
      var self = this;
      this.tabGroup._tabs.forEach(function (tab, index) {
        if (tab === self.tab) {
          result = (self.tabGroup.selectedIndex === index);
        }
      });
    }
    return result;
  }

  isLoaded(): boolean {
    var result = true;
    if (this.tabGroup && this.tab) {
      result = this.isInActiveTab();
    }
    return result;
  }

  ensureOFormValue(value: any) {
    if (value instanceof OFormValue) {
      this.value = new OFormValue(value.value);
    } else if (value && !(value instanceof OFormValue)) {
      this.value = new OFormValue(value);
    } else {
      this.value = new OFormValue('');
    }
  }

  ngOnDestroy() {
    if (this.form) {
      this.form.unregisterFormComponent(this);
      this.form.unregisterFormControlComponent(this);
      this.form.unregisterSQLTypeFormComponent(this);
    }
  }

  getAttribute() {
    if (this.oattr) {
      return this.oattr;
    } else if (this.elRef && this.elRef.nativeElement.attributes['attr']) {
      return this.elRef.nativeElement.attributes['attr'].value;
    }
  }

  getControl(): FormControl {
    if (!this._fControl) {
      let validators: ValidatorFn[] = this.resolveValidators();
      let cfg = {
        value: this.value ? this.value.value : undefined,
        disabled: this._disabled
      };
      this._fControl = new FormControl(cfg, validators);
    }
    return this._fControl;
  }

  resolveValidators(): ValidatorFn[] {
    let validators: ValidatorFn[] = [];

    if (this.orequired) {
      validators.push(Validators.required);
    }
    if (this.minLength >= 0) {
      validators.push(Validators.minLength(this.minLength));
    }
    if (this.maxLength >= 0) {
      validators.push(Validators.maxLength(this.maxLength));
    }

    return validators;
  }

  getSQLType(): number {
    let sqlt = this.sqlType && this.sqlType.length > 0 ? this.sqlType : 'OTHER';
    this._SQLType = SQLTypes.getSQLTypeValue(sqlt);
    return this._SQLType;
  }

  set data(value: any) {
    this.ensureOFormValue(value);
  }

  isAutomaticBinding(): Boolean {
    return this.autoBinding;
  }

  getValue(): any {
    if (this.value instanceof OFormValue) {
      if (this.value.value) {
        return this.value.value;
      }
    }
    return '';
  }

  setValue(val: any) {
    var self = this;
    window.setTimeout(() => {
      self.ensureOFormValue(val);
    }, 0);
  }

  get placeHolder(): string {
    if (this.translateService) {
      return this.translateService.get(this._placeholder);
    }
    return this._placeholder;
  }

  set placeHolder(value: string) {
    var self = this;
    window.setTimeout(() => {
      self._placeholder = value;
    }, 0);
  }

  get isReadOnly(): boolean {
    return this._isReadOnly;
  }

  set isReadOnly(value: boolean) {
    if (this._disabled) {
      return;
    }
    var self = this;
    window.setTimeout(() => {
      self._isReadOnly = value;
      if (self.ckEditor) {
        self.ckEditor.setReadOnlyState(value);
      }
    }, 0);
  }

  get isDisabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    // var self = this;
    // window.setTimeout(() => {
    this._disabled = value;
    // }, 0);
  }

  innerOnChange(event: any) {
    this.setValue(event);
    this.onChange.emit(event);
  }

  innerOnFocus(event: any) {
    if (!this.isReadOnly && !this.isDisabled) {
      this.onFocus.emit(event);
    }
  }

  innerOnBlur(event: any) {
    if (!this.isReadOnly && !this.isDisabled) {
      this.onBlur.emit(event);
    }
  }

  get isValid() {
    if (this._fControl) {
      return this._fControl.valid;
    }
    return false;
  }

  /*
  * When ckEditor is inside a TabGroup it is necessary to destroy the component before
  * Angular detaches md-tab-content from DOM
  */
  destroyCKEditor() {
    if (this.ckEditor) {
      this.ckEditor.destroyCKEditor();
    }
  }

}

@NgModule({
  declarations: [OHTMLInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MdInputModule, MdCKEditorModule, OTranslateModule],
  exports: [OHTMLInputComponent],
})
export class OHTMLInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OHTMLInputModule,
      providers: []
    };
  }
}
