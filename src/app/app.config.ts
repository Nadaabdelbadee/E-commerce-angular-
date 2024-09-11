import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { addheaderTokenInterceptor } from './shared/interceptor/addheader-token.interceptor';
import { errorInterceptor } from './shared/interceptor/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { spinnerInterceptor } from './shared/interceptor/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideToastr(), provideRouter(routes), provideClientHydration(),
    provideHttpClient(withFetch() , withInterceptors([addheaderTokenInterceptor , errorInterceptor , spinnerInterceptor])) , importProvidersFrom(RouterModule , BrowserAnimationsModule , ToastrModule , NgxSpinnerModule)
  ]
};
