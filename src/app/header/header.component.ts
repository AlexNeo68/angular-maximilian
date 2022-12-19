import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() firedSetPage = new EventEmitter<string>();
  setPage(features: string) {
    this.firedSetPage.emit(features);
  }
}
