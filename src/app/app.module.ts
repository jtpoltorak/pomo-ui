import { NgModule } from '@angular/core';
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
} from '@fortawesome/free-solid-svg-icons';

import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer.component';
import { SettingsComponent } from './components/settings.component';
import { HelpComponent } from './components/help.component';
import { FooterComponent } from './components/footer.component';
import { AboutComponent } from './components/about.component';
import { PrivacyComponent } from './components/privacy.component';
import { ContactComponent } from './components/contact.component';

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
  ],
  providers: [],
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
    );
  }
}
