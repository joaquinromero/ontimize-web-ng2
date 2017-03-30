import {
  Component, Inject, Injector, forwardRef, ElementRef, OnInit,
  Optional,
  NgModule,
  ModuleWithProviders,
  ViewEncapsulation
} from '@angular/core';
import { OSharedModule } from '../../../shared.module';
import { OFormComponent } from '../../form/o-form.component';
import {
  OTextInputModule, OTextInputComponent, DEFAULT_INPUTS_O_TEXT_INPUT,
  DEFAULT_OUTPUTS_O_TEXT_INPUT
} from '../text-input/o-text-input.component';

export const DEFAULT_INPUTS_O_PASSWORD_INPUT = [
  ...DEFAULT_INPUTS_O_TEXT_INPUT
];

export const DEFAULT_OUTPUTS_O_PASSWORD_INPUT = [
  ...DEFAULT_OUTPUTS_O_TEXT_INPUT
];

@Component({
  selector: 'o-password-input',
  templateUrl: 'o-password-input.component.html',
  styleUrls: ['o-password-input.component.scss'],
  inputs: [
    ...DEFAULT_INPUTS_O_PASSWORD_INPUT
  ],
  outputs: [
    ...DEFAULT_OUTPUTS_O_PASSWORD_INPUT
  ],
  encapsulation: ViewEncapsulation.None
})
export class OPasswordInputComponent extends OTextInputComponent implements OnInit {

  public static DEFAULT_INPUTS_O_PASSWORD_INPUT = DEFAULT_INPUTS_O_PASSWORD_INPUT;
  public static DEFAULT_OUTPUTS_O_PASSWORD_INPUT = DEFAULT_OUTPUTS_O_PASSWORD_INPUT;

  constructor(
    @Optional() @Inject(forwardRef(() => OFormComponent)) form: OFormComponent,
    elRef: ElementRef,
    injector: Injector) {
    super(form, elRef, injector);
  }

}

@NgModule({
  declarations: [OPasswordInputComponent],
  imports: [OSharedModule, OTextInputModule],
  exports: [OPasswordInputComponent, OTextInputModule],
})
export class OPasswordInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OPasswordInputModule,
      providers: []
    };
  }
}
