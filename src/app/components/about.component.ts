import { Component } from '@angular/core';

import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  version = environment.VERSION;
}
