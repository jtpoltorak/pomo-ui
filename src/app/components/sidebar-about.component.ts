import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-sidebar-about',
  templateUrl: './sidebar-about.component.html',
})
export class SidebarAboutComponent {
  @Input() isVisible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  onVisibleChange(event: boolean): void {
    this.visibleChange.emit(event);
  }
}
