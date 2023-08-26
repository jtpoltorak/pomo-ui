import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer.component';

@NgModule({
  declarations: [AppComponent, TimerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
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
