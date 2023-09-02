import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  isSidebarVisible = false;
  currentSidebarComponent:
    | 'about'
    | 'privacy'
    | 'contact'
    | undefined = undefined;

  onAboutButtonClick(): void {
    this.currentSidebarComponent = 'about';
    this.isSidebarVisible = true;
  }

  onPrivacyButtonClick(): void {
    this.currentSidebarComponent = 'privacy';
    this.isSidebarVisible = true;
  }

  onContactButtonClick(): void {
    this.currentSidebarComponent = 'contact';
    this.isSidebarVisible = true;
  }
}
