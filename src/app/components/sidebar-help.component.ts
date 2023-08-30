import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-sidebar-help',
  templateUrl: './sidebar-help.component.html',
})
export class SidebarHelpComponent {
  @Input() isVisible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  onVisibleChange(event: boolean): void {
    this.visibleChange.emit(event);
  }
}
