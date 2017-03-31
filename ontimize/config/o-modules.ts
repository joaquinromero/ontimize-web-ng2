import { Http, HttpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MaterialModule } from '@angular/material';

import {
  OBarMenuModule,
  OBarMenuGroupModule,
  OBarMenuItemModule,
  OLocaleBarMenuItemModule,
  OBarMenuSeparatorModule,
  OButtonModule,
  OCheckboxModule,
  OComboModule,
  OColumnModule,
  ORowModule,
  ODialogModule,
  OFormModule,
  OImageModule,
  OCurrencyInputModule,
  ODateInputModule,
  OEmailInputModule,
  OHTMLInputModule,
  OIntegerInputModule,
  OLightTableModule,
  OLightTableButtonPanelModule,
  OLightTableColumnModule,
  OListPickerModule,
  ONIFInputModule,
  OPasswordInputModule,
  OPercentInputModule,
  ORealInputModule,
  OTextInputModule,
  OTextareaInputModule,
  OListModule,
  OListItemModule,
  OListItemAvatarModule,
  OListItemTextModule,
  OListItemCardModule,
  OListItemCardImageModule,
  OSearchInputModule,
  OTableModule,
  OSideMenuModule,
  OSideMenuGroupModule,
  OSideMenuItemModule,
  OLocaleSideMenuItemModule,
  OSideMenuSeparatorModule
} from '../components';

import {
  OSharedModule
} from '../shared.module';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const ONTIMIZE_MODULES: any = [
  // Standard modules
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,

  // Ng2-translate
  TranslateModule.forRoot({
	  loader: {
    	 provide: TranslateLoader,
    	 useFactory: HttpLoaderFactory,
    	 deps: [Http]
	  }
  }),

  // Material modules
  MaterialModule.forRoot(),

  // Ontimize modules
  OBarMenuModule.forRoot(),
  OBarMenuGroupModule.forRoot(),
  OBarMenuItemModule.forRoot(),
  OLocaleBarMenuItemModule.forRoot(),
  OBarMenuSeparatorModule.forRoot(),
  OButtonModule.forRoot(),
  OCheckboxModule.forRoot(),
  OComboModule.forRoot(),
  OColumnModule.forRoot(),
  ORowModule.forRoot(),
  ODialogModule.forRoot(),
  OFormModule.forRoot(),
  OImageModule.forRoot(),
  OCurrencyInputModule.forRoot(),
  ODateInputModule.forRoot(),
  OEmailInputModule.forRoot(),
  OHTMLInputModule.forRoot(),
  OIntegerInputModule.forRoot(),
  OListPickerModule.forRoot(),
  ONIFInputModule.forRoot(),
  OPasswordInputModule.forRoot(),
  OPercentInputModule.forRoot(),
  ORealInputModule.forRoot(),
  OTextInputModule.forRoot(),
  OTextareaInputModule.forRoot(),
  OLightTableModule.forRoot(),
  OLightTableButtonPanelModule.forRoot(),
  OLightTableColumnModule.forRoot(),
  OListModule.forRoot(),
  OListItemModule.forRoot(),
  OListItemAvatarModule.forRoot(),
  OListItemTextModule.forRoot(),
  OListItemCardModule.forRoot(),
  OListItemCardImageModule.forRoot(),
  OSearchInputModule.forRoot(),
  OTableModule.forRoot(),
  OSideMenuModule.forRoot(),
  OSideMenuGroupModule.forRoot(),
  OSideMenuItemModule.forRoot(),
  OLocaleSideMenuItemModule.forRoot(),
  OSideMenuSeparatorModule.forRoot(),
  OSharedModule.forRoot()
];
