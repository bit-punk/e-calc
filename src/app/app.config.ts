import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

const assetsI18n = 'assets/i18n/';

export function createTranslateHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, assetsI18n);
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),
    provideHttpClient(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateHttpLoader,
        deps: [HttpClient]
      }
    }).providers!]
};
