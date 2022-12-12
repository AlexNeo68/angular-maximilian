import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username: string = '';
  showDetails: boolean = false;
  logs: Date[] = [];

  toggleDetails() {
    this.showDetails = !this.showDetails;
    this.logs.push(new Date());
  }
}
