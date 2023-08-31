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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer.component';
import { SettingsComponent } from './components/settings.component';
import { HelpComponent } from './components/help.component';
import { AboutComponent } from './components/about.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    SettingsComponent,
    HelpComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ProgressBarModule,
    SidebarModule,
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
