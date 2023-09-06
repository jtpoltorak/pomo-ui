import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Font Awesome imports
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faStackOverflow,
  faGithub,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faVolumeLow,
  faVolumeMute,
  faRepeat,
  faSliders,
  faQuestion,
  faInfo,
  faArrowUpRightFromSquare,
  faHeartCircleCheck,
  faFaceSmileWink,
} from '@fortawesome/free-solid-svg-icons';

import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer.component';
import { SettingsComponent } from './components/settings.component';
import { HelpComponent } from './components/help.component';
import { FooterComponent } from './components/footer.component';
import { AboutComponent } from './components/about.component';
import { PrivacyComponent } from './components/privacy.component';
import { ContactComponent } from './components/contact.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    SettingsComponent,
    HelpComponent,
    FooterComponent,
    AboutComponent,
    PrivacyComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ProgressBarModule,
    SidebarModule,
    DividerModule,
    TooltipModule,
    ToastModule,
    DialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faVolumeLow,
      faVolumeMute,
      faRepeat,
      faSliders,
      faQuestion,
      faInfo,
      faArrowUpRightFromSquare,
      faHeartCircleCheck,
      faFaceSmileWink,
    );
  }
}
